import * as React from "react";
import { MatchModel, MatchCreateModel } from "src/types";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { Formik, FormikProps, Form, FormikConfig } from "formik";
import { Button, Typography } from "@material-ui/core";
import { matchApiCommands } from "@api/match";
import isEqual = require("lodash/isEqual");
import { withRouter, RouteComponentProps } from "react-router";
import { InputField } from "@components/inputs/textfield-component";
import { InputDateInlineField } from "@components/inputs/date/date-picker";
import { MatchStatisticsContainer } from "../statistics/components-matches-statistics-component";
import { SelectField } from "@components/inputs/select-component";

const styles = () => createStyles({
    Input: {
        marginTop: "8px",
        paddingLeft: 10
    }
});

interface OwnProps {
    onClose(): void;
    model?: MatchModel;
    hasEditPermission: boolean;
}

type Props = OwnProps & WithStyles<typeof styles> & RouteComponentProps;
class MatchFormComponentClass extends React.Component<Props> {
    public render(): JSX.Element | null {
        const { model, hasEditPermission, classes } = this.props;
        const items = [{ id: 11, label: "Vitameda" }, { id: 10, label: "Blokada" }];
        if (model != null && model.isFinished)
            return <MatchStatisticsContainer id={model.id} />;
        if (!hasEditPermission)
            return <Typography variant="h6" align="center">Detalesnę statistiką galėsite pamatyti tik pasibaigus varžyboms</Typography>
        if (model != null && model.isStarted)
            return this.renderControl();
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
                        className={classes.Input}
                    />
                    <InputDateInlineField
                        name="startsAt"
                        label="Žaidimo pradžia"
                        fullWidth={true}
                        disablePast={true}
                        keyboard={true}
                        clearable={true}
                        className={classes.Input}
                    />
                    <SelectField<keyof MatchCreateModel>
                        type="text"
                        label="Komanda A"
                        name="teamAId"
                        fullWidth={true}
                        items={items}
                        className={classes.Input}
                    />
                    <SelectField<keyof MatchCreateModel>
                        type="text"
                        name="teamBId"
                        label="Komanda B"
                        fullWidth={true}
                        items={items}
                        className={classes.Input}
                    />
                    <Button
                        color="primary"
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={formikBag.isSubmitting} >Išsaugoti</Button>
                    {model != null && <Typography variant="h6" align="center">VALDYMAS</Typography>}
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
                fullWidth
                onClick={this.redirect(!model.isStarted ? `matches/${model.id}/setup` : `matches/${model.id}`)}>{model.isStarted ? "Tęsti" : "Pradėti"} varžybas</Button>
        </div>;
    }

    private redirect = (path: string): React.MouseEventHandler => () => {
        const { history } = this.props;
        history.push(path);
    }

    private onSubmit: FormikConfig<MatchCreateModel>["onSubmit"] = async (values) => {
        const { model } = this.props;
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

    private getInitialValues = (model?: MatchModel): MatchCreateModel => {
        return model != null ? {
            id: model.id,
            startsAt: model.startsAt,
            location: model.location,
            isStarted: model.isStarted,
            teamAId: model.teamA.id,
            teamBId: model.teamB.id,
            isFinished: model.isFinished
        } : {
                id: 0,
                startsAt: new Date(),
                location: "",
                isStarted: false,
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
