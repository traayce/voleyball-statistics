import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { MatchComponent } from "./components-match-beginning-component";
import { PaperContainer } from "@components/paper-container";

interface Params {
    id?: string;
}
type Props = RouteComponentProps<Params>;
class MatchBeginningContainerClass extends React.PureComponent<Props> {
    public render(): JSX.Element | null {
        if (this.props.match.params.id == null) {
            return null;
        }
        return <PaperContainer>
            <MatchComponent id={this.props.match.params.id} />
        </PaperContainer>;
    }
}

export const MatchBeginningContainer = withRouter(MatchBeginningContainerClass);