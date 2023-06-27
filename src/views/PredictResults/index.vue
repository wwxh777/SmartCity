<template>
  <div class="top-right-cmp">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <i class="iconfont icon-chart-area" />
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2 mt-1">全城流量预测</span>
        </div>
      </div>
      <div class = "line-chart">
        <dv-charts :option="option"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopRightCmp',
  data () {
    return {
      option: {
        legend: {
          data: [
            {
              name: 'GMAN',
              color: '#ff5ca9'
            },
            {
              name: 'FC-GAGA',
              color: '#00baff'
            }         
          ],
          textStyle: {
            fill: '#fff'
          }
        },
        xAxis: {
          name: 'hour',
          data: [
            '', '1', '', '2', '', '3', '', '4', '', '5', '', '6'
          ],
          boundaryGap: false,
          axisLine: {
            style: {
              stroke: '#999'
            }
          },
          axisLabel: {
            style: {
              fill: '#999'
            }
          },
          axisTick: {
            show: true
          }
        },
        yAxis: {
          name: 'km/h',
          data: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            style: {
              stroke: '#999'
            }
          },
          axisLabel: {
            style: {
              fill: '#999'
            }
          },
          axisTick: {
            show: false
          },
          min: 0,
          max: 60
        },
        series: [
          {
            name: 'GMAN',
            data: [
              22, 25, 38, 45, 54, 55, 46, 54, 48, 53, 55, 35
            ],
            type: 'line',
            lineStyle: {
              stroke: '#ff5ca9'
            },
            linePoint: {
              radius: 4,
              style: {
                fill: '#ff5ca9',
                stroke: 'transparent'
              }
            }
          },
          {
            name: 'FC-GAGA',
            data: [
              21, 24, 33, 43, 53, 53, 48, 50, 43, 49, 54, 34
            ],
            type: 'line',
            smooth: true,
            lineArea: {
              show: true,
              gradient: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 0)']
            },
            lineStyle: {
              lineDash: [5, 5]
            },
            linePoint: {
              radius: 4,
              style: {
                fill: '#00db95'
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$box-height: 300px;
$box-width: 300px;
.top-right-cmp {
  position: relative;
  margin-top: 10px;
  padding: 12px;
  height: $box-height;
  width: $box-width;
  .bg-color-black {
    height: $box-height - 25px;
    border-radius: 10px;
  }
  .line-chart {
    margin-top: -35px;
    margin-left: -5px;
    width: 300px;
    height: 280px;
  }
}
</style>