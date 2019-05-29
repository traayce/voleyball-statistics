import * as React from "react";
import { FieldProps, Field, FieldAttributes, getIn } from "formik";
import FormHelperText from "@material-ui/core/FormHelperText";
import { FormControl, InputLabel, Select, Input, MenuItem } from "@material-ui/core";
import { SelectProps } from "@material-ui/core/Select";

interface AdditionalProps<TFieldNames> {
    name: TFieldNames;
    readOnly?: boolean;
    selectItems: SelectListItem[];
}

export interface SelectListItem {
    id: number;
    label: string;
}

type InputFieldProps<TFieldNames extends string> = FieldAttributes<SelectProps> & AdditionalProps<TFieldNames>;

const render = <TFieldNames extends string = string>({ readOnly, margin, className, selectItems, ...props }: InputFieldProps<TFieldNames>) =>
    ({ field, form }: FieldProps): JSX.Element => {
        const error = getIn(form.errors, field.name);
        const touch = getIn(form.touched, field.name);
        const isError = Boolean(touch) && Boolean(error);
        const disabled: boolean = props.disabled || form.isSubmitting || form.isValidating;
        const MenuProps = {
            PaperProps: {
                style: {
                    maxHeight: 48 * 4.5 + 8,
                    width: 250,
                },
            },
        };
        return <div className={className}>
            <FormControl error={isError}>
                <InputLabel htmlFor="select-multiple">Name</InputLabel>
                <Select
                    {...props}
                    {...field}
                    disabled={disabled}
                    input={<Input  {...props.inputProps} readOnly />}
                    MenuProps={MenuProps}
                >
                    {selectItems.map(item => (
                        <MenuItem key={`${item.id}-select-item`} value={item.id} >
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{error}</FormHelperText>
            </FormControl>
        </div>;
    };

export function SelectField<TFieldNames extends string = string>(props: InputFieldProps<TFieldNames>): React.ReactElement<FieldProps> {
    const { validate, ...inputFieldProps } = props;
    return <Field
        {...props}
        render={render(inputFieldProps)}
    />;
}