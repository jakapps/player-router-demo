import { PlayerRouterSingleton } from "player-router-js-sdk";

interface MockGameServerArgs {
    playerRouterURL: Array<string>
};

const mockGameServer = async ({ playerRouterURL }: MockGameServerArgs) => {
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
        console.log("timeout")
    }, 3000);
};

export { mockGameServer };
