import { Request, Response } from "express";
import service from "../services/TournamentService";
import { Tournament } from "../models/TournamentModel";

export async function postTournament(req: Request, res: Response): Promise<void> {
    const { name, type } = req.body;
    try {
        const newTournament = await service.createTournament(name, type);
        res.status(201).json(newTournament);
    } catch (error) {
        res.status(500).json({ message: 'Error creating tournament' });
    }
}

export async function getTournaments(req: Request, res: Response): Promise<void> {
    try {
        const tournaments = await service.getTournaments();
        res.status(200).json(tournaments);
    } catch (error) {
        res.status(500).json({ message: 'Error getting tournaments' });
    }
}

export async function getTournamentById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    try {
        const tournament = await service.getTournamentsbyId(id);
        res.status(200).json(tournament);
    } catch (error) {
        res.status(500).json({ message: 'Error getting tournament' });
    }
}

export async function updateTournament(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const { name, type } = req.body;
    try {
        const tournament = await service.getTournamentsbyId(id);
        tournament.name = name;
        tournament.type = type;
        const updatedTournament = await service.updateTournaments(tournament);
        res.status(200).json(updatedTournament);
    } catch (error) {
        res.status(500).json({ message: 'Error updating tournament' });
    }
}

export async function deleteTournament(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    try {
        await service.deleteTournament(id);
        res.status(200).json({ message: 'Tournament deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting tournament' });
    }
}

export async function addTeamToTournament(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const { team } = req.body;
    try {
        const tournament: Tournament = await service.addTeamToTournament(id, team);
        res.status(200).json(tournament);
    } catch (error) {
        res.status(500).json({ message: 'Error adding team to tournament' });
    }
}

export async function deleteTeamFromTournament(req: Request, res: Response): Promise<void> {
    const tournamentId = parseInt(req.params.id);
    const teamId = parseInt(req.params.teamId);
    try {
        const tournament: Tournament = await service.deleteTeamFromTournament(tournamentId, teamId);
        res.status(200).json(tournament);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting team from tournament' });
    }
}

export async function generateTournamentSchedule(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const schedule = await service.generateTournamentSchedule(id);

    if (schedule) {
        res.status(200).json(schedule);
    } else {
        res.status(404).json({ message: "Tournament not found or invalid type" });
    }
}

export async function searchTournaments(req: Request, res: Response): Promise<void> {
    const { name, type } = req.query;
    console.log(name, type)
    try {
        const tournaments = await service.searchTournaments(name as string, type as string);
        res.status(200).json(tournaments);
    }
    catch (error) {
        res.status(500).json({ message: 'Error searching tournaments' });
    }
}