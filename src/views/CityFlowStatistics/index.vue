<template>
  <div class="CityFlowStatistics">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <i class="iconfont icon-tongji4" />
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">全城流量统计</span>
          <dv-decoration-3 class="dv-dec-3" />
        </div>
      </div>

      <!-- 4个主要的数据 -->
      <div class="bottom-data">
        <div
          class="item-box mt-2"
          v-for="(item, index) in numberData"
          :key="index"
        >
          <div class="d-flex jc-end">
            <i class="iconfont" :class="[iconFont[index]]" />
            <dv-digital-flop class="dv-digital-flop" :config="item.config" />
          </div>
          <p>
            <span> {{ item.text }} </span>
            <!-- <span class="colorYellow">(件)</span> -->
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { random } from 'lodash'
import { defineComponent, onMounted, onUnmounted,  reactive } from 'vue'
export default defineComponent({
  setup() {
    // 下层数据
    const dataArr = [
      {
        number: 56,
        text: '在途车辆(万辆)'
      },
      {
        number: 34,
        text: '道路均速(KM/H)'
      },
      {
        number: 161,
        text: '拥堵里程(KM)'
      },
      {
        number: 1.5,
        text: '拥堵指数'
      }
    ]
    // 对应图标
    const iconFont = [
      'icon-diagnose',
      'icon-monitoring',
      'icon-cloudupload',
      'icon-clouddownload'
    ]
    const numberData = reactive([])
    let intervalInstance = null
    onMounted(() => {
      setData()
      changeTiming()
    })

    const setData = () => {
      dataArr.forEach(e => {
        numberData.push({
          config: {
            number: [e.number],
            toFixed: 1,
            content: '{nt}',
            style: {
              fontSize: 20
            }
          },
          text: e.text
        })
      })
    }

    const changeTiming = () => {
      intervalInstance = setInterval(() => {
        changeNumber()
      }, 5000)
    }
    const changeNumber = () => {
      numberData.forEach((item) => {
        item.config.number[0] += (Math.random()-0.5)*0.1
        item.config = { ...item.config }
      })
    }
    onUnmounted(() => {
      clearInterval(intervalInstance)   
    })

    return { numberData, iconFont}
  }
})
</script>

<style lang="scss" scoped>
$box-width: 300px;
$box-height: 200px;

.CityFlowStatistics {
  padding: 16px;
  height: $box-height;
  width: $box-width;
  border-radius: 10px;
  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .dv-dec-3 {
    position: relative;
    width: 100px;
    height: 20px;
    top: -3px;
  }

  .bottom-data {
    .item-box {
      & > div {
        padding-right: 5px;
        padding-top: 5px;
      }
      font-size: 14px;
      float: right;
      position: relative;
      width: 50%;
      color: #d3d6dd;
      .dv-digital-flop {
        width: 120px;
        height: 30px;
      }
      i {
        font-size: 20px;
        line-height: 30px;
        margin-left: 20px;
      }
      .colorYellow {
        color: yellowgreen;
      }
      p {
        text-align: center;
      }
    }
  }
}
</style>
