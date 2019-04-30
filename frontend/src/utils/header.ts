
export const GetRequestHeader = () => {
    // const { authentication } = ApplicationStore.getState() as IStore;

    const auth = localStorage.getItem("auth");
    let preloadedAuth;
    if (auth !== null) {
        preloadedAuth = JSON.parse(auth);
    }
    return ({
        headers: {
            "Authorization": `Bearer ${preloadedAuth.token}`
        }
    });
};