import type { Config } from "jest";

const jestConfig: Config = {
	setupFiles:["./src/setupTests.ts"],
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
	testEnvironment: "jsdom",
};

export default jestConfig;
