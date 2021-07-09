"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mock_game_server_1 = require("./mock-game-server");
mock_game_server_1.mockGameServer({
    playerRouterURL: [process.env.PLAYER_ROUTER_URL || "ws://localhost:3002"]
});
//# sourceMappingURL=index.js.map