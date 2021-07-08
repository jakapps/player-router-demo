"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agones = void 0;
const agones = () => {
    // Need to register this server to agones via the agones SDK
    if (!process.env.AGONES_SDK_HTTP_PORT) {
        return;
    }
};
exports.agones = agones;
//# sourceMappingURL=agones.js.map