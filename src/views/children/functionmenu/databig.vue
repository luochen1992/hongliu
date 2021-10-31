<template>
  <div class="databig" v-show="showBig">
    <div class="page_1">
      <div id="u8" class="ax_default box_1">
        <div id="u9" class="ax_default box_1">
          <div id="u9_text">
            <p>
              <span style="text-decoration: none"><img src="../../../assets/images/tongji/u51.png" />基础信息</span>
            </p>
          </div>
        </div>
        <P id="u10"><span style="text-decoration: none">可采储量：</span><img src="../../../assets/images/tongji/u26.svg" />5.26亿吨</P>
        <P id="u11"><span style="text-decoration: none">服务年限：</span><img src="../../../assets/images/tongji/u26.svg" />75.6年</P>
        <P id="u12"><span style="text-decoration: none">井田面积： 25.35km2</span></P>
        <P id="u122"><span style="text-decoration: none">投产时间： 2004</span></P>
        <P id="u121"><span style="text-decoration: none">服务年限： 2煤，3煤，5煤，7煤，9煤</span></P>
      </div>

      <div id="u17" class="ax_default box_1">
        <div id="u18" class="ax_default box_1">
          <div id="u18_text">
            <p>
              <span style="text-decoration: none"><img src="../../../assets/images/tongji/u50.png" />井下人员</span>
            </p>
          </div>
        </div>
        <div class="scontent person">
          <div class="leader"><span>带班领导：</span><span>徐伟</span></div>
          <div class="statics">
            <div>
              <img src="../../../assets/images/menu/panel/u41.svg" />
              <div class="text1">
                <p><span style="text-decoration: none">236人</span></p>
              </div>
              <div class="mtitle">
                <p><span style="text-decoration: none">井下总人数</span></p>
              </div>
            </div>
            <div>
              <img src="../../../assets/images/menu/panel/u42.svg" />
              <div class="text1">
                <p><span style="text-decoration: none">6人</span></p>
              </div>
              <div class="mtitle">
                <p><span style="text-decoration: none">井下异常人数</span></p>
              </div>
            </div>
            <div>
              <img src="../../../assets/images/menu/panel/u43.svg" />
              <div class="text1">
                <p><span style="text-decoration: none">4人</span></p>
              </div>
              <div class="mtitle">
                <p><span style="text-decoration: none">井下超时人数</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="u22" class="ax_default box_1">
        <div id="u23" class="ax_default box_1">
          <div id="u23_text">
            <p>
              <span style="text-decoration: none"><img src="../../../assets/images/tongji/u16.png" />涌水量曲线</span>
            </p>
          </div>
          <div id="myChart2_data" :style="{ width: '330px', height: '220px' }"></div>
        </div>

        <!-- <div  id="u24" class="ax_default box_1">
       <div id="u25" class="ax_default box_1">
         <img id="u25_img" class="img " src="../../../assets/images/tongji/u9.svg">
         <div id="u25_text">
          
         <p>
           <span style="text-decoration:none;"><img src="../../../assets/images/tongji/u52.png">隐患概况</span>
         </p>
         
         </div>
         <div id="u26"><img src="../../../assets/images/tongji/liuc.png"></div>
         <div style="    font-size: 10pt;width: 91px;margin-top: 63px;left: -8px;z-index: 1000;position: absolute;">待指派<br><span style="color:yellow;font-size:14px;">4</span></div>
         <div style="    font-size: 10pt;width: 91px;margin-top: 106px;left: 62px; z-index: 1000;position: absolute;">待确认<br><span style="color:yellow;font-size:14px;">2</span></div>
         <div style="    font-size: 10pt; width: 91px;margin-top: 63px;left: 131px;z-index: 1000;position: absolute;">待整改<br><span style="color:yellow;font-size:14px;">8</span></div>
         <div style="    font-size: 10pt;width: 91px;margin-top: 108px;left: 200px;z-index: 1000;position: absolute;">待验收<br><span style="color:yellow;font-size:14px;">2</span></div>
         <div id="u27">
             <span>本月隐患合计：601</span><br>
             <span>整改中隐患：  16</span><br>           
             <span>整改完成：    585</span> <br>         
             <span>整改率：      97.34%</span>         
         </div>
       </div>
      </div> -->
      </div>
    </div>
    <div class="page_2">
      <div id="u60" class="ax_default box_1">
        <div id="u60_text" class="text">
          <p><span style="text-decoration: none">煤矿资源量</span></p>
        </div>
      </div>

      <div id="myChart3_data" :style="{ width: '380px', height: '240px' }"></div>

      <!---ffffffffffffffffffffffff------->
      <!--<div id="u63" class="ax_default box_1">
        
        <div id="u63_text" class="text">
          <p><span style="text-decoration: none">煤矿掘进量</span></p>
        </div>
      </div>
      <div id="u801" class="ax_default _三级标题">
        <div id="u76_div" class=""></div>
        <div id="u76_text" class="text">
          <p><span style="text-decoration: none">日超欠</span></p>
        </div>
      </div>
      <div id="u802" class="ax_default _三级标题">
        <div id="u77_div" class=""></div>
        <div id="u77_text" class="text">
          <p><span style="text-decoration: none">月超欠</span></p>
        </div>
      </div>
      <div id="u803" class="ax_default _三级标题">
        <div id="u78_div" class=""></div>
        <div id="u78_text" class="text">
          <p><span style="text-decoration: none">年超欠</span></p>
        </div>
      </div>
      <div id="myChart4_data" :style="{ width: '120px', height: '120px' }"></div>
      <div id="myChart4_data2" :style="{ width: '120px', height: '120px' }"></div>
      <div id="myChart4_data3" :style="{ width: '120px', height: '120px' }"></div>
      <div id="u804" class="ax_default _三级标题">
        <p>
          <span style="text-decoration: none">日计划 10000吨</span> <span style="padding-left: 23px">月计划 28.0万吨</span> <span style="padding-left: 23px">年计划 300.0万吨</span><br /><span
            >日完成 9500吨
          </span>
          <span style="padding-left: 23px"> 月完成 11.2万吨 </span> <span style="padding-left: 23px"> 年完成 195.0万吨</span>
        </p>
        <br />
      </div> -->
      <div id="u63" class="ax_default box_1">
        <div id="u63_text" class="text">
          <p><span style="text-decoration: none">工作面基础信息</span></p>
        </div>
      </div>
      <div>
        <table class="tb1">
          <tr>
            <td>工作面名称</td>
            <td>工作面状态</td>
            <td>开始时间</td>
            <td>结束时间</td>
          </tr>
          <tr>
            <td>130606</td>
            <td><img src="../../../assets/images/tongji/u136.svg" /></td>
            <td>2021-06-15</td>
            <td>2021-12-21</td>
          </tr>
          <tr>
            <td>120507</td>
            <td><img src="../../../assets/images/tongji/u137.svg" /></td>
            <td>2021-08-11</td>
            <td>2022-04-13</td>
          </tr>
          <tr>
            <td>130804</td>
            <td><img src="../../../assets/images/tongji/u138.svg" /></td>
            <td>2022-05-13</td>
            <td>2022-11-11</td>
          </tr>
          <tr>
            <td>120912</td>
            <td><img src="../../../assets/images/tongji/u138.svg" /></td>
            <td>2022-11-17</td>
            <td>2023-09-15</td>
          </tr>
        </table>
      </div>
      <div id="u63" class="ax_default box_1">
        <div id="u63_text" class="text">
          <p><span style="text-decoration: none">电耗统计</span></p>
        </div>
      </div>
      <div style="width: 123px; float: left; text-align: center; border: 1px solid #00fffffe; height: 237px">
        <span class="sss">今日电耗</span>
        <div><img src="../../../assets/images/tongji/haodian.png" /></div>
        <div>
          用电总量 <span style="color: yellow">22749kw.h</span><br />
          电力成本<span style="color: yellow">11374元</span><br />
          吨煤电耗<span style="color: yellow">2.08kwh/吨</span>
        </div>
      </div>
      <div style="width: 123px; float: left; text-align: center; border: 1px solid #00fffffe; height: 237px">
        <span class="sss">本月电耗</span>
        <div><img src="../../../assets/images/tongji/haodian.png" /></div>
        <div>
          用电总量 <span style="color: yellow">338178kw.h</span><br />
          电力成本<span style="color: yellow">169089元</span><br />
          吨煤电耗<span style="color: yellow">2.02kwh/吨</span>
        </div>
      </div>
      <div style="width: 122px; float: left; text-align: center; border: 1px solid #00fffffe; height: 237px">
        <span class="sss">年度电耗</span>
        <div><img src="../../../assets/images/tongji/haodian.png" /></div>
        <div>
          用电总量 <span style="color: yellow">4538178kw.h</span><br />
          电力成本<span style="color: yellow">2009089元</span><br />
          吨煤电耗<span style="color: yellow">1.98kwh/吨</span>
        </div>
      </div>
      <!-- <div id="u63" class="ax_default box_1">
        <img id="u63_img" class="img " style="margin-left: 100px;margin-top: 6px;" src="../../../assets/images/tongji/u171.png">
        <div id="u63_text" class="text ">
          <p><span style="text-decoration:none;">效率曲线</span></p>
        </div>
      </div>
      <div id="myChart4_data4" :style="{width: '330px', height: '220px'}"></div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
