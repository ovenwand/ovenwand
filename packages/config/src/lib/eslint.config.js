import globals from "globals";
import typescriptParser from "@typescript-eslint/parser";
import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import prettierConfig from "eslint-config-prettier";

/** @param {import('@typescript-eslint/eslint-plugin')} ts */
function patchTsEslintConfigForFlatConfig(ts) {
  delete ts.configs["recommended"].extends;
  delete ts.configs["strict"].extends;
  delete ts.configs["strict-type-checked"].extends;

  return [
    ...(ts.configs["eslint-recommended"].overrides ?? []),
    ts.configs["strict-type-checked"],
    {
      languageOptions: {
        parser: typescriptParser,
        parserOptions: {
          sourceType: "module",
        },
      },
      plugins: { "@typescript-eslint": ts },
    },
  ];
}

export default [
  js.configs.recommended,
  ...patchTsEslintConfigForFlatConfig(ts),
  prettierConfig,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        project: [
          "./tsconfig.json",
          "./apps/*/tsconfig.json",
          "./bundles/**/tsconfig.json",
          "./packages/*/tsconfig.json",
        ],
      },
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    rules: {},
  },
];
