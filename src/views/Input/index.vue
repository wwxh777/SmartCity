<template>
  <div class="Input">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <i class="iconfont icon-yingyong" />
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2 mt-1">热力图渲染选项</span>
        </div>
      </div>

      <n-config-provider :theme="darkTheme">
        <n-space class="chart-box" vertical>
          <span class="text1">请选择预测模型</span>
          <n-space>
            <n-radio
              :checked="checkedValue === 'GMAN'"
              value="GMAN"
              name="basic-demo"
              @change="handleChange"
            >
              GMAN
            </n-radio>

            <n-radio
              :checked="checkedValue === 'FCGAGA'"
              value="FCGAGA"
              name="basic-demo"
              @change="handleChange"
            >
              FC-GAGA
            </n-radio>
          </n-space>
          <span class="text2">预测{{value2}}小时后的交通状况</span>
          <n-space>
            <n-slider v-model:value="value2" 
              :max = 6 
              :min = 0.5
              :default-value = 1 
              :step="0.5"
            />
          </n-space>
          <n-space>
            <n-button type="info" :focusable = "true" color="#2080F0" @click="handlePredict">
              预测结果
            </n-button>
            <n-button type="info" :focusable = "true" color="#2080F0" @click="handleNow">
              当前路况
            </n-button>
            <n-button type="info" :focusable = "true" color="#2080F0" @click="handleClose">
              关闭显示
            </n-button>
          </n-space>
        </n-space>
      </n-config-provider>
      
    </div>
  </div>
</template>

<script lang = "ts">
import { defineComponent, ref } from 'vue'
import { darkTheme } from 'naive-ui'
import mittBus from '@/utils/mittBus'

export default defineComponent({

  setup () {
    const checkedValueRef = ref<string | null>(null)
    const value2Ref = ref<string | null>(null)
    return {
      disabled: ref(false),
      checkedValue: checkedValueRef,
      handleChange (e: Event) {
        checkedValueRef.value = (e.target as HTMLInputElement).value
      },
      value2: value2Ref,
      handlePredict () {
        //console.log("handlePredict" + checkedValueRef.value + value2Ref.value)
        var url = 'http://10.249.68.181:8081/model?hourS=' + value2Ref.value + '&model=' + checkedValueRef.value;
        fetch(url,{
            method: 'POST',
            body: JSON.stringify({ id: '5e42b22161478f3750fb48e9'}),
            mode:'cors'
        })
            .then(res => res.json())
            .then(res => mittBus.emit("updateHeatMap", res));
      },
      handleNow () {
        console.log("handleNow")
        var url = 'http://10.249.68.181:8081/model?hourS=0&model=GMAN';
        fetch(url,{
            method: 'POST',
            body: JSON.stringify({ id: '5e42b22161478f3750fb48e9'}),
            mode:'cors'
        })
            .then(res => res.json())
            .then(res => mittBus.emit("updateHeatMap", res));
      },
      handleClose () {
         mittBus.emit("closeHeatMap", "close")
      },
      darkTheme
    }
  }
})
</script>

<style lang="scss" class>
$box-height: 205px;
$box-width: 300px;
.Input {
  padding: 12px;
  margin-top: 15px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    height: $box-height - 25px;
    border-radius: 10px;
  }
  .n-slider{
    width: 215px;
    //margin-top: 6px;
    margin-left: 8px;
  }
  .n-input-number{
    width: 75px;
  }
  .text1,.text2{
    margin-left: 8px;
  }
  .n-button{
    margin-left: 0px;
  }
  .n-radio{
    margin-left: 10px;
  }
  .chart-box{
    margin-top: 8px;
  }
}
</style>
