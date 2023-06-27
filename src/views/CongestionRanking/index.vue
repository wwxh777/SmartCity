<template>
  <div class="CongestionRanking">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <i class="iconfont icon-vector" />
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">拥堵区域排行榜</span>
        </div>
      </div>
      <div class="d-flex mt-1 jc-center body-box">
        <dv-scroll-board class="dv-scr-board" :config="config" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup() {
    var district = ['海上田园','海滨栈道','东部华侨城','大梅沙','沙井中心','海雅缤纷城','光明农场','茂业天地','万象天地','宝安中心','深圳书城','喜荟城','背仔角沙滩','深圳北站','会展中心','人才公园','科兴科学城','大万世居','深圳湾科技生态园'];
    district.sort(function () {
      return 0.5 - Math.random();
    });
    const config = reactive({
      header: ['区域', '拥堵指数', '较平日'],
      data: [
        [district[0], (Math.random()+7).toFixed(3), "<span  class='colorRed';font-size: 13px>566.3%↑</span>"],
        [district[1], (Math.random()*0.5+6.5).toFixed(3), "<span  class='colorRed'>358.9%↑</span>"],
        [district[2], (Math.random()*0.5+6).toFixed(3), "<span  class='colorRed'>322.6%↑</span>"],
        [district[3], (Math.random()*0.5+5.5).toFixed(3), "<span  class='colorRed'>214.9%↑</span>"],
        [district[4], (Math.random()*0.5+5).toFixed(3), "<span  class='colorRed'>258.9%↑</span>"],
        [district[5], (Math.random()*0.5+4.5).toFixed(3), "<span  class='colorRed'>	209.2%↑</span>"],
        [district[6], (Math.random()*0.5+4).toFixed(3), "<span  class='colorRed'>218.9%↑</span>"],
        [district[7], (Math.random()*0.5+3.5).toFixed(3), "<span  class='colorRed'>178.6%↑</span>"],
      ],
      rowNum: 7, //表格行数
      headerHeight: 35,
      headerBGC: '#0f1325', //表头
      oddRowBGC: '#0f1325', //奇数行
      evenRowBGC: '#171c33', //偶数行
      index: true,
      hoverPause: true,
      columnWidth: [20,85,85,80],
      align: ['left','left','center','center']
    })
    return { config }
  }
})
</script>

<style lang="scss" scoped>
$box-height: 370px;
$box-width: 300px;
.CongestionRanking {
  margin-top: 15px;
  padding: 16px;
  //padding-top: 20px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    //padding: 5px;
    height: $box-height - 30px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    //border-radius: 10px;
    overflow: hidden;
    .dv-scr-board {
      width: 270px;
      height: 300px;
    }
  }
}
</style>
