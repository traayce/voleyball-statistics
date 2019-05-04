import * as React from "react";
import { PaperContainer } from "@components/paper-container";
import { TeamsListComponent } from "./components-teams-list";

class TeamListContainerClass extends React.Component {
    public render(): JSX.Element {
        return <PaperContainer>
            <TeamsListComponent />
        </PaperContainer>;
    }
}
export const TeamsLisContainerComponent = TeamListContainerClass;