export const transformRequestOptions = (params: Array<any>) => {
    let options = "";
    for (const key in params) {
        if (typeof params[key] !== "object" && params[key]) {
            options += `${key}=${params[key]}&`;
        } else if (typeof params[key] === "object" && params[key] && params[key].length) {
            params[key].forEach((el: string) => {
                options += `${key}=${el}&`;
            });
        }
    }
    return options ? options.slice(0, -1) : options;
};