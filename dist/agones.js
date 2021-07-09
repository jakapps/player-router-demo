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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGameServerAddress = exports.deallocate = exports.allocate = exports.agones = void 0;
const agones_sdk_1 = __importDefault(require("@google-cloud/agones-sdk"));
const agones = () => __awaiter(void 0, void 0, void 0, function* () {
    // Need to register this server to agones via the agones SDK
    if (!process.env.AGONES_SDK_HTTP_PORT) {
        return;
    }
    let agones = new agones_sdk_1.default();
    yield agones.connect();
    agones.health();
    yield agones.ready();
    setInterval(() => agones.health(), 2500);
    return agones;
});
exports.agones = agones;
const getGameServerAddress = (agones) => __awaiter(void 0, void 0, void 0, function* () {
    let gameserver = yield agones.getGameServer();
    if (!gameserver.status || !gameserver.status.portsList.length) {
        return "";
    }
    let address = gameserver.status.address;
    let port = gameserver.status.portsList[0].port;
    if (!address || !port) {
        return "";
    }
    return `wss://${address}:${port}`;
});
exports.getGameServerAddress = getGameServerAddress;
const allocate = (agones) => {
    if (!agones) {
        return;
    }
    return agones.allocate();
};
exports.allocate = allocate;
const deallocate = (agones) => {
    if (!agones) {
        return;
    }
    return agones.ready();
};
exports.deallocate = deallocate;
//# sourceMappingURL=agones.js.map