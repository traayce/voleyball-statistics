import * as React from "react";
import { MatchModel, MatchCreateModel } from "src/types";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { Formik, FormikProps, Form, FormikConfig } from "formik";
import { InputField } from "@components/inputs/textfield-component";
import { Button } from "@material-ui/core";
import { InputDateInlineField } from "@components/inputs/date/date-picker";

const styles = () => createStyles({
});

interface OwnProps {
    onSubmit: (match: MatchModel) => React.MouseEventHandler;
    match: MatchCreateModel;
}
type Props = OwnProps & WithStyles<typeof styles>;
class MatchFormComponentClass extends React.Component<Props> {
    public render(): JSX.Element {
        const { match } = this.props;
        return <Formik<MatchCreateModel>
            initialValues={match}
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
                        openToYearSelection={true}
                        clearable={true}
                    />
                    <Button
                        color="primary"
                        type="submit"
                        variant="contained"
                        disabled={formikBag.isSubmitting} >Išsaugoti</Button>
                </ Form>
            )}
        >
        </Formik>;
    }

    private onSubmit: FormikConfig<MatchCreateModel>["onSubmit"] = () => {
    }
}

export const MatchFormComponent = withStyles(styles)(MatchFormComponentClass);
