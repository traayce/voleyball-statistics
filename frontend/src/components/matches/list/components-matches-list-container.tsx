import * as React from "react";
import { MatchesListComponent } from "./components-matches-component";
import { PaperContainer } from "@components/paper-container";

class MatchContainerClass extends React.Component {
    public render(): JSX.Element {
        return <PaperContainer>
            <MatchesListComponent />
        </PaperContainer>;
    }
}
export const MatchListContainer = MatchContainerClass;