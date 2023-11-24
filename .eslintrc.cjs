module.exports = {
  root: true, // 控制 .editorconfig 是否生效
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  // parser: 'vue-eslint-parser', // parse vue files
  parserOptions: {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    ecmaVersion: 'latest', // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      tsx: true, // Allows for the parsing of JSX
      jsx: true,
    },
  },
  // settings: {
  //   tsx: {
  //     version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
  //   },
  // },
  // globals: {
  //   defineProps: 'readonly',
  //   defineEmits: 'readonly',
  //   defineExpose: 'readonly',
  //   withDefaults: 'readonly',
  //   AnyObject: 'readonly',
  //   uni: 'readonly',
  //   _self: 'readonly',
  //   this: 'readonly',
  // },
  extends: [
    // 'eslint:recommended',
    // 'prettier', // The "prettier" config now includes not just ESLint core rules, but also rules from all plugins. Much simpler!
    // 'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    // 'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    // 'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    // 'plugin:vue/recommended', // Use this if you are using Vue.js 2.x.
    'plugin:vue/vue3-recommended',
    // 'plugin:vue/vue3-strongly-recommended',
  ],
  // plugins: ['prettier', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-types': 'off', // 关闭 Function/Object 等类型警告
    // '@typescript-eslint/interface-name-prefix': 'off',
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    // '@typescript-eslint/no-explicit-any': 'off',
    indent: [
      'error',
      2,
      { 'VariableDeclarator': 'first', 'MemberExpression': 1, 'SwitchCase': 1 }
      // { 'VariableDeclarator': { 'var': 2, 'let': 2, 'const': 3 } }
      // { MemberExpression: 0, SwitchCase: 1, ignoredNodes: ['TemplateLiteral'] },
    ], // 强制使用一致的缩进
    semi: ['warn', 'never'],
    quotes: ['warn', 'single'],
    // We strongly recommend that you do not use the no-undef lint rule on TypeScript projects. The checks it provides are already provided by TypeScript without the need for configuration - TypeScript just does this significantly better.
    'no-undef': 0, // Severity: 0 = off, 1 = warn, 2 = error
    // 'no-unused-vars': 'error',
    // 'no-alert':  process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-bitwise': 'off', // 禁用按位运算符
    // 'no-tabs': 'off', // 禁用 tab
    'arrow-spacing': 'error', // 箭头函数的箭头前后都有空格
    'no-multi-spaces': 'error', // 禁止在单行内非缩进情况出现多个空格
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
    'object-curly-spacing': ['error', 'always'], // 强制在大括号中使用一致的空格
    // 解决let被强转为const问题
    'prefer-const': ['error', {
      'destructuring': 'any',
      'ignoreReadBeforeAssign': false
    }],
    'vue/multi-word-component-names': 'off',
    // 'vue/no-unused-vars': 'warn',
    // 'vue/html-indent': ['error', indent],
    // 'vue/script-indent': ['error', 2, { baseIndent: 1 }],
    'vue/v-on-event-hyphenation': 'off', // 关闭 v-on 事件名使用连字符,可使用驼峰
    // 'vue/max-attributes-per-line': [
    //   'warn',
    //   {
    //     singleline: 5, // 标签为单行时，每行最大属性数值为 5,
    //     multiline: {
    //       max: 1, // 标签为多行时，每行最大属性数字为 1
    //       // allowFirstLine: false, // 不允许属性与该标记名称位于同一行
    //     },
    //   },
    // ],
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
  },
  // overrides: [
  //   {
  //     'files': ['*.vue'],
  //     'rules': { 'indent': 'off' }
  //   }
  // ]
}
