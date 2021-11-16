<template>
  <div class="coalflow"></div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'coalflow',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      isshow: false,
      handler: null
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'coalflow') {
        this.show()
        this.isshow = true
      } else {
        if (this.isshow) {
          this.hide()
          this.isshow = false
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
      _this.addCoalFlow('data/巷道属性.json')
    },
    // 隐藏
    hide() {
      debugger
      if (window.cesiumvariate._coaldataSource) {
        window.cesiumvariate._coaldataSource.remove();
        window.cesiumvariate._coaldataSource = null
      }   
    },

    addCoalFlow(url) {
      var _this = this;
      var positions=[];
      var widthList=[];
      positions.push([
    
        112.6802575	,	35.6627623	,	-387.6648	,
        112.6806189	,35.6638373	,-386.6339	,
        112.6809711	,35.6648855	,	-385.6275	,
        112.6811747	,35.6654905	,-385.0455	,
        112.6816216	,35.6668195	,-383.7648	,
        112.6821186	,35.6682979	,-382.3361	,
        112.6825527	,35.6695889	,-381.0840	,
        112.6829013	,35.6706255	,-380.0749	,
        112.6835583	,35.6725791	,-378.1708	,
        112.6840274	,35.6739739	,-376.8085	,
        112.6844760	,35.6753074	,-375.4906,
        112.6848909	,35.6765410	,-374.2833	,
        112.6851170	,35.6772136	,-373.6206	,
        112.6862920	,35.6807077	,-370.1600	,
        112.6864282	,35.6811128	,-369.7564	,
        112.6864518	,35.6811825	,-369.7838	,
        112.6866418	,35.6817525	,-370.8121	,
        112.6866667	,35.6818233	,-370.8586	,
        112.6868244	,35.6822844	,-370.6450	,
        112.6868353	,35.6823159	,-370.6330	,
        112.6868792	,35.6823101	,-370.5416	,
        112.6874459	,35.6821856	,-369.3709	,
        112.6874917	,35.6821761	,-369.4797	,
        112.6875296	,35.6821667	,-369.6164,
        112.6880197	,35.6820562	,-373.5285	,
        112.6881053	,35.6820364	,-374.1383	,
        112.6882923	,35.6819921	,-375.3036	,
        112.6883768	,35.6819725	,-375.9744	,
        112.6886876	,35.6819032	,-378.9664	,
        112.6887736	,35.6818839	,-379.5909	,
        112.6892515	,35.6817776	,-381.9311,
        112.6893373	,35.6817587	,-382.2917	,
        112.6898052	,35.6816577	,-383.9352	,
        112.6898911	,35.6816382	,-384.1934	,
        112.6900922	,35.6815920	,-384.6915	,
        112.6901777	,35.6815728	,-384.9011	,
        112.6905367	,35.6814946	,-385.7822	,
        112.6905586	,35.6814902	,-385.7936	,
        112.6906227	,35.6814757	,-385.9171	,
        112.6908354	,35.6814295	,-386.0596	,
        112.6908807	,35.6814195	,-386.1407	,
        112.6909206	,35.6814107	,-386.2103

        ,112.6919072	,35.6811928	,-389.0550	
        ,112.6919930	,35.6811730	,-389.2156	
        ,112.6922455	,35.6811177	,-389.4332	
        ,112.6922671	,35.6811129	,-389.4339	
        ,112.6923311	,35.6810982	,-389.5037	
        ,112.6924869	,35.6810637	,-389.6355	
        ,112.6925086	,35.6810585	,-389.5605	
        ,112.6925729	,35.6810446	,-389.7049
        ,112.6927669	,35.6810013	,	-389.8521	
        ,112.6928525	,35.6809825	,-389.8769	
        ,112.6931564	,35.6809152	,-389.8306	
        ,112.6932417	,35.6808961	,-389.7842	
        ,112.6940466	,35.6807147	,-389.0425	
        ,112.6941329	,35.6806954	,-388.8830
        ,112.6958372	,35.6803081	,-384.1910	
        ,112.6959232	,35.6802903	,-384.0487	
        ,112.6962477	,35.6802159	,-383.8622	
        ,112.6963344	,35.6801973	,-383.6069	
        ,112.6977430	,35.6798809	,-376.0859	
        ,112.6978291	,35.6798621	,-375.6325	
        ,	112.6984716	,35.6797213	,-372.2967	
        ,112.6985580	,35.6797027	,-371.5962	
        ,112.6996035	,35.6794745	,	-360.0324	
        ,112.6996886	,35.6794560	,-359.1051	
        ,112.7007030	,35.6792350	,-348.1859
        ,112.7007874	,35.6792165	,-347.4897	
        ,112.7008425	,35.6792047	,-347.1734	
        ,112.7009282	,35.6791862	,-346.6848	
        ,112.7011079	,35.6791476	,-345.6573	
        ,112.7011934	,35.6791292	,-345.1703	
        ,112.7013608	,35.6790930	,-344.2229	
        ,112.7014462	,35.6790745	,-343.7389	
        ,112.7018637	,35.6789840	,-341.3718	
        ,112.7019496	,35.6789659	,-340.8869	
        ,112.7023160	,35.6788866	,-338.8112	
        ,112.7024019	,35.6788684	,-338.3241	
        ,112.7025581	,35.6788345	,-337.4395	
        ,112.7026434	,35.6788163	,-337.0793	
        ,112.7028538	,35.6787697	,-336.4972	
        ,112.7029395	,35.6787506	,-336.2392	
        ,112.7031335	,35.6787090	,-335.6118	
        ,112.7032187	,35.6786905	,-335.4643
        ,112.7042476 ,35.6784686 ,-335.2459 
        ,112.7043342 ,35.6784496 ,-334.9937 
        ,112.7076283 ,35.6777335 ,-316.2433 
        ,112.7077138 ,35.6777147 ,-315.7332 
        ,112.7095347 ,35.6773246 ,-304.4120
        ,112.7115168 ,35.6769006 ,-292.0838 
        ,112.7116017 ,35.6768817 ,-291.6829 
        ,112.7125116 ,35.6766832 ,-288.7585 
        ,112.7135418 ,35.6764610 ,-285.4485 
        ,112.7136271 ,35.6764399 ,-285.0430 
        ,112.7139864 ,35.6763623 ,-282.8000
        ,112.7140334	,35.6763521	,-282.7603	
        ,112.7140414	,35.6763873	,-282.5242	
        ,112.7141019	,35.6765357	,	-282.4619	
        ,112.7141115	,35.6765672	,-279.3089	
        ,112.7141388	,35.6765626	,-278.5289
        ,112.7141799	,35.6765507	,	-278.5267	
        ,112.7142071	,35.6765360	,-278.3999	
        ,112.7142387	,35.6765074	,-278.0280	
        ,112.7142690	,35.6764768	,-278.1172	
        ,112.7142619	,35.6764267	,-274.6839	
        ,112.7142436	,35.6763430	,-268.9145	
        ,112.7142501	,35.6763154	,-267.5863	
        ,112.7142659	,35.6763054	,-267.2072	
        ,112.7142686	,35.6763050	,-266.5220	
        ,112.7143073	,35.6762969	,-266.5210	
        ,112.7143714	,35.6762817	,-266.4396	
        ,112.7146320	,35.6762225	,-265.7884	
        ,112.7146586	,35.6762167	,-265.7097	
        ,112.7146642	,35.6762154	,-265.7094	
        ,112.7147296	,35.6762009	,-265.3905
        ,112.7156151 ,35.6760071 ,-256.8235 
        ,112.7168019 ,35.6757471 ,-245.3379 
        ,112.7168678 ,35.6757331 ,-244.0906 
        ,112.7188151 ,35.6753091 ,-188.2048 
        ,112.7243173 ,35.6741101 ,-30.2601 
        ,112.7257909 ,35.6737897 ,12.0439
      ]);
      widthList.push(12);
      
      
      

      window.cesiumvariate._coaldataSource = new CTMap.workPolygonEffects(viewer);
   
      for(var i=0;i<positions.length;i++)
      {
        window.cesiumvariate._coaldataSource.addTrailLine("ss","img/trailline.png",positions[i],widthList[i],6000);
      }
    },
    

  }
}
</script>