var echarts = require('echarts')
export default {
  name: 'databig',
  computed: {
    ...mapGetters(['getOneMenuName'])
  },
  data() {
    return {
      showBig: false,
      driftfootage: [],
      isshow_: false
    }
  },
  mounted() {
    this.getEnergystatic('data/能耗统计.json')
  },
  watch: {
    getOneMenuName(newV, oldV) {
      if (newV === 'databig') {
        // this.setNowMenuName('')
        this.show()
        this.isshow_ = true
      } else {
        if (this.isshow_) {
          this.hide()
          this.isshow_ = false
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      setNowMenuName: 'setNowMenuName'
    }),
    // 显示
    show() {
      var _this = this
      _this.showBig = true
      _this.succCallback()
    },
    // 隐藏
    hide() {
      window.layui.layer.close(this.coalflowleft)
      window.layui.layer.close(this.coalflowright)
      this.coalflowleft = null
      this.coalflowright = null
      this.showBig = false
    },
    getEnergystatic(url) {
      var tt = this
      $.get(url, {}, function (res) {
        if (res.result) {
          tt.driftfootage = res.result
          let dataArray = tt.getDataFromResult(tt.driftfootage, 'name', 'power')
          let legend = dataArray.legend
          let xAxisData = dataArray.xAxisData
          let yAxisData = dataArray.yAxisData

          let myEchart = echarts.init(document.getElementById('myChart3_data'))

          let option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: legend,
              textStyle: {
                fontWeight: 'normal',
                fontSize: 13,
                color: '#fff'
              },
              top: 10,
              left: 0,
              itemGap: 5,
              itemWidth: 20
            },
            grid: {
              left: '3%',
              right: '4%',
              top: '20%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: xAxisData,
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: '#fff' //这里用参数代替了
                  }
                },
                splitLine: {
                  show: false
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                splitLine: {
                  show: false
                },
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: '#fff' //这里用参数代替了
                  }
                }
              }
            ],
            series: [
              {
                name: legend[0],
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                  focus: 'series'
                },
                data: yAxisData[legend[0]]
              },
              {
                name: legend[1],
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                  focus: 'series'
                },
                data: yAxisData[legend[1]]
              },
              {
                name: legend[2],
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                  focus: 'series'
                },
                data: yAxisData[legend[2]]
              },
              {
                name: legend[3],
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                  focus: 'series'
                },
                data: yAxisData[legend[3]]
              }
            ]
          }
          myEchart.setOption(option)
        }
      })
    },
    getDataFromResult(dataArray, field1, field2) {
      let tarObj = {
        legend: [],
        xAxisData: [],
        yAxisData: []
      }
      let length = dataArray.length
      for (let i = 0; i < length; i++) {
        const element = dataArray[i]
        tarObj.legend.push(element[field1])
        tarObj.yAxisData[element[field1]] = []
        for (const key in element[field2]) {
          tarObj.xAxisData.push(key)
          tarObj.yAxisData[element[field1]].push(element[field2][key])
        }
      }
      tarObj.xAxisData = this.getAsyncArray(tarObj.xAxisData)
      return tarObj
    },
    getAsyncArray(tempArray) {
      var arr = [] //定义一个临时数组
      for (var i = 0; i < tempArray.length; i++) {
        //循环遍历当前数组
        //判断当前数组下标为i的元素是否已经保存到临时数组
        //如果已保存，则跳过，否则将此元素保存到临时数组中
        if (arr.indexOf(tempArray[i]) == -1) {
          arr.push(tempArray[i])
        }
      }
      return arr
    },
    succCallback() {
      const myChart2 = echarts.init(document.getElementById('myChart2_data'))
      myChart2.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          left: 50,
          top: 70,
          right: 10,
          bottom: 50
        },

        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45'],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#ffffff'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} W',
            textStyle: {
              color: '#ffffff'
            }
          },
          axisPointer: {
            snap: true
          }
        },
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [
            {
              lte: 6,
              color: 'green'
            },
            {
              gt: 6,
              lte: 8,
              color: 'red'
            },
            {
              gt: 8,
              lte: 14,
              color: 'green'
            },
            {
              gt: 14,
              lte: 17,
              color: 'red'
            },
            {
              gt: 17,
              color: 'green'
            }
          ]
        },
        series: [
          {
            name: '涌水量',
            type: 'line',
            smooth: true,
            data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
            markArea: {
              itemStyle: {
                color: 'rgba(255, 173, 177, 0.4)'
              },
              data: [
                [
                  {
                    name: '早高峰',
                    xAxis: '07:30'
                  },
                  {
                    xAxis: '10:00'
                  }
                ],
                [
                  {
                    name: '晚高峰',
                    xAxis: '17:30'
                  },
                  {
                    xAxis: '21:15'
                  }
                ]
              ]
            }
          }
        ]
      })
    }
  }
}
</script>

