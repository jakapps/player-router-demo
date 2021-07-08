
const agones = () => {
    // Need to register this server to agones via the agones SDK

    if(!process.env.AGONES_SDK_HTTP_PORT) {
        return;
    }
};


export { agones };
