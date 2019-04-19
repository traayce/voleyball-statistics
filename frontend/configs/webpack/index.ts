import {common} from "./common";
import {dev} from "./dev";
import {prod} from "./prod";
const merge = require("webpack-merge");
export const prodSettings = merge(common, prod);

export const devSettings = merge(common, dev);