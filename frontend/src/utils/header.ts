
export const GetRequestHeader = () => {
    // const { authentication } = ApplicationStore.getState() as IStore;

    const auth = localStorage.getItem("auth");
    let token;
    if (auth !== null) {
        const preloadedAuth = JSON.parse(auth);
        if (preloadedAuth != null) {
            token = preloadedAuth.token;
        }
    }
    return ({
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};