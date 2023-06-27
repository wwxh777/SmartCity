<template>
    <div class="Time">
        <span class="text">
            {{ timeInfo.dateYear }} {{ timeInfo.dateWeek }}
            {{ timeInfo.dateDay }}
        </span>
    </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  onMounted,
  onUnmounted,
} from 'vue'
import { formatTime } from '@/utils/index'
import { WEEK } from '@/constant/index'
export default defineComponent({
  setup() {
    // * 时间内容
    const timeInfo = reactive({
      setInterval: 0,
      dateDay: '',
      dateYear: '',
      dateWeek: ''
    })
    // 生命周期
    onMounted(() => {
      handleTime()
    })

    onUnmounted(() => {
      clearInterval(timeInfo.setInterval)
    })

    // todo 处理时间监听
    const handleTime = () => {
      timeInfo.setInterval = setInterval(() => {
        const date = new Date()
        timeInfo.dateDay = formatTime(date, 'HH: mm: ss')
        timeInfo.dateYear = formatTime(date, 'yyyy-MM-dd')
        timeInfo.dateWeek = WEEK[date.getDay()]
      }, 1000)
    }

    return {
      timeInfo,
    }
  }
})
</script>
<style lang="scss" class>
$box-height: 45px;
$box-width: 300px;
.Time {
  padding: 8px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;

  .text {
    color: #c3cbde;
    font-size: 23px;
  }
}
</style>