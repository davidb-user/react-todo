import type { Config } from "jest";

const jestConfig: Config = {
	setupFilesAfterEnv: ["./test/setupTests.ts"],
	rootDir: ".",
	transform: {
		"^.+\\.(ts|js)x?$": "ts-jest",
	},
	testRegex: "(/__test__/.*|(\\.|/)spec)\\.(ts|js)x?$",
	moduleFileExtensions: ["tsx", "ts", "jsx", "js"],
	verbose: true,
	moduleNameMapper: {
		"\\.(css|less)$": "identity-obj-proxy",
	},
	testEnvironment: "jsdom",
};

export default jestConfig;
