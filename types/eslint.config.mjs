/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended
});

function legacyPlugin(name, alias = name) {
  const plugin = compat.plugins(name)[0]?.plugins?.[alias];

  if (!plugin) {
    throw new Error(`Unable to resolve plugin ${name} and/or alias ${alias}`);
  }

  return fixupPluginRules(plugin);
}

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}']
  },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  ...compat.extends('plugin:import/typescript'),
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
      import: legacyPlugin('eslint-plugin-import', 'import')
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json'
        }
      }
    },
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        project: true,
        ecmaFeatures: {
          tsx: true
        }
      },
      globals: {
        ...globals.browser
      }
    },
    rules: {
      'no-use-before-define': 'off',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto'
        }
      ],
      '@typescript-eslint/no-unsafe-argument': 'error',
      'import/order': [
        1,
        {
          groups: ['external', 'builtin', 'internal', 'sibling', 'parent', 'index'],
          pathGroups: [
            {
              pattern: '@chakra-ui/**',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/features/**',
              group: 'internal'
            }
          ],
          pathGroupsExcludedImportTypes: ['internal'],
          'newlines-between': 'always-and-inside-groups',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ]
    }
  },
  {
    ignores: ['.history/', '.storybook/', 'lib/', 'eslint.config.mjs']
  }
];
