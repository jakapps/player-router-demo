import AgonesSDK from "@google-cloud/agones-sdk";

const agones = async () => {
    // Need to register this server to agones via the agones SDK

    if(!process.env.AGONES_SDK_HTTP_PORT) {
        return;
    }

    let agones = new AgonesSDK();
    await agones.connect();
    agones.health();
    await agones.ready();
    setInterval(() => agones.health(), 2500);

    return agones;
};

const getGameServerAddress = async (agones) : Promise<string> => {

    let gameserver = await agones.getGameServer();

    if(!gameserver.status || !gameserver.status.portsList.length) {
        return "";
    }

    let address = gameserver.status.address;
    let port = gameserver.status.portsList[0].port;

    if(!address || !port) {
        return "";
    }

    return `wss://${address}:${port}`;
};

const allocate = (agones) : Promise<any> => {

    if(!agones) {
        return;
    }

    return agones.allocate();
}

const deallocate = (agones) : Promise<any> => {

    if(!agones) {
        return;
    }

    return agones.ready();
}

export {
    agones,
    allocate,
    deallocate,
    getGameServerAddress
};
