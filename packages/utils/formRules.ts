// 表单校验自定义规则

import { Rule } from 'ant-design-vue/lib/form'

export const checkPhone = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject('请输入手机号')
  }

  // const regPhone =
  //   /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
  const regPhone = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/

  if (regPhone.test(value)) {
    return Promise.resolve()
  } else {
    return Promise.reject('手机号不正确')
  }
}
export const checkCode = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject('请输入短信验证码')
  }

  if (value.length > 3 && value.length < 7) {
    return Promise.resolve()
  } else {
    return Promise.reject('验证码长度为 4 到 6 位')
  }
}
export const checkPass = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject('请输入密码')
  }
  return Promise.resolve()
  // if (value.length > 3 && value.length < 9) {
  //   return Promise.resolve();
  // } else {
  //   return Promise.reject('密码长度为 4 到 8 位');
  // }
}
// const checkPassAgain = async (_rule: Rule, value: string) => {
//   if (!value) {
//     return Promise.reject('请再次输入新密码');
//   } else if (value !== formData.password) {
//     return Promise.reject('两次密码不一致!');
//   } else {
//     return Promise.resolve();
//   }
// };

// 校验正整数
export const checkNonVoid = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject('请输入或选择内容')
  }
  return Promise.resolve()
}
// 校验正整数
export const checkPositiveInt = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject('请输入正整数')
  }
  const regexp = /^[1-9]\d*$/
  if (!regexp.test(value)) {
    return Promise.reject('请输入正整数')
  }
  return Promise.resolve()
}
