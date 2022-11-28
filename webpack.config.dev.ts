import { Configuration } from "webpack";
import "webpack-dev-server";
import prodConfig from "./webpack.config";

const config: Configuration = {
	...prodConfig,
	mode: "development",
	devServer: {
		port: 9000,
		hot: true,
		open: true,
	},
	devtool: "source-map",
};

export default config;
