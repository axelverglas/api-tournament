import { Team } from './TeamModel';

export interface Tournament {
    id: number;
    name: string;
    type: string;
    teams: Team[];
}