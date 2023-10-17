import { MatchDuoQuad, MatchDuel } from '../models/MatchModel';
import { Team } from '../models/TeamModel';
import { Tournament } from '../models/TournamentModel';

const tournaments: Tournament[] = [];

async function createTournament(name: string, type: string): Promise<Tournament> {
    const teamOfTwo = await getTeamOfTwo();
    const teamOfFour = await getTeamOfFour();

    const teams = [teamOfTwo, teamOfFour];

    const newTournament: Tournament = {
        id: tournaments.length + 1,
        name,
        type,
        teams,
    };
    tournaments.push(newTournament);
    return newTournament;
}


async function getTournaments(): Promise<Tournament[]> {
    return tournaments;
}

async function getTournamentsbyId(id: number) {
    const tournament = tournaments.find(tournament => tournament.id === id);
    return tournament;
}

async function updateTournaments(tournament: Tournament): Promise<Tournament> {
    const index = tournaments.findIndex(t => t.id === tournament.id);
    tournaments[index] = tournament;
    return tournament;
}

async function deleteTournament(id: number): Promise<void> {
    const index = tournaments.findIndex(t => t.id === id);
    tournaments.splice(index, 1);
}

async function addTeamToTournament(tournamentId: number, team: Team): Promise<Tournament> {
    const tournament = await getTournamentsbyId(tournamentId);
    tournament.teams.push(team);
    return tournament;
}

async function deleteTeamFromTournament(tournamentId: number, teamId: number): Promise<Tournament> {
    const tournament = await getTournamentsbyId(tournamentId);
    const index = tournament.teams.findIndex(team => team.id === teamId);
    tournament.teams.splice(index, 1);
    return tournament;
}

async function getTeamOfTwo(): Promise<Team> {
    try {
        const teamOfTwo = await fetch('http://host.docker.internal:3000/api/team/2');
        return teamOfTwo.json();
    }
    catch (error) {
        console.error(error);
    }
}

async function getTeamOfFour(): Promise<Team> {
    try {
        const teamOfFour = await fetch('http://host.docker.internal:3000/api/team/4');
        return teamOfFour.json();
    }
    catch (error) {
        console.error(error);
    }
}

async function generateTournamentSchedule(tournamentId: number): Promise<MatchDuel[] | MatchDuoQuad[]> {
    const tournament = await getTournamentsbyId(tournamentId);

    if (!tournament) {
        console.error("Tournament not found");
        return undefined;
    }

    const { type, teams } = tournament;
    let matchList;

    switch (type) {
        case "duel":
            matchList = createRoundRobin(teams, getMatchDuel);
            break;
        case "duo":
            matchList = createRoundRobin(teams, getMatchDuo);
            break;
        case "quad":
            matchList = createRoundRobin(teams, getMatchQuad);
            break;
        default:
            console.error("Invalid tournament type");
            return undefined;
    }

    return matchList;
}

function createRoundRobin(teams: Team[], matchFetcher: () => Promise<MatchDuel | MatchDuoQuad>): Promise<(MatchDuel | MatchDuoQuad)[]> {
    const matchList = [];
    for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
            matchList.push(matchFetcher());
        }
    }
    return Promise.all(matchList);
}

async function getMatchDuel(): Promise<MatchDuel> {
    try {
        const matchDuel = await fetch('http://host.docker.internal:3000/api/match/duel');
        return matchDuel.json();
    }
    catch (error) {
        console.error(error);
    }
}

async function getMatchDuo(): Promise<MatchDuoQuad> {
    try {
        const teamDuo = await fetch('http://host.docker.internal:3000/api/team/duo');
        return teamDuo.json();
    }
    catch (error) {
        console.error(error);
    }
}

async function getMatchQuad(): Promise<MatchDuoQuad> {
    try {
        const teamQuad = await fetch('http://host.docker.internal:3000/api/team/squad');
        return teamQuad.json();
    }
    catch (error) {
        console.error(error);
    }
}

async function searchTournaments(name?: string, type?: string): Promise<Tournament[]> {
    const filteredTournaments = tournaments.filter(tournament => {
        let nameMatch = true;
        let typeMatch = true;

        if (name) {
            nameMatch = tournament.name.toLowerCase().includes(name.toLowerCase());
        }

        if (type) {
            typeMatch = tournament.type.toLowerCase() === type.toLowerCase();
        }

        return nameMatch && typeMatch;
    });

    return filteredTournaments;
}

export default {
    createTournament,
    getTournaments,
    getTournamentsbyId,
    updateTournaments,
    deleteTournament,
    addTeamToTournament,
    deleteTeamFromTournament,
    generateTournamentSchedule,
    searchTournaments,
};