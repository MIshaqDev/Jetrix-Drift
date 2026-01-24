import { $ZodCustom } from 'zod/v4/core';
import Drifter from '../models/drifter.mongos.js';
import Team from '../models/team.mongos.js';

export const drifterLeaderBoard = async () => {
    try{
        const drifters = await Drifter.find().sort({ totalPoints: -1 }).limit(10).lean();

        const LeaderBoard = drifters.map((p, index) => ({
            rank: index + 1,
            id: p._id,
            name: p.fullName,
            points: p.totalPoints,
            team: p.team
        }));
        return LeaderBoard;
    }catch(error){
        throw error;
    }
}

export const teamLeaderBoard = async () => {
    try{
        const teams = await Team.find().populate('drifters').lean();

        const teamBoard = await teams.filter(teams => teams.drifters.length ===2)
        .map(team => {
            const totalPoints = team.drifters.reduce((sum, d) => sum + d.totalPoints, 0);
            return {
                ...team,
                totalPoints
            };
        })

    }catch(error){
        throw error;
    }
}