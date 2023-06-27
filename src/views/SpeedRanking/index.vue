<template>
  <div class="SpeedRanking">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <i class="iconfont icon-align-left" />
        </span>
        <span class="fs-xl text mx-2">各行政区均速(KM/H)</span>
      </div>
      <div class="d-flex ai-center flex-column body-box">
        <dv-capsule-chart class="dv-cap-chart" :config="config" />
        <chart />
      </div>  
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({

  setup() {
    var district = ['光明','宝安','坪山','龙华','福田','南山','盐田','龙岗','罗湖'];
    district.sort(function () {
      return 0.5 - Math.random();
    });
    const config = reactive({
      data: [
        {
          name: district[0],
          value: Math.random()*2+42
        },
        {
          name: district[1],
          value: Math.random()*2+40
        },
        {
          name: district[2],
          value: Math.random()*2+37
        },
        {
          name: district[3],
          value: Math.random()+36
        },
        {
          name: district[4],
          value: Math.random()+35
        },
        {
          name: district[5],
          value: Math.random()*2+32
        },
        {
          name: district[6],
          value: Math.random()+31
        },
        {
          name: district[7],
          value: Math.random()*2+29
        },
        {
          name: district[8],
          value: Math.random()*2+24
        }
      ],
      //unit: 'KM/H'
    })

    return { config }
  }
})
</script>

<style lang="scss" scoped>
$box-height: 370px;
$box-width: 300px;
.SpeedRanking {
  margin-top: 15px;
  padding: 16px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    //padding: 5px;
    height: $box-height - 30px;
    width: $box-width - 30px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    //border-radius: 10px; 
    overflow: hidden;
    .dv-cap-chart {
      width: 265px;
      height: 320px;
    }
  }
}
</style>
 