import * as React from "react";
import { FieldProps, FieldAttributes, Field } from "formik";
import { TextFieldProps } from "@material-ui/core/TextField";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import * as moment from "moment";
import momentUtils from "@date-io/moment";
import * as yup from "yup";
import { DateTextFieldProps } from "material-ui-pickers/_shared/DateTextField";
import { BasePickerProps } from "material-ui-pickers/_shared/BasePicker";

interface AdditionalProps<TFieldNames> {
    name: TFieldNames;
    onChange?(): void;
    onClear?(): void;
}

type InputFieldProps<TFieldNames extends string, TProps> = Partial<TProps> & FieldAttributes<TextFieldProps> & AdditionalProps<TFieldNames>;

export abstract class InputDateFieldBase<TFieldNames extends string = string, TProps extends BasePickerProps = DateTextFieldProps>
    extends React.PureComponent<InputFieldProps<TFieldNames, TProps>> {

    protected readonly defaultFormat: string = "YYYY/MM/DD HH:mm";

    protected getDefaultMask: DateTextFieldProps["mask"] = value => {
        if (!Boolean(value)) {
            return [];
        }
        return [/\d/, /\d/, /\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, " ", /\d/, /\d/, ":", /\d/, /\d/];
    }

    protected fieldError?: string;
    protected fieldProps?: FieldProps;

    private formikFieldValidator = (value: string): void | string => {
        if (this.fieldError) {
            return this.fieldError;
        }

        let validator = yup.string().strict(true).trim().nullable(true);
        if (this.props.required) {
            validator = validator.required();
        }

        try {
            validator.validateSync(value);
        } catch (err) {
            return err.message;
        }
    }

    private parseValue = (value: string | moment.Moment | null): string | null => {
        if (!value) {
            return null;
        } else if (typeof value !== "string" && value.toISOString != null) {
            return value.toISOString();
        } else {
            return value.toString();
        }
    }

    protected onError: DateTextFieldProps["onError"] = (_, error) => {
        const errorString = this.fieldError = `${error}`;
        if (this.fieldProps == null) {
            return;
        }
        const { field, form } = this.fieldProps;
        setTimeout(() => {
            form.setFieldError(field.name, errorString);
        });
    }

    protected onChange: DateTextFieldProps["onChange"] = value => {
        this.fieldError = undefined;
        if (this.fieldProps == null) {
            return;
        }
        const { field, form } = this.fieldProps;
        form.setFieldValue(field.name, this.parseValue(value), true);
        if (this.props.onChange != null) {
            this.props.onChange();
        }
    }

    protected onBlur: DateTextFieldProps["onBlur"] = event => {
        if (this.fieldProps != null) {
            const { field } = this.fieldProps;
            field.onBlur(event);
        }

        if (this.props.onBlur != null) {
            event.persist();
            this.props.onBlur(event);
        }
    }

    protected onClear: DateTextFieldProps["onClear"] = () => {
        if (this.fieldProps == null) {
            return;
        }
        this.onChange(null);

        if (this.props.onClear != null) {
            this.props.onClear();
        }
    }

    public componentWillUnmount(): void {
        this.fieldProps = undefined;
        this.fieldError = undefined;
    }

    protected abstract renderPicker(fieldProps: FieldProps): JSX.Element;

    private renderDatePicker = (fieldProps: FieldProps): JSX.Element => {
        this.fieldProps = fieldProps;
        return this.renderPicker(fieldProps);
    }

    public render(): JSX.Element {
        const { validate, ...inputFieldProps } = this.props;
        return <MuiPickersUtilsProvider moment={moment} utils={momentUtils}>
            <Field {...inputFieldProps} validate={this.formikFieldValidator} render={this.renderDatePicker} />
        </MuiPickersUtilsProvider>;
    }
}