<style  lang="scss">
.databig {
  width: 100%;
  height: 100%;
  color: #fff;
}
#myChart2_data {
  position: absolute;
  margin-left: 18px;
}

#myChart4_data,
#myChart4_data2,
#myChart4_data3 {
  float: left;
}

#u8 {
  border-width: 0px;
  position: relative;
  left: 0px;
  top: 0px;
  width: 380px;
  height: 270px;
  border-bottom: 1px solid #009bff;
  box-shadow: 0 0 5px 0 rgb(0 255 255 / 60%);
  display: flex;
  opacity: 0.8;
  text-align: left;
}
.ax_default {
  font-family: 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  font-size: 13px;
  letter-spacing: normal;
  color: #ffffff;
  vertical-align: none;
  text-align: center;
  line-height: normal;
  text-transform: none;
}
#u8_img {
  border-width: 0px;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 380px;
  height: 190px;
}
#u8 .text {
  position: absolute;
  align-self: center;
  padding: 2px 2px 2px 2px;
  box-sizing: border-box;
  width: 100%;
}
#u8_text {
  border-width: 0px;
  word-wrap: break-word;
  text-transform: none;
  visibility: hidden;
}

#u9 {
  border-width: 0px;
  position: relative;
  left: 0px;
  top: 0px;
  width: 380px;
  height: 30px;
  border-bottom: 1px solid #009bff;
  box-shadow: 0 0 5px 0 rgb(0 255 255 / 60%);
  display: flex;
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  color: #ffffff;
}
#u9_img {
  border-width: 0px;
  position: absolute;
  left: 0px;
  width: 380px;
  height: 30px;
  top: 0px;
}
#u9 .text {
  position: absolute;
  align-self: center;
  padding: 2px 2px 2px 2px;
  box-sizing: border-box;
  width: 100%;
}
#u9_text {
  border-width: 0px;
  word-wrap: break-word;
  text-transform: none;
  top: 0px;
  text-align: center;
  height: 30px;
  width: 100%;
}
#u10 {
  border-width: 0px;
  white-space: nowrap;
  text-transform: none;
  border-width: 0px;
  position: absolute;
  left: 17px;
  top: 50px;
  width: 90px;
  height: 21px;
  display: flex;
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  color: rgba(255, 255, 255);
  border-width: 0px;
  font-size: 17px;
}
#u11 {
  border-width: 0px;
  white-space: nowrap;
  text-transform: none;
  border-width: 0px;
  position: absolute;
  left: 17px;
  top: 90px;
  width: 90px;
  height: 21px;
  display: flex;
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  color: rgba(255, 255, 255);
  border-width: 0px;
  font-size: 17px;
}
#u12 {
  border-width: 0px;
  white-space: nowrap;
  text-transform: none;
  border-width: 0px;
  position: absolute;
  left: 17px;
  top: 130px;
  width: 90px;
  height: 21px;
  display: flex;
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  color: rgba(255, 255, 255);
  border-width: 0px;
  font-size: 17px;
}
.statics {
  height: 260px;
  width: 100%;
  display: flex;
  align-items: center;
}
#u121 {
  border-width: 0px;
  white-space: nowrap;
  text-transform: none;
  border-width: 0px;
  position: absolute;
  left: 17px;
  top: 202px;
  width: 90px;
  height: 21px;
  display: flex;
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  color: rgba(255, 255, 255);
  border-width: 0px;
  font-size: 17px;
}
#u122 {
  border-width: 0px;
  white-space: nowrap;
  text-transform: none;
  border-width: 0px;
  position: absolute;
  left: 17px;
  top: 166px;
  width: 90px;
  height: 21px;
  display: flex;
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  color: rgba(255, 255, 255);
  border-width: 0px;
  font-size: 17px;
}
#u13 {
  border-width: 0px;
  position: relative;
  left: 0px;
  top: 0px;
  width: 380px;
  height: 190px;
  display: flex;
  opacity: 0.8;
  text-align: left;
}

