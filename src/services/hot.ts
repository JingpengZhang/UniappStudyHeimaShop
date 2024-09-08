import type { PageParams } from '@/types/global'
import type { HotResult } from '@/types/hot'
import { http } from '@/utils/http'

// 获取热门推荐
type HotParams = PageParams & { subType?: string }
export const getHotRecommendAPI = (url: string, data?: HotParams) => {
  return http<HotResult>({
    method: 'GET',
    url,
    data,
  })
}
