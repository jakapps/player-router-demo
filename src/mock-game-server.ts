import { PlayerRouterSingleton } from "player-router-js-sdk";
import {
    agones,
    getGameServerAddress,
    allocate,
    deallocate
}

interface MockGameServerArgs {
    playerRouterURL: Array<string>
};

const mockGameServer = async ({ playerRouterURL }: MockGameServerArgs) => {
    // We're just going to simulate a game server

    let playerCount = 0;

    let agones = await agones();
    const gameServerURL = await getGameServerAddress();

    if(!gameServerURL) {
        return;
    }

    const config = {
        playerRouterURL,
        gameServerURL,
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
        console.log("timeout")

        if(playerCount < 1) {
            agones.allocate();
            playerCount++;
        } else if(playerCount === 100) {
            playerCount--;
        } else {
//            Math.floot(Math.rand())
        }

        if(playerCount === 0) {
            agones.deallocate();
        }

    }, 3000);
};

export { mockGameServer };
