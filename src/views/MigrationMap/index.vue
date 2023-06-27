<template>
  <div class="MigrationMap">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <i class="iconfont icon-rank" />
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2 mt-1">城市迁徙地图</span>
        </div>
      </div>
      <div>
        <dv-flyline-chart-enhanced :config="config" :dev="true" style="width:270px;height:150px" />
        <dv-scroll-ranking-board :config="config2" style="width:270px;height:190px" />
        <chart />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const config = reactive({
        points: [
          {
            name: '宝安',
            coordinate: [0.13, 0.53],
          },
          {
            name: '南山',
            coordinate: [0.21, 0.76],
            halo: {
              show: true,
              radius: 30
            }
          },
          {
            name: '龙华',
            coordinate: [0.32, 0.44]
          },
          {
            name: '光明',
            coordinate: [0.21, 0.25]
          },
          {
            name: '福田',
            coordinate: [0.33, 0.75],
            halo: {
              show: true,
              radius: 30
            }
          },
          {
            name: '罗湖',
            coordinate: [0.45, 0.69]
          },
          {
            name: '龙岗',
            coordinate: [0.57, 0.35]
          },
          {
            name: '盐田',
            coordinate: [0.58, 0.63]
          },
          {
            name: '坪山',
            coordinate: [0.71, 0.44]
          },
          {
            name: '大鹏',
            coordinate: [0.82, 0.60]
          }
        ],
        lines: [
          {
            source: '宝安',
            target: '南山',
            color: '#fb7293',
            width: 2
          },
          {
            source: '光明',
            target: '南山'
          },
          {
            source: '龙华',
            target: '福田',
            color: '#fb7293',
            width: 2
          },
          {
            source: '龙岗',
            target: '福田'
          },
          {
            source: '龙岗',
            target: '南山'
          },
          {
            source: '坪山',
            target: '福田'
          },
          {
            source: '龙华',
            target: '南山'
          },
          {
            source: '坪山',
            target: '龙华'
          },
          {
            source: '龙岗',
            target: '罗湖'
          },
          {
            source: '宝安',
            target: '福田'
          }
        ],
        icon: {
          show: true,
          src: require("../../assets/10001.png")
        },
        // text: {
        //   show: true,
        // },
        bgImgSrc: require("../../assets/szmap.png")
    })
    const config2 = reactive({
      data: [
        {
          name: '龙岗 — 罗湖',
          value: 6.31
        },
        {
          name: '宝安 — 南山',
          value: 18.57
        },
        {
          name: '龙岗 — 福田',
          value: 12.35
        },
        {
          name: '宝安 — 福田',
          value: 8.67
        },
        {
          name: '龙华 — 福田',
          value: 15.32
        },
        {
          name: '罗湖 — 南山',
          value: 9.64
        },
        {
          name: '坪山 — 龙华',
          value: 5.24
        }
      ]
    })
    return { config, config2 }
  }
})

</script>

<style lang="scss" scoped>
$box-height: 400px;
$box-width: 300px;
.MigrationMap {
  margin-top: 0px;
  padding: 12px;
  height: $box-height;
  width: $box-width;
  //border-radius: 5px;
  .bg-color-black {
    height: $box-height - 25px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .dv-scroll-ranking-board{
    margin-top: 8px;
  }
}
</style>
