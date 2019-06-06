import * as React from "react";
import { PlayerModel, PlayerCreateModel } from "src/types";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { Formik, FormikProps, Form, FormikConfig } from "formik";
import { InputField } from "@components/inputs/textfield-component";
import { Button } from "@material-ui/core";
import { playerApiCommands } from "@api/player";
const styles = () => createStyles({
    Container: {
    }
});

interface OwnProps {
    onClose(): void;
    player?: PlayerModel;
    teamId: number;
}

type Props = OwnProps & WithStyles<typeof styles>;
class PlayerFormComponentClass extends React.Component<Props> {
    private validate = (value: string) => {
        let error;
        if (!value) {
            error = "Laukas yra privalomas";
        }
        return error;
    }
    private validateNumber = (value: number) => {
        let error;
        if (!value) {
            error = "Laukas yra privalomas";
        }
        if (value > 99 || value < 1) {
            error = "Numeris privalo būti 1 iki 99";
        }
        return error;
    }
    public render(): JSX.Element {
        const { player, teamId } = this.props;
        return <div
            className={this.props.classes.Container}
        ><Formik<PlayerCreateModel>
            initialValues={player != null ? {
                id: player.id,
                name: player.name,
                number: player.number,
                teamId
            } : {
                    id: 0,
                    name: "",
                    number: 0,
                    teamId
                }}
            onSubmit={this.onSubmit}
            render={(formikBag: FormikProps<PlayerCreateModel>) => {
                return <Form>
                    <InputField<keyof PlayerCreateModel>
                        type="text"
                        name="name"
                        label="Vardas"
                        fullWidth={true}
                        validate={this.validate}
                    />
                    <InputField<keyof PlayerCreateModel>
                        type="number"
                        name="number"
                        label="Marškinėlių numeris"
                        fullWidth={true}
                        validate={this.validateNumber}
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

    private onSubmit: FormikConfig<PlayerCreateModel>["onSubmit"] = async (values) => {
        const { player } = this.props;
        if (player == null || player.id === 0) {
            await playerApiCommands.post(values);
        } else {
            await playerApiCommands.patch(player.id, values);
        }

        this.props.onClose();
        return 1;
    }
}

export const PlayerFormComponent = withStyles(styles)(PlayerFormComponentClass);
