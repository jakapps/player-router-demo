"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockGameServer = void 0;
const player_router_js_sdk_1 = require("player-router-js-sdk");
const agones_1 = require("./agones");
;
const mockGameServer = ({ playerRouterURL }) => __awaiter(void 0, void 0, void 0, function* () {
    // We're just going to simulate a game server
    let playerCount = 0;
    let gameServerURL = "ws://localhost:1342";
    let agones = yield agones_1.startAgones();
    // If agones doesn't work, then we just assume that the server is being
    // run for dev/testing purposes
    if (agones) {
        gameServerURL = yield agones_1.getGameServerAddress(agones);
        if (!gameServerURL) {
            return;
        }
    }
    const config = {
        playerRouterURL,
        gameServerURL,
        id: "demo-server-1",
        user: "gameserver",
        password: process.env.PLAYER_ROUTER_PASSWORD || "gameserver123",
        labels: {
            stage: "prod",
            version: "1.0.0"
        }
    };
    player_router_js_sdk_1.PlayerRouterSingleton.Setup(config);
    setInterval(() => {
        // Randomly change player counts every 3 seconds
        if (playerCount < 1) {
            agones_1.allocate(agones);
            playerCount++;
        }
        else if (playerCount === 100) {
            playerCount--;
        }
        else {
        }
        let diff = Math.floor(Math.random() - 0.5);
        diff = diff === -1 ? diff : 1;
        playerCount += diff;
        player_router_js_sdk_1.PlayerRouterSingleton.Get().setPlayerCount(playerCount);
        if (playerCount === 0) {
            agones_1.deallocate(agones);
        }
    }, 3000);
});
exports.mockGameServer = mockGameServer;
//# sourceMappingURL=mock-game-server.js.map