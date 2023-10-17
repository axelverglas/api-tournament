export interface MatchDuel {
    id: number;
    date: Date;
    status: string;
    PlayerA: Player;
    PlayerB: Player;
    score: {
        PlayerA: number;
        PlayerB: number;
    };
}

export interface MatchDuoQuad {
    id: number;
    date: Date;
    status: string;
    TeamA: Team[];
    TeamB: Team[];
    score: {
        TeamA: number;
        TeamB: number;
    };
}

interface Team {
    name: string;
    players: Player[];
}


interface Player {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
}