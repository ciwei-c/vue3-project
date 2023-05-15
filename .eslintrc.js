module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  globals: {
    _: true,
    define: true,
    exports: true,
    require: true,
    $: true,
    // luckysheet: true
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    camelcase: [
      "error",
      {
        properties: "never",
      },
    ], //保持驼峰，属性除外
    "default-case": 2, //switch必须含有default
    "new-cap": 2, //构造函数名以大写字母开头
    "no-restricted-globals": 2, //全局变量禁止重复定义
    "no-redeclare": 2, //禁止重复定义变量
    "no-native-reassign": 2, //禁止重写native对象
    "no-implied-eval": 2, ///禁止使用隐式eval
    "no-extra-semi": 2, //禁止使用不必要的分号
    "no-extra-label": 2, //消除不必要的标签
    "no-extra-boolean-cast": 2, //禁止不必要的布尔转换
    "no-eval": 2, //禁止使用eval
    "no-undef": 2, //禁止使用未声明的变量
    "no-unused-labels": 2, //*禁止消除未使用的标签
    "no-unused-vars": [
      "error",
      {
        //禁止声明的变量,未使用
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false,
      },
    ],
    "no-use-before-define": 2, //禁止使用未声明的变量，存在作用域提升情况
    "no-multiple-empty-lines": [1, { max: 1 }], ///空行最多不能超过1行
    "require-await": 2, //async 必须含有await
    "no-dupe-args": 2, //禁止函数声明或表达式中使用重复的参数名称
    "no-empty-pattern": 0,
    "no-useless-escape": 0,
    semi: ["error", "always"], //末尾必须添加分号,
    "vue/require-default-prop": 0,
    "vue/max-attributes-per-line": 0,
    "vue/no-unused-components": 0,
    "vue/order-in-components": 0,
    "vue/html-self-closing": 0,
    "vue/require-prop-types": 0,
    "vue/attribute-hyphenation": 0,
    "vue/html-indent": [
      0,
      2,
      {
        attribute: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    "vue/no-multiple-template-root": 0,
    "vue/multi-word-component-names": 0,
    "vue/no-v-html": 0,
    "vue/singleline-html-element-content-newline": 0,
    "vue/attributes-order": 2,
    "vue/component-name-in-template-casing": [
      "error",
      "kebab-case",
      {
        registeredComponentsOnly: true,
        ignores: [],
      },
    ],
  },
};
