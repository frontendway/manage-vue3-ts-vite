module.exports = {
  "env": {
    "es2021": true
  },
  "extends": [
    "standard-with-typescript",
    "plugin:vue/vue3-recommended"
  ],
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "parser": "@typescript-eslint/parser",
    "project": ['./tsconfig.json'],
    "extraFileExtensions": ['.vue']
  },
  "plugins": [
    "vue"
  ],
  "rules": {
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "no-debugger": "off"
  }
}
