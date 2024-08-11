module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
    "next/core-web-vitals",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "react-compiler"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react-compiler/react-compiler": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@next/next/no-img-element": "off",
    "react-hooks/exhaustive-deps": "off",
    "react-refresh/only-export-components": "off",
  },
};
