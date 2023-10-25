module.exports = {
  // 控制 .editorconfig 是否生效
  root: true,
  // env: {
  //   browser: true,
  //   node: true,
  // },
  // parser: 'babel-eslint',
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    ecmaVersion: 'latest', // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      tsx: true, // Allows for the parsing of JSX
      jsx: true,
    },
  },
  settings: {
    tsx: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  extends: [
    // 'prettier', // The "prettier" config now includes not just ESLint core rules, but also rules from all plugins. Much simpler!
    // 'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    // 'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    // 'plugin:vue/recommended',
    // 'eslint:recommended',
    // 'plugin:vue/vue-recommended',
    'plugin:vue/vue3-recommended',
    // 'plugin:vue/vue3-strongly-recommended',
    // 'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    // If you use eslint-plugin-prettier, all you need is plugin:prettier/recommended
  ],
  // plugins: ['prettier'], // eslint-plugin-prettier
  rules: {
    // '@typescript-eslint/interface-name-prefix': 'off',
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    // '@typescript-eslint/no-explicit-any': 'off',
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    // 'prettier/prettier': 'error', // 开启规则
    'vue/v-on-event-hyphenation': 'off', // 关闭 v-on 事件名使用连字符,可使用驼峰
    'vue/multi-word-component-names': 'off',
    semi: ['warn', 'never'],
    'vue/script-indent': ['error', 2, { baseIndent: 1 }],
    // // 解决let被强转为const问题
    // 'prefer-const': true,
    // // 保存代码时缩进4个空格
    // indent: ['error', 2],
    // 'prettier/prettier': [
    //   'error',
    //   {},
    //   {
    //     usePrettierrc: true,
    //     fileInfoOptions: {
    //       withNodeModules: true,
    //     },
    //   },
    // ],
    // 'semi-spacing': [
    //   2,
    //   {
    //     before: false,
    //     after: true,
    //   },
    // ],
    //   'vue/max-attributes-per-line': [
    //     'warn',
    //     {
    //       singleline: 5, // 标签为单行时，每行最大属性数值为 5,
    //       multiline: {
    //         max: 1, // 标签为多行时，每行最大属性数字为 1
    //         // allowFirstLine: false, // 不允许属性与该标记名称位于同一行
    //       },
    //     },
    //   ],
  },
}
