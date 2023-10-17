import express, { Express, Request, Response } from 'express';
import { postTournament, getTournaments, getTournamentById, updateTournament, deleteTournament, addTeamToTournament, generateTournamentSchedule, searchTournaments } from '../../controllers/TournamentController';
import path from 'path';

export function configureRoutes(app: Express): void {
    app.get('/', (req: Request, res: Response) => {
        res.send('Hello World!');
    });

    app.get('/api/health', (req: Request, res: Response) => {
        res.send('OK');
    });

    app.use('/public', express.static(path.join(__dirname, '../../../public')));

    app.post('/api/tournament/', postTournament);
    app.get('/api/tournament/', getTournaments);
    app.get('/api/tournament/:id', getTournamentById);
    app.put('/api/tournament/:id', updateTournament);
    app.delete('/api/tournament/:id', deleteTournament)
    app.post('/api/tournament/:id/team', addTeamToTournament)
    app.post('/api/tournament/:id/schedule', generateTournamentSchedule)
    app.get('/api/tournament/search', searchTournaments)
}
