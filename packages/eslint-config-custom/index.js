module.exports = {
  env: {
    browser: true,
    node: true,
  },
  globals: {
    React: "readonly",
  },
  extends: [
    "next",
    "airbnb",
    "airbnb-typescript",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "import"],
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/"],
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: ["apps/*/tsconfig.json", "packages/*/tsconfig.json"],
      },
    },
  },
  rules: {
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
      },
    ],
    "@next/next/no-html-link-for-pages": "off",
    "import/no-extraneous-dependencies": ["warn", { devDependencies: true }],
    "react/jsx-props-no-spreading": [0],
  },
  ignorePatterns: [
    "**/*.js",
    "**/*.json",
    "node_modules",
    "public",
    "styles",
    ".next",
    "coverage",
    "dist",
    ".turbo",
  ],
};