#u13_img {
  border-width: 0px;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 380px;
  height: 190px;
}
#u13 .text {
  position: absolute;
  align-self: center;
  padding: 2px 2px 2px 2px;
  box-sizing: border-box;
  width: 100%;
}
#u13_text {
  border-width: 0px;
  word-wrap: break-word;
  text-transform: none;
  visibility: hidden;
}

#u14 {
  border-width: 0px;
  position: relative;
  left: 0px;
  top: 0px;
  width: 380px;
  height: 30px;
  display: flex;
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  color: rgba(0, 255, 255, 0.996078431372549);
}
#u14_img {
  border-width: 0px;
  position: absolute;
  left: 0px;
  width: 380px;
  height: 30px;
  top: 0px;
}
#u14 .text {
  position: absolute;
  align-self: center;
  padding: 2px 2px 2px 2px;
  box-sizing: border-box;
  width: 100%;
}
#u14_text {
  border-width: 0px;
  word-wrap: break-word;
  text-transform: none;
  top: 0px;
  left: 100px;
  position: absolute;
}
#u15 {
  border-width: 0px;
  white-space: nowrap;
  text-transform: none;
  border-width: 0px;
  position: absolute;
  left: 17px;
  top: 60px;
  width: 90px;
  height: 21px;
  display: flex;
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  color: rgba(255, 255, 255);
  border-width: 0px;
  font-size: 17px;
}
#u16 {
  border-width: 0px;
  white-space: nowrap;
  text-transform: none;
  border-width: 0px;
  position: absolute;
  left: 17px;
  top: 110px;
  width: 90px;
  height: 21px;
  display: flex;
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  color: rgba(255, 255, 255);
  border-width: 0px;
  font-size: 17px;
}
#u17 {
  border-width: 0px;
  position: relative;
  left: 0px;
  top: 0px;
  width: 380px;
  height: 270px;
  display: flex;
  border-bottom: 1px solid #009bff;
  -webkit-box-shadow: 0 0 5px 0 rgb(0 255 255 / 60%);
  box-shadow: 0 0 5px 0 rgb(0 255 255 / 60%);
  opacity: 0.8;
  text-align: left;
}

