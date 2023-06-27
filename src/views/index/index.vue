<template>
  <div id="index" ref="appRef">
    <div class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <div class="d-flex jc-center">
          <dv-decoration-10 class="dv-dec-10" />
          <div class="d-flex jc-center">
            <dv-decoration-8 class="dv-dec-8" :color="['#568aea', '#000000']" />
              <div class="title">
                <span class="title-text">智慧城市展示系统</span>
                <dv-decoration-6
                class="dv-dec-6"
                :reverse="true"
                :color="['#50e3c2', '#67a1e5']"
              />
              </div>
            <dv-decoration-8
              class="dv-dec-8"
              :reverse="true"
              :color="['#568aea', '#000000']"
            />
          </div>
          <dv-decoration-10 class="dv-dec-10-s" />
        </div>

        <div class="body-box">
          <div class = "left">
            <dv-border-box-13>
              <CityFlowStatistics />
            </dv-border-box-13>
            
            <dv-border-box-13>
              <CongestionRanking />
            </dv-border-box-13>

            <dv-border-box-13>
              <SpeedRanking />
            </dv-border-box-13>
          </div>

          <div class = "center">
             <center />
          </div>

          <div class = "right">
            <!-- <dv-border-box-12> -->
              <Time />
            <!-- </dv-border-box-12> -->
            
            <dv-border-box-12>
              <MigrationMap />
            </dv-border-box-12>

            <dv-border-box-12>
              <PredictResults />
            </dv-border-box-12>

            <dv-border-box-12>
              <Input />
            </dv-border-box-12>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  onUnmounted,
} from 'vue'
import useDraw from '@/utils/useDraw'
import { title, subtitle, moduleInfo } from '@/constant/index'
import CityFlowStatistics from '../CityFlowStatistics/index.vue'
import Center from '../center/index.vue'
import SpeedRanking from '../SpeedRanking/index.vue'
import CongestionRanking from '../CongestionRanking/index.vue'
import MigrationMap from '../MigrationMap/index.vue'
import PredictResults from '../PredictResults/index.vue'
import Input from '../Input/index.vue'
import Time from '../Time/index.vue'

export default defineComponent({
  components: {
    CityFlowStatistics,
    Center,
    SpeedRanking,
    CongestionRanking,
    MigrationMap,
    PredictResults,
    Input,
    Time
  },
  setup() {
    // * 颜色
    const decorationColors = ['#568aea', '#000000']
    // * 加载标识
    const loading = ref<boolean>(true)
    // * 适配处理
    const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw()
    // 生命周期
    onMounted(() => {
      cancelLoading()
      // todo 屏幕适应
      windowDraw()
      calcRate()
    })

    onUnmounted(() => {
      unWindowDraw()
      //clearInterval(timeInfo.setInterval)
    })

    // methods
    // todo 处理 loading 展示
    const cancelLoading = () => {
      setTimeout(() => {
        loading.value = false
      }, 800)
    }

    // return
    return {
      loading,
      appRef,
      title,
      subtitle,
      moduleInfo
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';
</style>