<style  lang="scss">
.db_dialog {
  background: url('../../assets/images/boder.png') no-repeat center top;
}
.db_dialog .layui-layer-content {
  background: rgba(0, 0, 0, 0.3);
}
.db_dialog2 {
  background: url('../../assets/images/boder2.png') no-repeat center top;
}
.db_dialog2 .layui-layer-content {
  background: rgba(0, 0, 0, 0.3);
}
.coalflow {
  width: 100%;
  height: 100%;
  color: #fff;
}
#myChart,
#myChart2,
#myChart4 {
  margin: 0px 62px;
}
#myChart3 {
  margin: 25px 12px 0 60px;
}
.progress {
  padding: 2px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  border: 1px solid #61aacd;
  /* -webkit-box-shadow: inset 0 1px 2px rgba(11, 18, 247, 0.3), 0 1px rgba(255, 255, 255, 0.08); */
  /* box-shadow: inset 0 1px 2px rgba(16, 65, 244, 0.53), 0 1px #3F51B5; */
}
.jdsty {
  width: 34%;
}

.lxSty {
  list-style: none;
  height: 100%;
  margin-top: 5px;
  margin-left: 0px;
}

.lxSty li {
  height: 10%;
  margin-top: 0px;
  margin-left: 9px;
}

.jq {
  float: left;
  color: #fff;
  padding-left: 12px;
  font-weight: 800;
  letter-spacing: 2px;
  font-size: 15px;
  width: 25%;
}

