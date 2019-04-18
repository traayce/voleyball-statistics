import * as React from "react";
import { LinearProgress, Paper, WithStyles, withStyles, Button, Card, CardActionArea, CardContent, Typography, CardActions, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from "@material-ui/core";
import { MapStateToProps, MapDispatchToProps, connect } from "react-redux";
import { IStore } from "../../store/state";
import { ProductDTO } from "../../store/modules/product";
import { ProductsContainerStyles } from "./components-products-styles";
import { actions } from "../../store/modules/product";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { ProductFormComponent } from "./form/components-products-form-component";

interface StateProps {
  isLoading: boolean;
  products: Array<ProductDTO>;
  error: undefined | string;
  isLoaded: boolean;
}

interface DispatchProps {
  dispatch?: ThunkDispatch<object, void, Action<any>>;
}

type Props = StateProps & DispatchProps & WithStyles<typeof ProductsContainerStyles>;

interface State {
  editingObject: ProductDTO | undefined;
  isEditorOpen: boolean;
  searchText: string;
}

class ProductsClass extends React.Component<Props, State> {
  public initialState: State = {
    editingObject: undefined,
    isEditorOpen: false,
    searchText: ""
  };
  public state: State = this.initialState;
  public static MapStateToProps: MapStateToProps<StateProps, object, IStore> = storeState => ({
    products: storeState.products.products,
    isLoading: storeState.products.isLoading,
    error: storeState.products.error,
    isLoaded: storeState.products.isLoaded
  })

  public static MapDispatchToProps: MapDispatchToProps<DispatchProps, object> = (dispatch: ThunkDispatch<object, void, Action>, props) => ({
    dispatch: dispatch
  })

  public render(): JSX.Element {
    const { products, isLoading, error, classes, isLoaded } = this.props;
    if (isLoaded === false && isLoading === false && error === undefined) {
      this.getProducts();
    }
    if (isLoading) {
      return <Paper className={classes.Container}>
        <LinearProgress />
      </Paper>;
    }
    return <Paper className={classes.Container}>
      {this.renderEditor()}
      <div className={classes.Center}>Products ({error})
            <br />
        <TextField
          id="standard-name"
          label="Enter Product Name"
          value={this.state.searchText}
          onChange={this.handleSearchTextBoxChange}
          margin="normal"
        />
        <br />
        <Button
          className={classes.Button}
          color="primary"
          type="submit"
          variant="contained"
          onClick={this.getProducts}>Fetch Products</Button>
        <Button
          className={classes.Button}
          color="primary"
          type="submit"
          variant="contained"
          onClick={this.openEditor()}>Create New</Button>
      </div>
      <div>
        {this.renderProducts(products)}
      </div>
    </Paper>;
  }

  private renderProducts = (products: ProductDTO[]) => {
    const { classes } = this.props;
    return products.map((product: ProductDTO) => (
      <Card className={classes.card}>
        <CardActionArea onClick={this.openEditor(product)}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Product
          </Typography>
            <Typography component="p">
              {JSON.stringify(product)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={this.onDelete(product.id)}>
            Delete
        </Button>
          <Button size="small" color="primary" onClick={this.openEditor(product)}>
            Edit
        </Button>
        </CardActions>
      </Card>
    ));
  }

  private handleSearchTextBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchText: e.target.value });
  }

  private openEditor = (product?: ProductDTO) => (e: React.MouseEvent<HTMLInputElement>) => {
    this.setState({ editingObject: product, isEditorOpen: true });
  }

  private renderEditor = () => {
    const { editingObject, isEditorOpen } = this.state;
    if (!isEditorOpen)
      return null;
    return <Dialog
      open={true}
      onClose={this.onModalClose()}
    >
      <DialogTitle id="alert-dialog-title">Product Form</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <ProductFormComponent editingObject={editingObject} onFinished={this.onModalClose(true)} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.onModalClose()} color="primary">
          Close
      </Button>
      </DialogActions>
    </Dialog>;
  }

  private onModalClose = (refetch?: boolean) => () => {
    this.setState({ editingObject: undefined, isEditorOpen: false });
    if (refetch) {
      this.getProducts();
    }
  }

  private onDelete = (id: number) => (e: React.MouseEvent<HTMLInputElement>) => {
    const { dispatch } = this.props;
    if (dispatch != null) {
      dispatch(actions.deleteProduct(id));
    }
    this.getProducts();
  }

  private getProducts = () => {
    const { dispatch } = this.props;
    const { searchText } = this.state;
    if (dispatch != null) {
      dispatch(actions.getProducts(searchText));
    }
  }
}
export const ProductsListComponent = withStyles(ProductsContainerStyles)(connect(ProductsClass.MapStateToProps, ProductsClass.MapDispatchToProps)(ProductsClass));