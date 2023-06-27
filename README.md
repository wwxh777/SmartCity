## 一、项目描述

- 这是一个基于 Vue3、TypeScript&JavaScript、DataV、ECharts 的 "智慧城市展示系统"。
- 地图部分基于高德JS API引入，叠加高德实时路况图层，通过Loca 2.0数据可视化引擎完成热力图、网格划分、镜头动画等功能。
- 两侧图表展示了全城流量统计、拥堵区域排名、城市迁徙方向等信息。
- 点击地图任意位置，可弹出信息窗体，展示网格内区域的城市信息。
- 部署了GMAN与FC-GAGA交通预测模型，可选择预测0.5-6小时内（步长0.5小时）的交通状况，并以热力图形式展现在地图上。
- 项目按照 1920*1080 比例设计，支持任意尺寸的同比例（16:9）缩放。
- 项目环境：@vue/cli-4.5.13、DataV-2.10、Echarts-5.1.1、Npm-6.14.6、Node-v14.16。

主要使用的开源项目：

1. [Vue3] https://cn.vuejs.org/
2. [vue-big-screen-plugin] https://gitee.com/MTrun/vue-big-screen-plugin
3. [Apache ECharts] https://echarts.apache.org/zh/index.html
4. [DataV] http://datav.jiaminghi.com/guide/

## 二、主要文件介绍

| 文件                          | 作用/功能                              |
| --------------------------- | ---------------------------------- |
| main.ts                     | 主目录文件，引入注册 自定义组件、DataV 、样式等数据      |
| views/*                     | 界面各个区域组件，index 是项目主结构              |
| utils/*                     | 全局公共函数（包含屏幕适配函数）                   |
| assets/*                    | 静态资源目录，放置图片与全局样式（index 文件样式单独放在这里） |
| components/echart           | 封装的全局图表渲染函数                        |
| components/componentInstall | 全局组件注册位置                           |
| common/*                    | 通用数据配置项（放置 echart 样式与地图数据）         |
| router/*                    | 路由配置区域                             |
| src/ *.d.ts                 | 全局类型声明文件                           |

| views文件夹下组件        | 作用/功能          |
| ------------------ | -------------- |
| center             | 地图组件           |
| CityFlowStatistics | 全城流量统计图表（左上）   |
| SpeedRanking       | 各行政区平均速度排名（左下） |
| CongestionRanking  | 重点区域拥堵情况图表（左中） |
| Time               | 当前时间显示         |
| MigrationMap       | 城市迁徙地图（右上）     |
| PredictResults     | 预测模型结果图表（右中）   |
| Input              | 热力图渲染选项（右下）    |

## 三、使用介绍

### 启动项目

- 安装好 `nodejs` 与 `npm`,在项目主目录下运行 `npm install` 拉取依赖包（如部分依赖无法拉取，请将npm切换为国内源）。
- 把此工程目录下的 `@jiaminghi.rar` 解压并替换掉 node_modules 里面的同名文件。
- 在项目主目录下使用命令`npm run serve`，就可以启动项目，启动项目后最好手动全屏查看（按 F11）。