#u17_img {
  border-width: 0px;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 380px;
  height: 190px;
}

#u18 {
  position: absolute;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  height: 30px;
  line-height: 30px;
  width: 100%;
  font-size: 18px;
  border-bottom: 1px solid #009bff;
  -webkit-box-shadow: 0 0 5px 0 rgb(0 255 255 / 60%);
  box-shadow: 0 0 5px 0 rgb(0 255 255 / 60%);
  font-weight: normal;
}
.text1 {
  text-align: center;
  margin-top: -59px;
  height: 30px;
}
.statics > div {
  width: 33.33%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
#u18_img {
  border-width: 0px;
  position: absolute;
  left: 0px;
  width: 380px;
  height: 30px;
  top: 0px;
}
#u18 .text {
  position: absolute;
  align-self: center;
  padding: 2px 2px 2px 2px;
  box-sizing: border-box;
  width: 100%;
}
#u18_text {
  border-width: 0px;
  word-wrap: break-word;
  text-transform: none;
  top: 0px;
  width: 100%;
  text-align: center;
}
#u60_text,
#u63_text {
  border-width: 0px;
  word-wrap: break-word;
  text-transform: none;
  top: 0px;
  width: 100%;
  text-align: center;
}
#u19 {
  border-width: 0px;
  position: relative;
  right: 200px;
  top: 50px;
  width: 100px;
  height: 95px;
  display: flex;
  opacity: 0.9;
  font-size: 24px;
  color: #ffffff;
}
.leader {
  position: absolute;
  height: 40px;
  width: 100%;
  line-height: 40px;
  padding: 0 10px;
  /* margin-top: 30px; */
  font-size: 18px;
}
#u19_img {
  border-width: 0px;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100px;
  height: 95px;
}
#u19 .text {
  position: absolute;
  align-self: center;
  padding: 2px 2px 2px 2px;
  box-sizing: border-box;
  width: 130%;
}
#u19_text {
  border-width: 0px;
  word-wrap: break-word;
  text-transform: none;
  left: 10px;
  top: 30px;
  position: absolute;
}
#u20 {
  border-width: 0px;
  position: relative;
  right: 170px;
  top: 50px;
  width: 100px;
  height: 95px;
  display: flex;
  opacity: 0.9;
  font-size: 24px;
  color: #ffffff;
}
#u20_img {
  border-width: 0px;
  position: absolute;
  left: 40px;
  top: 0px;
  width: 100px;
  height: 95px;
}
#u20 .text {
  position: absolute;
  align-self: center;
  padding: 2px 2px 2px 2px;
  box-sizing: border-box;
  width: 100%;
}
#u20_text {
  border-width: 0px;
  word-wrap: break-word;
  text-transform: none;
  left: 60px;
  top: 30px;
  position: absolute;
}
#u21 {
  border-width: 0px;
  position: relative;
  right: 120px;
  top: 50px;
  width: 100px;
  height: 95px;
  display: flex;
  opacity: 0.9;
  font-size: 24px;
  color: #ffffff;
}
#u27 {
  color: #ffffff;
  margin-top: 50px;
  margin-left: 256px;
  font-size: 12px;
}
#u21_img {
  border-width: 0px;
  position: absolute;
  left: 60px;
  top: 0px;
  width: 100px;
  height: 95px;
}
#u21 .text {
  position: absolute;
  align-self: center;
  padding: 2px 2px 2px 2px;
  box-sizing: border-box;
  width: 100%;
}
#u21_text {
  border-width: 0px;
  word-wrap: break-word;
  text-transform: none;
  left: 80px;
  top: 30px;
  position: absolute;
}
.statics .mtitle {
  margin-top: 50px;
  height: 40px;
  font-weight: bold;
  font-size: 16px;
}
#main_minefooter {
  width: 336px;
  height: 240px;
}
#u22 {
  border-width: 0px;
  position: relative;
  left: 0px;
  top: 0px;
  width: 380px;
  height: 270px;
  display: flex;
  border-bottom: 1px solid #009bff;
  -webkit-box-shadow: 0 0 5px 0 rgb(0 255 255 / 60%);
  box-shadow: 0 0 5px 0 rgb(0 255 255 / 60%);
  display: flex;
  opacity: 0.8;
  text-align: left;
}

