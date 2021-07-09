import { mockGameServer } from "./mock-game-server";

mockGameServer({
    playerRouterURL: [process.env.PLAYER_ROUTER_URL || "ws://localhost:3002"]
});
