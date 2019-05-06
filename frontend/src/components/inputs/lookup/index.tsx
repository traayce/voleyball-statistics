import * as React from "react";
import * as deburr from "lodash/deburr";
import Downshift, { PropGetters, DownshiftState } from "downshift";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { WithStyles, createStyles, Theme, withStyles } from "@material-ui/core";

const suggestions: Item[] = [
    { label: "Afghanistan" },
    { label: "Aland Islands" },
    { label: "Albania" },
    { label: "Algeria" },
    { label: "American Samoa" },
    { label: "Andorra" },
    { label: "Angola" },
    { label: "Anguilla" },
    { label: "Antarctica" },
    { label: "Antigua and Barbuda" },
    { label: "Argentina" },
    { label: "Armenia" },
    { label: "Aruba" },
    { label: "Australia" },
    { label: "Austria" },
    { label: "Azerbaijan" },
    { label: "Bahamas" },
    { label: "Bahrain" },
    { label: "Bangladesh" },
    { label: "Barbados" },
    { label: "Belarus" },
    { label: "Belgium" },
    { label: "Belize" },
    { label: "Benin" },
    { label: "Bermuda" },
    { label: "Bhutan" },
    { label: "Bolivia, Plurinational State of" },
    { label: "Bonaire, Sint Eustatius and Saba" },
    { label: "Bosnia and Herzegovina" },
    { label: "Botswana" },
    { label: "Bouvet Island" },
    { label: "Brazil" },
    { label: "British Indian Ocean Territory" },
    { label: "Brunei Darussalam" },
];

function renderInput(inputProps: any) {
    const { InputProps, classes, ref, ...other } = inputProps;
    console.log(inputProps);
    return (
        <TextField
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                    input: classes.inputInput,
                },
                ...InputProps,
            }}
            {...other}
        />
    );
}

interface Item {
    id?: number;
    label: string;
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }: any) {
    const isHighlighted = highlightedIndex === index;
    console.log(selectedItem);
    return (
        <MenuItem
            {...itemProps}
            key={suggestion.label}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: 400,
            }}
        >
            {suggestion.label}
        </MenuItem>
    );
}

function getSuggestions(value: string | null) {
    if (value == null) return [];
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        height: 250,
    },
    container: {
        flexGrow: 1,
        position: "relative",
    },
    paper: {
        position: "absolute",
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    inputRoot: {
        flexWrap: "wrap",
    },
    inputInput: {
        width: "auto",
        flexGrow: 1,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});
type Props = WithStyles<typeof styles>;
class DownshiftClass extends React.Component<Props> {
    public render(): JSX.Element {
        const { classes } = this.props;
        return <div className={classes.root}>
            <Downshift id="downshift-simple"
            itemToString={(item: Item) => item.label}>
                {({
                    getInputProps,
                    getItemProps,
                    getMenuProps,
                    highlightedIndex,
                    inputValue,
                    isOpen,
                    selectedItem,
                }: PropGetters<Item> & DownshiftState<Item>) => {
                    return (<div className={classes.container}>
                        {renderInput({
                            fullWidth: true,
                            classes,
                            InputProps: getInputProps({
                                placeholder: "Search a country (start with a)",
                            }),
                        })}
                        <div {...getMenuProps()}>
                            {isOpen ? (<Paper className={classes.paper} square>
                                {getSuggestions(inputValue).map((suggestion: Item, index: number) => renderSuggestion({
                                    suggestion,
                                    index,
                                    itemProps: getItemProps({ item: suggestion }),
                                    highlightedIndex,
                                    selectedItem,
                                }))}
                            </Paper>) : null}
                        </div>
                    </div>);
                }}
            </Downshift>
        </div>;
    }
}


export const IntegrationDownshift = withStyles(styles)(DownshiftClass);