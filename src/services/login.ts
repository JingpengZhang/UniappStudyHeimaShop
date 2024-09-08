import { http } from "@/utils/http"

export type LoginParams = {
  code: string
  encryptedData: string
  iv: string
}

/**
 * 小程序登录
 * @param data 请求参数
 */
export const postLoginWxMin = (data: LoginParams) => {
  return http({
    method: 'POST',
    url: '/login/wxMin',
    data,
  })
}
