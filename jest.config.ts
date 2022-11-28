import type { Config } from "jest";

const jestConfig: Config = {
	rootDir: ".",
	transform: {
		"^.+\\.(ts|js)x?$": "ts-jest",
	},
	testRegex: "(/__test__/.*|(\\.|/)test)\\.(ts|js)x?$",
	moduleFileExtensions: ["tsx", "ts", "jsx", "js"],
	verbose: true,
	moduleNameMapper: {
		"\\.(css|less)$": "identity-obj-proxy",
	},
};

export default jestConfig;
