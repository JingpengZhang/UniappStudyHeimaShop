<script setup lang="ts">
import { ref } from 'vue'
import CustomNavbar from './components/CustomNavbar.vue'
import type { BannerItem } from '@/types/home'
import { getHomeBannerAPI } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'

// 获取轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}

// 页面加载
onLoad(() => {
  getHomeBannerData()
})
</script>

<template>
  <CustomNavbar />
  <!-- 自定义轮播图 -->
  <XtxSwiper :list="bannerList" />
  <view class="index">
    <uni-card title="基础卡片" extra="额外信息">
      <text>这是一个基础卡片示例，此示例展示了一个标题加标题额外信息的标准卡片。</text>
    </uni-card>
  </view>
</template>

<style lang="scss">
//
</style>
