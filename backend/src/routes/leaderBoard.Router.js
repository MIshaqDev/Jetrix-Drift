import express from "express";
import * as leaderBoard from "../controller/leaderboard.Cont.js";

const LeaderBoardRouter = express.Router();

LeaderBoardRouter.get("/drifters", async (req, res) => {
    try {
        const drifterBoard = await leaderBoard.drifterLeaderBoard();
        return res.status(200).send(drifterBoard);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

LeaderBoardRouter.get("/teams", async (req, res) => {
    try {
        const teamBoard = await leaderBoard.teamLeaderBoard();
        return res.status(200).send(teamBoard);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
})

export default LeaderBoardRouter;