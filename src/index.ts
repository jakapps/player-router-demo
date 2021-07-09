import { mockGameServer } from "./mock-game-server";

mockGameServer({
    playerRouterURL: [process.env.PLAYER_ROUTER_URL || "player-router-demo.jakapp.io"]
});