.float1 {
  float: left;
}

.pu {
  color: #14d0e8;
  float: right;
  position: absolute;
  right: 34px;
  font-size: 0.8vw;
}
.progress-bar {
  position: relative;
  height: 16px;
  border-radius: 16px;
  -webkit-transition: 0.4s linear;
  -moz-transition: 0.4s linear;
  -o-transition: 0.4s linear;
  transition: 0.4s linear;
  -webkit-transition-property: width, background-color;
  -moz-transition-property: width, background-color;
  -o-transition-property: width, background-color;
  transition-property: width, background-color;
  -webkit-box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25), inset 0 1px rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25), inset 0 1px rgba(255, 255, 255, 0.1);
}

.progress-bar:before,
.progress-bar:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.progress-bar:before {
  bottom: 0;
  /*   background: url("../img/stripes.png") 0 0 repeat; */
  border-radius: 4px 4px 0 0;
}

.progress-bar:after {
  z-index: 2;
  bottom: 45%;
  border-radius: 4px;
  background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  background-image: -moz-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  background-image: -o-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
}
.imgcolor {
  background-image: linear-gradient(to bottom, #07ddf8 0, #75e0ee 100%) !important;
}
#five ~ .progress > .progress-bar {
  width: 15%;
  background-color: #fa2e00;
  background-image: linear-gradient(#fa2e00, #fa2e00) !important;
  height: 74%;
  top: 13%;
}

#twentyfive ~ .progress > .progress-bar {
  width: 20%;
  background-color: #21d3dd;
  background-image: linear-gradient(#f78a3d, #f78a3d) !important;
  height: 74%;
  top: 13%;
}

#fifty ~ .progress > .progress-bar {
  width: 25%;
  background-color: #21d3dd;
  background-image: linear-gradient(#daf73d, #daf73d) !important;
  height: 74%;
  top: 13%;
}

#seventyfive ~ .progress > .progress-bar {
  width: 70%;
  background-color: #21d3dd;
  background-image: linear-gradient(#6bf73d, #6bf73d) !important;
  height: 74%;
  top: 13%;
}

#onehundred ~ .progress > .progress-bar {
  width: 90%;
  background-color: #3df74b;
  background-image: linear-gradient(#3df74b, #3df74b) !important;
  height: 74%;
  top: 13%;
}
.radio {
  display: none;
}

.label {
  display: inline-block;
  margin: 0 5px 20px;
  padding: 3px 8px;
  color: #aaa;
  text-shadow: 0 1px black;
  border-radius: 3px;
  cursor: pointer;
}

.radio:checked + .label {
  color: white;
  background: rgba(0, 0, 0, 0.25);
}

.ulSty {
  list-style: none;
  height: 100%;
  margin-top: 35px;
  margin-left: 35px;
}
.ulSty li {
  height: 50px;
}
.badge {
  display: inline-block;
  min-width: 10px;
  padding: 3px 7px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  background-color: #777;
  border-radius: 10px;
}
// WebKit
@-webkit-keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}

// Spec and IE10+
@keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}

.progress {
  overflow: hidden;
  height: 20px;
  margin-bottom: 20px;
  float: left;
}

// Bar of progress
.progress-bar {
  float: left;
  width: 0%;
  height: 100%;
  text-align: center;
}

.progress-striped .progress-bar,
.progress-bar-striped {
  background-size: 40px 40px;
}
</style>
