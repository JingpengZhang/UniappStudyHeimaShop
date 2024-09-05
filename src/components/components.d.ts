import { GlobalComponents } from './../types/component.d'
import XtxSwiper from './XtxSwiper.vue'
import XtxGuess from './XtxGuess.vue'

declare module 'vue' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
    XtxGuess: typeof XtxGuess
  }
}

// 猜你喜欢组件实例类型
export type XtxGuessInstance = InstanceType<typeof XtxGuess>
