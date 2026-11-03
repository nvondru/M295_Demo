import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier'

export default [
    { ignores: ['dist/**', 'node_modules/**'] },
    ...tseslint.configs.recommended,
    {
        plugins: { prettier },
        rules: { 'prettier/prettier': 'warn' },
    },
]