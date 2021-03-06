import * as React from "react";
import { TeamCreateModel, TeamModel } from "src/types";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { Formik, FormikProps, Form, FormikConfig } from "formik";
import { InputField } from "@components/inputs/textfield-component";
import { Button, Grid } from "@material-ui/core";
import { teamApiCommands } from "@api/team";
const styles = () => createStyles({
    Container: {
    }
});

interface OwnProps {
    onClose(): void;
    team?: TeamModel;
}
type Props = OwnProps & WithStyles<typeof styles>;
class TeamFormComponentClass extends React.Component<Props> {
    private validate = (value: string) => {
        let error;
        if (!value) {
            error = "Laukas yra privalomas";
        }
        return error;
    }
    public render(): JSX.Element {
        const { team } = this.props;
        return <div
            className={this.props.classes.Container}
        ><Formik<TeamCreateModel>
            initialValues={team != null ? {
                id: team.id,
                name: team.name,
                city: team.city
            } : {
                    id: 0,
                    name: "",
                    city: ""
                }}
            onSubmit={this.onSubmit}
            render={(formikBag: FormikProps<TeamCreateModel>) => {
                return <Form>
                    <InputField<keyof TeamCreateModel>
                        type="text"
                        name="name"
                        label="Pavadinimas"
                        fullWidth={true}
                        validate={this.validate}
                    />
                    <InputField<keyof TeamCreateModel>
                        type="text"
                        name="city"
                        label="Miestas"
                        fullWidth={true}
                        validate={this.validate}
                    />
                    <Button
                        color="primary"
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={formikBag.isSubmitting || Boolean(Object.keys(formikBag.errors).length)} >Išsaugoti</Button>
                </ Form>;
            }
            }
        >
            </Formik>
        </div>;
    }

    private onSubmit: FormikConfig<TeamCreateModel>["onSubmit"] = async (values) => {
        const { team } = this.props;
        if (team == null || team.id === 0) {
            await teamApiCommands.post(values);
        } else {
            await teamApiCommands.patch(team.id, values);
        }

        this.props.onClose();
        return 1;
    }
}

export const TeamFormComponent = withStyles(styles)(TeamFormComponentClass);
