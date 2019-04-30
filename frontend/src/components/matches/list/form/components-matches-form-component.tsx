import * as React from "react";
import { Paper, WithStyles, withStyles, Button, FormControl, InputLabel, Input, FormHelperText } from "@material-ui/core";
import { MatchesContainerStyles } from "../components-matches-styles";
import { MatchFormModalComponent } from "./components-matches-form-modal-component";
import axios from "axios";
import { MatchCreateModel } from "src/types";

interface OuterProps {
    model?: MatchCreateModel;
    onFinished?(): void;
}
type Props = WithStyles<typeof MatchesContainerStyles> & OuterProps;

interface State {
    id: number;
    name: string;
    nameError: string;
    code: string;
    codeError: string;
    price: number;
    priceError: string;
    photo: File | null;
    isSubmiting: boolean;
    isConfirmationOpen: boolean;
    error: string;
}

class MatchFormComponentClass extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);
        if (props.model !== undefined) {
            const { location, id, secretaryId } = props.model;
            this.state = {
                ...this.state,
                id: id,
                name: location,
                code: location,
                price: secretaryId
            };
        }
    }
    public initialState: State = {
        id: 0,
        name: "",
        nameError: "",
        code: "",
        codeError: "",
        price: 0,
        priceError: "",
        photo: null,
        isSubmiting: false,
        isConfirmationOpen: false,
        error: ""
    };
    public state: State = this.initialState;

    public render(): JSX.Element {
        const { classes, model } = this.props;
        const { name, code, price, photo, isSubmiting, isConfirmationOpen, error, priceError, codeError, nameError } = this.state;
        console.log(model);
        return <Paper className={classes.Container}>
            <MatchFormModalComponent
                isOpen={isConfirmationOpen}
                handleClose={this.onModalResponse} />
            <form onSubmit={this.onFormSubmit} className={classes.Center}>
                {this.renderErrorBox(error)}
                <FormControl className={classes.TextField} error={nameError !== ""}>
                    <InputLabel >Name</InputLabel>
                    <Input id="name"
                        placeholder="Product Name"
                        value={name}
                        onChange={this.handleChange("name")} />
                    <FormHelperText>{nameError}</FormHelperText>
                </FormControl>

                <FormControl className={classes.TextField} error={codeError !== ""}>
                    <InputLabel >Code</InputLabel>
                    <Input id="code"
                        placeholder="Product Code"
                        value={code}
                        onChange={this.handleChange("code")} />
                    <FormHelperText>{codeError}</FormHelperText>
                </FormControl>

                <FormControl className={classes.TextField} error={priceError !== ""}>
                    <InputLabel >Price</InputLabel>
                    <Input
                        id="price"
                        value={price}
                        type="number"
                        placeholder="Product Code"
                        onChange={
                            this.handleChange("price", (val) => parseInt(val) > 0, "Number must be higher than 0")} />
                    <FormHelperText>{priceError}</FormHelperText>
                </FormControl>
                <div>
                    {photo != null ? photo.name : null}
                </div>
                {!model.isStarted && <Button
                    className={classes.Button}
                    variant="contained"
                    color="primary"
                    component="label"
                >Pradėti rungtynes
                </Button>}
                <br />
                <Button
                    className={classes.Button}
                    color="primary"
                    type="submit"
                    variant="contained"
                    disabled={isSubmiting || (priceError !== "" || nameError !== "" || codeError !== "" || price === 0 || name === "" || code === "")}>Išsaugoti</Button>
                <br />
                {model !== undefined ? `Varžybos prasideda: ${model.startsAt}` : null}
            </form>
        </Paper>;
    }

    private renderErrorBox = (error: string) => {
        const { classes } = this.props;
        if (error === "")
            return null;
        return <>
            <br />
            <div className={classes.Alert}>
                {error}
            </div>
            <br />
        </ >;
    }

    private onModalResponse = (isConfirmed: boolean) => () => {
        this.setState({ isConfirmationOpen: false });
        if (isConfirmed) {
            this.submit();
        }
    }

    private onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { price } = this.state;
        if (price > 999) {
            this.setState({ isConfirmationOpen: true });
            return;
        }
        this.submit();
    }

    private submit = () => {
        const { name, code, price, photo, id } = this.state;
        const formData = new FormData();
        formData.append("Name", name);
        formData.append("Code", code);
        formData.append("Price", price.toString());
        if (photo != null) {
            formData.append("Photo", photo);
        }
        // todo: move API logic into separate file
        const baseURL: string = "http://localhost:3000/api";
        const endpoint: string = "/product/v1.1";
        const request = axios.create({
            baseURL,
            headers: {
                Accept: "multipart/form-data"
            }
        });
        if (id === 0) {
            request
                .post(`${endpoint}`, formData)
                .then(res => {
                    this.sendOnFinish();
                })
                .catch(err => {
                    const { data } = err.response;
                    this.setState({ error: data });
                    console.log(err);
                });
        } else {
            request
                .put(`${endpoint}/${id}`, formData)
                .then(res => {
                    this.sendOnFinish();
                })
                .catch(err => {
                    const { data } = err.response;
                    this.setState({ error: data });
                    console.log(err);
                });
        }
    }

    private sendOnFinish = () => {
        const { onFinished } = this.props;
        this.setState(this.initialState);
        if (onFinished !== undefined) {
            onFinished();
        }
    }

    private handleChange = (name: string, isValid: (val: string) => boolean = (val) => val !== "", error: string = "Field is Required"): React.ChangeEventHandler<HTMLInputElement> =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            console.log(value);
            this.setState({
                [name + "Error"]: !isValid(value) ? error : "",
                [name]: event.target.value,
            });
        }
}

export const MatchFormComponent = withStyles(MatchesContainerStyles)(MatchFormComponentClass);