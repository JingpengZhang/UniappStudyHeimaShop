import type { LoginResult } from "@/types/member"
import { http } from "@/utils/http"

export type LoginParams = {
  code: string
  encryptedData: string
  iv: string
}

/**
 * 小程序登录(个人开发者没有获取手机号的权限)
 * @param data 请求参数
 */
export const postLoginWxMin = (data: LoginParams) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin',
    data,
  })
}

/**
 * 小程序登录（内测版）
 */
export const postLoginWxMinSimpleAPI = (phoneNumber: string) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: {
      phoneNumber,
    },
  })
}
