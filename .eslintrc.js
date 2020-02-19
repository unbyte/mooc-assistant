module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    plugins: ['@typescript-eslint'],
    env: {
        browser: true,
        node: true,
    },
    settings: {
        react: {
            pragma: 'React',
            version: 'detect',
        },
    },
};
