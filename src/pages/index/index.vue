<script setup lang="ts">
import { ref } from 'vue'
import CustomNavbar from './components/CustomNavbar.vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import type { XtxGuessInstance } from '@/components/components'
import PageSkeleton from './components/PageSkeleton.vue'
import { useGuessList } from '@/composables'

// 获取轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}

// 获取前台分类数据
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}

// 获取热门推荐数据
const hotList = ref<HotItem[]>([])
const getHomeHotData = async () => {
  const res = await getHomeHotAPI()
  hotList.value = res.result
}

// 页面加载状态
const isLoading = ref(false)

// 页面加载
onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  isLoading.value = false
})

// 调用猜你喜欢组合式函数
const { guessRef, onScrolltolower } = useGuessList()

// 下拉刷新状态
const isTriggered = ref(false)
// 自定义下拉刷新触发回调
const onRefresherrefresh = async () => {
  // 开启动画
  isTriggered.value = true
  // 重置数据
  guessRef.value?.resetData()
  // 加载数据
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHomeHotData(),
    guessRef.value?.getMore(),
  ])
  // 关闭动画
  isTriggered.value = false
}
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustomNavbar />

  <scroll-view
    class="scrollView"
    scroll-y
    @scrolltolower="onScrolltolower"
    refresher-enabled
    @refresherrefresh="onRefresherrefresh"
    :refresher-triggered="isTriggered"
  >
    <!-- 骨架屏 -->
    <PageSkeleton v-if="isLoading" />

    <template v-else>
      <!-- 自定义轮播图 -->
      <XtxSwiper :list="bannerList" />
      <!-- 分类 -->
      <CategoryPanel :list="categoryList" />
      <!-- 热门推荐 -->
      <HotPanel :list="hotList" />
      <!-- 猜你喜欢 -->
      <XtxGuess ref="guessRef" />
    </template>
  </scroll-view>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;

  .scrollView {
    flex: 1;
  }
}
</style>
