import * as React from "react";
import { MatchModel, MatchCreateModel } from "src/types";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { Formik, FormikProps, Form, FormikConfig } from "formik";
import { InputField } from "@components/inputs/textfield-component";
import { Button, Typography } from "@material-ui/core";
import { InputDateInlineField } from "@components/inputs/date/date-picker";
import { matchApiCommands } from "@api/match";
import isEqual = require("lodash/isEqual");
import { IntegrationDownshift } from "@components/inputs/lookup";
import { withRouter, RouteComponentProps } from "react-router";

const styles = () => createStyles({
});

interface OwnProps {
    onClose(): void;
    model: MatchModel;
}
type Props = OwnProps & WithStyles<typeof styles> & RouteComponentProps;
class MatchFormComponentClass extends React.Component<Props> {
    public render(): JSX.Element {
        const { model } = this.props;
        console.log(model);
        return <Formik<MatchCreateModel>
            initialValues={this.getInitialValues(model)}
            onSubmit={this.onSubmit}
            render={(formikBag: FormikProps<MatchCreateModel>) => (
                <Form>
                    <InputField<keyof MatchCreateModel>
                        type="text"
                        name="location"
                        label="Vieta"
                        fullWidth={true}
                    />
                    <InputDateInlineField
                        name="startsAt"
                        label="Žaidimo pradžia"
                        fullWidth={true}
                        disablePast={true}
                        keyboard={true}
                        clearable={true}
                    />
                    <IntegrationDownshift />
                    <Button
                        color="primary"
                        type="submit"
                        variant="contained"
                        disabled={formikBag.isSubmitting} >Išsaugoti</Button>
                    <Typography>Valdymas</Typography>
                    {this.renderControl()}
                </ Form>
            )}
        >
        </Formik>;
    }

    private renderControl = (): JSX.Element | null => {
        const { model } = this.props;
        if (model == null || model.isFinished) {
            return null;
        }
        return <div>
            <Button
                color="primary"
                type="button"
                variant="contained"
                onClick={this.redirect(!model.isStarted ? `matches/${model.id}/setup` : `matches/${model.id}`)}>{model.isStarted ? "Tęsti" : "Pradėti"} varžybas</Button>
        </div>;
    }

    private redirect = (path: string): React.MouseEventHandler => () => {
        const { history } = this.props;
        history.push(path);
    }

    private onSubmit: FormikConfig<MatchCreateModel>["onSubmit"] = async (values) => {
        const { model } = this.props;
        debugger;
        if (model == null || model.id === 0) {
            await matchApiCommands.post(values);
        } else {
            const dirtyData = this.PickDirtyData(values);
            if (dirtyData != null) {
                await matchApiCommands.patch(model.id, dirtyData);
            }
        }

        this.props.onClose();
        return 1;
    }

    private getInitialValues = (model: MatchModel): MatchCreateModel => {
        return model != null ? {
            id: model.id,
            startsAt: model.startsAt,
            location: model.location,
            isStarted: model.isStarted,
            secretaryId: model.secretary.id,
            teamAId: model.teamA.id,
            teamBId: model.teamB.id,
            isFinished: model.isFinished
        } : {
                id: 0,
                startsAt: new Date(),
                location: "",
                isStarted: false,
                secretaryId: 0,
                teamAId: 0,
                teamBId: 0,
                isFinished: false
            };
    }

    public PickDirtyData(
        values: Partial<MatchCreateModel>
    ): undefined | Partial<MatchCreateModel> {

        const initialData = this.getInitialValues(this.props.model);
        if (initialData == null) {
            return values;
        }

        const dirtyData: Partial<MatchCreateModel> = {};
        let isDirty: boolean = false;
        Object.keys(values).forEach(key => {
            const keyName = key as keyof typeof values;

            const newValue = values[keyName];
            const oldValue = initialData[keyName];

            if (!isEqual(newValue, oldValue)) {
                isDirty = true;
                dirtyData[keyName] = newValue;
            }
        });

        return isDirty ? dirtyData : undefined;
    }
}

export const MatchFormComponent = withRouter(withStyles(styles)(MatchFormComponentClass));
