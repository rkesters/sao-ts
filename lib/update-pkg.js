const when = (condition, value, fallback) => (condition ? value : fallback)
const commands = (cmds) => cmds.filter(Boolean).join(' && ') || undefined

module.exports = ({ name, description, username, email, eslint }, data) => {
  const useXo = eslint !== 'disable'
  return {
    name,
    version: '0.0.0',
    description,
    scripts: {
      lint: when(useXo, eslint),
      dev: 'nodemon --exec ts-node src/index.ts',
      prepare: 'husky install',
    },
    repository: {
      url: `${username}/${name}`,
      type: 'git',
    },
    author: `${username}<${email}>`,
    license: 'MIT',
    devDependencies: {
      '@typescript-eslint/eslint-plugin': when(useXo, 'latest'),
      '@typescript-eslint/parser': when(useXo, 'latest'),
      'eslint-config-prettier': when(useXo, 'latest'),
      'eslint-config-rem': when(useXo, '3.1.0'),
      'eslint-config-xo-typescript': when(useXo, 'latest'),
      'eslint-plugin-prettier': when(useXo, 'latest'),
      xo: when(useXo, 'latest'),
      prettier: 'latest',
      husky: 'latest',
      'lint-staged': 'latest',
      nodemon: 'latest',
      'ts-node': 'latest',
      typescript: 'latest',
    },
    xo: when(useXo, {
      extends: ['rem', 'plugin:prettier/recommended', 'xo-typescript'],
      extensions: ['ts'],
      rules: {
        'unicorn/filename-case': 'off',
        'new-cap': 'off',
        'typescript/no-inferrable-types': 'off',
        'import/no-unassigned-import': 'off',
        'typescript/explicit-function-return-type': 'off',
        'no-throw-literal': 'off',
      },
    }),
    'lint-staged': {
      linters: {
        '*.{ts,js}': when(useXo, [`${eslint} --fix`, 'git add']),
        '*.{json,md,ts,js}': ['prettier --write', 'git add'],
      },
    },
  }
}
