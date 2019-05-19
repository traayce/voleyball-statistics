import * as React from "react";
import { hot } from "react-hot-loader/root";
import { PaperContainer } from "@components/paper-container";
import { ScenesRegistrationComponent } from "./scenes-registration-component";

class AuthenticationContainerClass extends React.PureComponent {
    public render(): JSX.Element {
        return <PaperContainer>
            <ScenesRegistrationComponent authenticate={() => null} />
        </PaperContainer>;
    }
}
export const ScenesRegistrationContainer = hot(AuthenticationContainerClass);