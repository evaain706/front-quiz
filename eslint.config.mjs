import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import { fixupConfigRules } from '@eslint/compat';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import { readFileSync } from 'node:fs'; // Node.js의 파일 시스템 모듈을 가져옵니다.

// .prettierrc 설정 파일을 동기적으로 읽어와 JSON으로 파싱합니다.
// ESLint 설정이 로드될 때 한 번만 실행되므로 동기 방식도 괜찮습니다.
const prettierConfig = JSON.parse(readFileSync('./.prettierrc', 'utf8'));


const eslintConfig = [
  // 1. 기본 설정 및 전역 변수 설정
  {
    ignores: ['dist/**', 'build/**', 'node_modules/**', 'public/**'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // 2. 기본 JavaScript 및 TypeScript 린팅 규칙
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  // 3. React 관련 린팅 규칙
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ...fixupConfigRules(pluginReactConfig),
    settings: {
      react: { version: 'detect' },
    },
  },

  // 4. Prettier 및 기타 플러그인 설정
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      'unused-imports': unusedImportsPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      // Prettier 규칙을 ESLint 오류로 표시합니다.
      // 여기서 .prettierrc에서 읽어온 설정 객체를 사용합니다.
      'prettier/prettier': ['error', prettierConfig],

      // import 순서를 자동으로 정렬합니다.
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',

      // 사용하지 않는 import를 자동으로 제거합니다.
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-unused-vars': 'off', // unused-imports와 중복되므로 끕니다.

      // React Hooks 규칙을 적용합니다.
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // React 17+ 에서는 React를 import하지 않아도 되므로 이 규칙을 끕니다.
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off', // TypeScript에서 타입을 체크하므로 끕니다.

      // 프로덕션 코드에서 console.log 사용 시 경고를 표시합니다.
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // 5. Prettier와의 충돌 방지 설정 (가장 마지막에 위치해야 합니다)
  eslintConfigPrettier,
];

export default eslintConfig;