#u22_img {
  border-width: 0px;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 380px;
  height: 190px;
}
#u22 .text {
  position: absolute;
  align-self: center;
  padding: 2px 2px 2px 2px;
  box-sizing: border-box;
  width: 100%;
}
#u22_text {
  border-width: 0px;
  word-wrap: break-word;
  text-transform: none;
  visibility: hidden;
}

#u23 {
  border-width: 0px;
  position: relative;
  left: 0px;
  top: 0px;
  width: 380px;
  height: 30px;
  display: flex;
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  font-size: 17px;
  border-bottom: 1px solid #009bff;
  -webkit-box-shadow: 0 0 5px 0 rgb(0 255 255 / 60%);
  box-shadow: 0 0 5px 0 rgb(0 255 255 / 60%);
  color: #fff;
}
#u23_img {
  border-width: 0px;
  position: absolute;
  left: 0px;
  width: 380px;
  height: 30px;
  top: 0px;
}
#u23 .text {
  position: absolute;
  align-self: center;
  padding: 2px 2px 2px 2px;
  box-sizing: border-box;
  width: 100%;
}
#u23_text {
  border-width: 0px;
  word-wrap: break-word;
  text-transform: none;
  top: 0px;
  left: 100px;
  position: absolute;
  width: 160px;
}
.scontent {
  display: flex;
  margin-top: 30px;
  width: 100%;
  height: 240px;
  border-bottom: 1px solid #009bff;
  box-shadow: 0 0 5px 0 rgb(0 255 255 / 60%);
}
#u24 {
  border-width: 0px;
  position: relative;
  left: 0px;
  top: 190px;
  width: 380px;
  height: 190px;
  display: flex;
  opacity: 0.8;
  text-align: left;
}

