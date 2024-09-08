import type { PageParams } from "@/types/global";
import { http } from "@/utils/http";

// 获取热门推荐
type HotParams = PageParams & { subType?: string }
export const getHotRecommendAPI = (url: string, data?: HotParams) => {
  return http({
    method: 'GET',
    url,
    data,
  })
}
