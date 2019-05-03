import * as React from "react";
import { FieldProps } from "formik";
import { DatePickerInlineProps, DateTimePicker } from "material-ui-pickers";
import { InputDateFieldBase } from "./date-base";

export class InputDateInlineField<TFieldNames extends string = string> extends InputDateFieldBase<TFieldNames, DatePickerInlineProps> {
    protected renderPicker({ field, form }: FieldProps): JSX.Element {
        let isError: boolean = false;
        let currentError: string | undefined;
        if (form.touched[field.name]) {
            currentError = form.errors[field.name] as string;
            isError = Boolean(currentError) && Boolean(form.touched[field.name]);
        }
        const { onChange, onBlur, openTo, ...otherProps } = this.props;
        return <DateTimePicker
            mask={this.getDefaultMask}
            format={this.defaultFormat}
            {...otherProps}
            name={field.name}
            value={field.value || null}
            onError={this.onError}
            onChange={this.onChange}
            onClear={this.onClear}
            onBlur={this.onBlur}
            helperText={currentError}
            error={isError}
            disabled={this.props.disabled || form.isSubmitting || form.isValidating}
            ampm={false}
            cancelLabel="Atšaukti"
            okLabel="Patvirtinti"
            clearLabel="Išvalyti"
        />;
    }
}