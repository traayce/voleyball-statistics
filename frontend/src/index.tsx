import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { storeCreator } from "./store/createStore";
import { AppComponent } from "./components/App/app-component";
const rootEl = document.getElementById("root");

const auth = localStorage.getItem("auth");
let preloadedState = window.__PRELOADED_STATE__;
debugger;
let preloadedAuth;
if (auth !== null) {
    preloadedAuth = JSON.parse(auth);
}
const finalPreloadedState = preloadedAuth
    ? {
        ...preloadedState,
        authentication: preloadedAuth
    }
    : preloadedState;
const store = storeCreator(finalPreloadedState);

const RootComponent: React.SFC = () => (
    <Provider store={store}>
        <AppComponent />
    </Provider>
);

render(<RootComponent />, rootEl);
