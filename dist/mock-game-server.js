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
;
const mockGameServer = ({ playerRouterURL }) => __awaiter(void 0, void 0, void 0, function* () {
    // We're just going to simulate a game server
    let gameServerURL = "";
    const config = {
        playerRouterURL,
        gameServerURL,
        user: "gameserver",
        password: "gameserver123",
        labels: {
            stage: "prod",
            version: "1.0.0"
        }
    };
    setInterval(() => {
        // Randomly change player counts every 3 seconds
        console.log("timeout");
    }, 3000);
});
exports.mockGameServer = mockGameServer;
//# sourceMappingURL=mock-game-server.js.map