import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'array-bracket-newline': ['error', 'consistent'],
    'array-element-newline': ['error', 'consistent'],
    'no-console': 'off',
    'no-empty-function': 'off',
    'sort-keys': 'warn',
    'ts/adjacent-overload-signatures': 'error',
    'ts/array-type': 'error',
    'ts/ban-tslint-comment': 'error',
    'ts/class-literal-property-style': 'error',
    'ts/consistent-generic-constructors': 'error',
    'ts/consistent-indexed-object-style': 'error',
    'ts/consistent-type-definitions': 'error',
    'ts/no-confusing-non-null-assertion': 'error',
    'ts/no-empty-function': 'error',
    'ts/no-empty-interface': 'error',
    'ts/no-inferrable-types': 'off',
    'ts/prefer-for-of': 'error',
    'ts/prefer-function-type': 'error',
    'ts/prefer-namespace-keyword': 'error',
  },
  typescript: true,
}, [
  {
    ignores: ['**/docs/**'],
  },
])
