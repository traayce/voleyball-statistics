import * as React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { storeCreator } from "./store/createStore";
import { AuthenticationContainer } from "./components/authentication/components-authentication-container";
const rootEl = document.getElementById("root");

const store = storeCreator();

const RootComponent: React.SFC<{}> = () => (
    <Provider store={store}>
            <AuthenticationContainer />
    </Provider>
);
render(
    <RootComponent />,
    rootEl
);

// Hot Module Replacement API
declare let module: { hot: any };
type RenderFactory = (component: React.ComponentClass<any> | React.SFC<any>) => void;
if (!module.hot) {
    render(<RootComponent />, rootEl);
} else {

    const renderFactory: RenderFactory = Component => {
        console.log("Hot Reload");
        render(
            <AppContainer>
                <Component />
            </AppContainer>,
            rootEl
        );
    };
    renderFactory(RootComponent);
    module.hot.accept("./components/authentication/components-authentication-container", () => renderFactory(RootComponent));
}

