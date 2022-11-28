const path = require("path");
const HtmlWebpackConfig = require("html-webpack-plugin");
import { Configuration } from "webpack";

const config: Configuration = {
	mode: "production",
	target: "web",
	entry: "./src/index.tsx",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: ["css-loader"],
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	plugins: [
		new HtmlWebpackConfig({
			template: path.join(__dirname, "src", "index.html"),
		}),
	],
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
	},
};

export default config;
