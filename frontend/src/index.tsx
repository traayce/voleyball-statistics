import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { storeCreator } from "./store/createStore";
import { AppComponent } from "./scenes/App/app-component";
import { IStore } from "./store/state";
const rootEl = document.getElementById("root");

const auth = localStorage.getItem("auth");
let preloadedAuth;
if (auth !== null) {
    preloadedAuth = JSON.parse(auth);
}
const ApplicationStore = storeCreator({ authentication: preloadedAuth } as IStore);

const RootComponent: React.SFC = () => (
    <Provider store={ApplicationStore}>
        <AppComponent />
    </Provider>
);

render(<RootComponent />, rootEl);
