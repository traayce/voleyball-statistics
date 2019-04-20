import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { storeCreator } from "./store/createStore";
import { AppComponent } from "./components/App/app-component";
const rootEl = document.getElementById("root");

const store = storeCreator();

const RootComponent: React.SFC = () => (
    <Provider store={store}>
        <AppComponent />
    </Provider>
);

render(<RootComponent />, rootEl);
