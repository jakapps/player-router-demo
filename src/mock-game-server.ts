import { PlayerRouterSingleton } from "player-router-js-sdk";
import {
    startAgones,
    getGameServerAddress,
    allocate,
    deallocate
} from "./agones";

interface MockGameServerArgs {
    playerRouterURL: Array<string>
};

const mockGameServer = async ({ playerRouterURL }: MockGameServerArgs) => {
    // We're just going to simulate a game server

    let playerCount = 0;
    let gameServerURL = "ws://localhost:1342";

    let agones = await startAgones();

    // If agones doesn't work, then we just assume that the server is being
    // run for dev/testing purposes
    if(agones) {
        gameServerURL = await getGameServerAddress(agones);

        if(!gameServerURL) {
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

    PlayerRouterSingleton.Setup(config);

    setInterval(() => {
        // Randomly change player counts every 3 seconds

        if(playerCount < 1) {
            allocate(agones);
            playerCount++;
        } else if(playerCount === 100) {
            playerCount--;
        } else {
        }

        let diff = Math.floor(Math.random() - 0.5);
        diff = diff === -1 ? diff : 1;

        playerCount += diff;

        PlayerRouterSingleton.Get().setPlayerCount(playerCount);

        if(playerCount === 0) {
            deallocate(agones);
        }

    }, 3000);
};

export { mockGameServer };