#u24_img {
  border-width: 0px;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 380px;
  height: 190px;
}
#u24 .text {
  position: absolute;
  align-self: center;
  padding: 2px 2px 2px 2px;
  box-sizing: border-box;
  width: 100%;
}
#u24_text {
  border-width: 0px;
  word-wrap: break-word;
  text-transform: none;
  visibility: hidden;
}

#u25 {
  border-width: 0px;
  position: relative;
  left: 0px;
  top: 0px;
  width: 380px;
  height: 30px;
  display: flex;
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  font-size: 17px;
  color: rgba(0, 255, 255, 0.996078431372549);
}
#u25_img {
  border-width: 0px;
  position: absolute;
  left: 0px;
  width: 380px;
  height: 30px;
  top: 0px;
}
#u25 .text {
  position: absolute;
  align-self: center;
  padding: 2px 2px 2px 2px;
  box-sizing: border-box;
  width: 100%;
}
#u25_text {
  border-width: 0px;
  word-wrap: break-word;
  text-transform: none;
  top: 0px;
  left: 100px;
  position: absolute;
}
#u26 {
  width: 280px;
  height: 160px;
  position: absolute;
  left: 0px;
  top: 48px;
}
#u26 img {
  width: 260px;
}

.page_1 {
  overflow-y: auto;
  overflow-x: hidden;
  top: 105px;
  left: 6px;
  position: absolute;
  width: 380px;
  border-bottom: 1px solid #009bff;
  box-shadow: 0 0 5px 0 rgb(0 255 255 / 60%);
  z-index: 2001;
  background: rgba(7, 28, 90, 0.5);
  border: 2px solid #105162;
  height: 810px;
}
.page_2 {
  top: 105px;
  left: calc(100% - 430px);
  position: absolute;
  width: 380px;
  z-index: 2001;
  background: rgba(7, 28, 90, 0.5);
  overflow-y: auto;
  overflow-x: hidden;
  border: 2px solid #105162;
  height: 810px;
}
#u44 {
  border-width: 0px;
  position: absolute;
  left: 14px;
  top: 532px;
  width: 100%;
  height: 21px;
  display: flex;
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  color: rgba(255, 255, 255, 0.996078431372549);
}
#u44_div {
  border-width: 0px;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 90px;
  height: 21px;
  background: inherit;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  border-radius: 0px;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  color: rgba(255, 255, 255, 0.996078431372549);
}
#u44 .text {
  position: absolute;
  align-self: center;
  padding: 0px 0px 0px 0px;
  box-sizing: border-box;
  width: 100%;
}
#u60 {
  width: 380px;
  border-bottom: 1px solid #009bff;
  -webkit-box-shadow: 0 0 5px 0 rgb(0 255 255 / 60%);
  box-shadow: 0 0 5px 0 rgb(0 255 255 / 60%);
  height: 30px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  color: #ffffff;
}
#u63 {
  width: 380px;
  border: 1px solid #009bff;
  -webkit-box-shadow: 0 0 5px 0 rgb(0 255 255 / 60%);
  box-shadow: 0 0 5px 0 rgb(0 255 255 / 60%);
  height: 30px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  color: #ffffff;
}
#u76,
#u801 {
  border-width: 0px;
  margin: 0px 30px;
  width: 54px;
  height: 40px;
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  color: #ffffff;
  font-size: 18px;
  position: relative;
}
#u76_div {
  border-width: 0px;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 54px;
  height: 21px;
  background: inherit;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  border-radius: 0px;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  color: #ffffff;
}
#u76 .text {
  position: absolute;
  align-self: flex-start;
  padding: 0px 0px 0px 0px;
  box-sizing: border-box;
  width: 100%;
}
#u76_text {
  border-width: 0px;
  white-space: nowrap;
  text-transform: none;
}
#u77 {
  font-size: 18px;
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  color: #ffffff;
  font-size: 18px;
  top: 32px;
  left: 147px;
  position: absolute;
}
#u78 {
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  color: #ffffff;
  position: absolute;
  top: 33px;
  left: 273px;
  font-size: 18px;
}
#u802 {
  font-size: 18px;
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  color: #ffffff;
  font-size: 18px;
  top: 210px;
  left: 147px;
  position: absolute;
}
#u803 {
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  color: #ffffff;
  position: absolute;
  top: 210px;
  left: 273px;
  font-size: 18px;
}
#u80 {
  position: absolute;
  top: 130px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-family: 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: #ffffff;
}

#u804 {
  position: absolute;
  top: 300px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-family: 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: #ffffff;
}
.page_1::-webkit-scrollbar-track-piece {
  background-color: #2b61a888;
}
.page_1::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.page_1::-webkit-scrollbar-thumb {
  background-color: #022847;
  background-clip: padding-box;
  min-height: 28px;
}
.page_1::-webkit-scrollbar-thumb:hover {
  background-color: #2196f3;
}
.page_2::-webkit-scrollbar-track-piece {
  background-color: #2b61a888;
}
.page_2::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.page_2::-webkit-scrollbar-thumb {
  background-color: #022847;
  background-clip: padding-box;
  min-height: 28px;
}
.page_2::-webkit-scrollbar-thumb:hover {
  background-color: #2196f3;
}
.sss {
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  color: #ffffff;
  font-size: 18px;
}

.databig table {
  width: 100%;
  height: 241px;
}
.databig table.tb1 td {
  border: solid 1px #73897e;
  text-align: center;
}
</style>
