<template>
    <div class="home_div">
        <div id="container"></div>
    </div>
</template>
<script>
import AMapLoader from "@amap/amap-jsapi-loader"
import { shallowRef } from '@vue/reactivity'
import mittBus from '@/utils/mittBus'

export default {
    name:"mapcomtaint",
    setup(){
        const map = shallowRef(null);
        return{
            map,
            message: []
        }

    },
    create(){

    },
    methods:{
        ininMap(){
            AMapLoader.load({
                key:'95a331e7f9f9208df07a9a4a53e4ce6e',  //设置您的key
                version:"2.0",
                plugins:['AMap.ToolBar','AMap.Driving',"AMap.MouseTool","AMap.GeoJSON"],
                AMapUI:{
                    version:"1.1",
                    plugins:[],

                },
                Loca:{
                    version:"2.0.0"
                },
            }).then((AMap)=>{
                this.map = new AMap.Map("container",{
                    viewMode:'3D',
                    mapStyle: 'amap://styles/10a14cee9d42b1d2daceafc48f4ec7ff',
                    zoom:10,
                    zooms:[10,20],
                    showLabel: true,
                    center:[114.055394,22.654437],
                    //center:[113.96852466239307,22.587935758826667]
                });

                var trafficLayer = new AMap.TileLayer.Traffic();
                this.map.addLayer(trafficLayer);

                var infoWindow;
                function openInfo(map,pos) {
                    //构建信息窗体中显示的内容
                    var info = [];
                    //info.push("<div><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
                    info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>区域交通信息</b>");
                    info.push("小区个数：" + Math.floor(Math.random()*8) + "个");
                    info.push("在途车辆：" + Math.floor(Math.random()*100) + "辆");
                    info.push("平均速度：" + Math.floor(Math.random()*60) + "KM/H");
                    info.push("核酸检测点：" + Math.floor(Math.random()*10) + "个");
                    infoWindow = new AMap.InfoWindow({
                        content: info.join("<br/>"),  //使用默认信息窗体框样式，显示信息内容
                        //offset: new AMap.Pixel(65, 70),
                        anchor:'center'
                    });
                    infoWindow.open(map,pos);
                }
                this.map.on('click', function (e) {
                    openInfo(this, e.lnglat);
                    console.log(e.lnglat);
                    setTimeout(()=> {
                        infoWindow.close();;
                    },5000)
                });

                var loca = new Loca.Container({
                    map: this.map,
                });

                var geoDiv = new Loca.GeoJSONSource({
                    url: "line.json",
                });
                var pl = new Loca.LineLayer({
                    // loca,
                    zIndex: 120,
                    opacity: 0.8,
                    zooms: [13, 16]
                });
                pl.setSource(geoDiv, 
                {
                    color:'rgba(255,255,255,0.25)',
                    lineWidth: (index, prop) => {
                        return 3;
                    },
                    //dash: [10, 4, 10, 2],
                }
                );
                loca.add(pl);

                // 绿色呼吸点
                var scatter = new Loca.ScatterLayer({
                    zIndex: 111,
                    opacity: 1,
                    visible: true,
                    zooms: [11, 16],
                });
                var geo = new Loca.GeoJSONSource({
                    url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/sz_road.json',
                });
                scatter.setSource(geo);
                scatter.setStyle({
                    color: 'rgba(43,156,75,0.9)',
                    unit: 'meter',
                    size: [150, 150],
                    borderWidth: 0,
                });
                loca.add(scatter);

                // 红色呼吸点
                var geoLevelF = new Loca.GeoJSONSource({
                    // data: [],
                    url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/sz_road_F.json',
                });
                var breathRed = new Loca.ScatterLayer({
                    loca,
                    zIndex: 113,
                    opacity: 1,
                    visible: true,
                    zooms: [11, 16],
                });
                breathRed.setSource(geoLevelF);
                breathRed.setStyle({
                    unit: 'meter',
                    size: [2600, 2600],
                    borderWidth: 0,
                    texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/breath_red.png',
                    duration: 1000,
                    animate: true,
                });

                // 黄色呼吸点
                var geoLevelE = new Loca.GeoJSONSource({
                    // data: [],
                    url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/sz_road_E.json',
                });
                var breathYellow = new Loca.ScatterLayer({
                    loca,
                    zIndex: 112,
                    opacity: 1,
                    visible: true,
                    zooms: [11, 16],
                });
                breathYellow.setSource(geoLevelE);
                breathYellow.setStyle({
                    unit: 'meter',
                    size: [1000, 1000],
                    borderWidth: 0,
                    texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/breath_yellow.png',
                    duration: 1500,
                    animate: true,
                });

                var geoHeatMap = new Loca.GeoJSONSource({
                    url: 'GMAN_0hour.json',
                });

                var heatmap = new Loca.HeatMapLayer({
                    // loca,
                    zIndex: 10,
                    opacity: 1,
                    visible: true,
                    zooms: [10, 12.6],
                });

                heatmap.setSource(geoHeatMap, {
                    radius: 45,
                    unit: 'px',
                    gradient: {
                        0.5: 'blue',
                        0.65: 'rgb(117,211,248)',
                        0.7: 'rgb(0, 255, 0)',
                        0.9: '#ffea00',
                        1.0: 'red',
                    },
                    value: function (index, feature) {
                        return feature.properties.count;
                    },
                });

                loca.add(heatmap);

                mittBus.on("updateHeatMap",data => {
                    try{
                        loca.remove(heatmap);
                    }catch{
                        console.log(data);
                    }
                    var stationList = data;
                    //console.log(stationList);
                    geoHeatMap = new Loca.GeoJSONSource({
                        data: stationList
                    });

                    heatmap.setSource(geoHeatMap, {
                        radius: 45,
                        unit: 'px',
                        gradient: {
                            0.5: 'blue',
                            0.65: 'rgb(117,211,248)',
                            0.7: 'rgb(0, 255, 0)',
                            0.9: '#ffea00',
                            1.0: 'red',
                        },
                        value: function (index, feature) {
                            return feature.properties.count;
                        },
                    });

                    loca.add(heatmap);
                });

                mittBus.on("closeHeatMap",data => {
                    try{
                        loca.remove(heatmap);
                    }catch{
                        console.log(data);
                    }
                });


                loca.animate.start();
                
            //     // 以下为开场动画
            //     this.map.on('complete', function () {
            //         var speed = 0.5;

            //         // 下钻
            //         loca.viewControl.addAnimates([{
            //         pitch: {
            //             value: 0,
            //             control: [[0, 20], [1, 0]],
            //             timing: [0, 0, 0.8, 1],
            //             duration: 6000 / speed,
            //         },
            //         zoom: {
            //             value: 14,
            //             control: [[0, 12.8], [1, 15.9]],
            //             timing: [0, 0, 0.8, 1],
            //             duration: 6000 / speed,
            //         },
            //         rotation: {
            //             value: -30,
            //             control: [[0, 20], [1, -20]],
            //             timing: [0, 0, 0.8, 1],
            //             duration: 6000 / speed,
            //         },
            //         }], function () {
                    

            //         loca.viewControl.addAnimates([
            //             // 寻迹
            //             {
            //             center: {
            //                 value: [113.96852466239307,22.587935758826667],
            //                 control: [[113.96851,22.597935], [113.96852,22.587935]],
            //                 timing: [0.3, 0, 0.1, 1],
            //                 duration: 3000 / speed,
            //             },
            //             zoom: {
            //                 value: 18.5,
            //                 control: [[0.3, 15], [1, 17]],
            //                 timing: [0.3, 0, 0.7, 1],
            //                 duration: 4000 / speed,
            //             },
            //             pitch: {
            //                 value: 60,
            //                 control: [[0.3, 0], [1, 50]],
            //                 timing: [0.3, 0, 1, 1],
            //                 duration: 3000 / speed,
            //             },
            //             rotation: {
            //                 value: -90,
            //                 control: [[0, -20], [1, -80]],
            //                 timing: [0, 0, 1, 1],
            //                 duration: 5000 / speed,
            //             },
            //             }, {
            //             // 环绕
            //             pitch: {
            //                 value: 50,
            //                 control: [[0, 40], [1, 50]],
            //                 timing: [0.3, 0, 1, 1],
            //                 duration: 3000 / speed,
            //             },
            //             rotation: {
            //                 value: 260,
            //                 control: [[0, -80], [1, 260]],
            //                 timing: [0, 0, 0.7, 1],
            //                 duration: 4000 / speed,
            //             },
            //             zoom: {
            //                 value: 18,
            //                 control: [[0.3, 16], [1, 17]],
            //                 timing: [0.3, 0, 0.9, 1],
            //                 duration: 5000 / speed,
            //             },
            //             }, {
            //             // 拉起
            //             center: {
            //                 value: [114.095394,22.654437],
            //                 control: [[113.96852,22.587935], [114.03394,22.754437]],
            //                 timing: [0.5, 0.5, 0.5, 1],
            //                 duration: 3000 / speed,
            //             },
            //             pitch: {
            //                 value: 30,
            //                 control: [[0, 0], [1, 100]],
            //                 timing: [0.1, 0, 0.7, 1],
            //                 duration: 4000 / speed,
            //             },
            //             rotation: {
            //                 value: 360,
            //                 control: [[0, 260], [1, 361]],
            //                 timing: [0.3, 0, 0.7, 1],
            //                 duration: 4000 / speed,
            //             },
            //             zoom: {
            //                 value: 11.2,
            //                 control: [[0, 17.5], [1, 13.8]],
            //                 timing: [0.3, 0, 0.7, 1],
            //                 duration: 5000 / speed,
            //             },
            //             }], function () {
            //             //pl.hide(1000);
            //             //setTimeout(animate, 2000);
            //             console.log('结束');
            //         });
            //     });
            //     });
            // // //以上为开场动画
            
            }).catch(e=>{
                console.log(e);
            })
            
        },


    },
    mounted(){
        //DOM初始化完成进行地图初始化
        this.ininMap();
        
    }
}
</script>
<style scope>
    .home_div{
        height: 830px;
        width: 100%;
        padding: 0px;
        margin: 0px;
        position: relative;
    }
    #container{
        height: 830px;
        width: 100%;
        padding: 0px;
        margin: 0px;
    }
    h3{
        position:absolute;
        left: 10px;
        z-index: 2;
        color: white;
    }

</style>