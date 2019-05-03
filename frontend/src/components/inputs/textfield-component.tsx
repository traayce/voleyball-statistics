import * as React from "react";
import { FieldProps, Field, FieldAttributes, getIn } from "formik";
import { default as MuiTextField, TextFieldProps } from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

interface AdditionalProps<TFieldNames> {
    name: TFieldNames;
    readOnly?: boolean;
}

type InputFieldProps<TFieldNames extends string> = FieldAttributes<TextFieldProps> & AdditionalProps<TFieldNames>;

const render = <TFieldNames extends string = string>({ readOnly, margin, ...props }: InputFieldProps<TFieldNames>) =>
    ({ field, form }: FieldProps): JSX.Element => {
        const error = getIn(form.errors, field.name);
        const touch = getIn(form.touched, field.name);
        const isError = Boolean(touch) && Boolean(error);
        const disabled: boolean = props.disabled || form.isSubmitting || form.isValidating;

        return <>
            <MuiTextField
                {...props}
                {...field}
                disabled={disabled}
                error={isError}
                InputProps={{ ...props.InputProps, readOnly }}
            />
            {isError ? <FormHelperText error={true}>{error}</FormHelperText> : undefined}
        </>;
    };

export function InputField<TFieldNames extends string = string>(props: InputFieldProps<TFieldNames>): React.ReactElement<FieldProps> {
    const { validate, ...inputFieldProps } = props;
    return <Field
        {...props}
        render={render(inputFieldProps)}
    />;
}