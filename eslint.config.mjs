import eslint from '@eslint/js';
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import jsdoc from 'eslint-plugin-jsdoc';
import jsonc from 'eslint-plugin-jsonc';
import markdown from 'eslint-plugin-markdown';
import globals from 'globals';
import packageJson from 'eslint-plugin-package-json/configs/recommended';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      'coverage*',
      'lib',
      'node_modules',
      'pnpm-lock.yaml',
      '**/*.snap',
    ],
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  eslint.configs.recommended,
  pluginJs.configs.recommended,
  ...jsonc.configs['flat/recommended-with-json'],
  ...markdown.configs.recommended,
  comments.recommended,
  jsdoc.configs['flat/contents-typescript-error'],
  jsdoc.configs['flat/logical-typescript-error'],
  jsdoc.configs['flat/stylistic-typescript-error'],
  ...tseslint.configs({
    extends: [
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    files: ['**/*.js', '**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.config.*s', 'bin/*.js', 'script/*.ts'],
          defaultProject: './tsconfig.json',
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // These off-by-default rules may work well for this project
      'logical-assignment-operators': [
        'error',
        'always',
        { enforceForIfStatements: true },
      ],
      'operator-assignment': 'error',

      // These on-by-default rules may not work well for this project
      'jsdoc/lines-before-block': 'off',
      'no-constant-condition': 'off',

      '@typescript-eslint/no-unused-vars': ['error', { caughtErrors: 'all' }],
      '@typescript-eslint/prefer-nullish-coalescing': [
        'error',
        { ignorePrimitives: true },
      ],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowBoolean: true, allowNullish: true, allowNumber: true },
      ],
      '@typescript-eslint/prefer-cpnst': 'error',
      '@typescript-eslint/no-undef': 'error',
    },
  }),
  {
    files: ['*.jsonc'],
    rules: {
      'jsonc/comma-dangle': 'off',
      'jsonc/no-comments': 'off',
      'jsonc/sort-keys': 'error',
    },
  },

  // {
  //   "parser": "@typescript-eslint/parser",
  //   "parserOptions": {
  //     "ecmaVersion": 12,
  //     "sourceType": "module"
  //   },
  //   "plugins": ["@typescript-eslint"],
  //   "extends": [
  //     "eslint:recommended",
  //     "plugin:@typescript-eslint/recommended",
  //     "prettier"
  //   ],
  // },
];
