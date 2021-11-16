 
var normalController = true;
var g_preState={
	sun:true,
	moon:true,
	skyBox:true,
	skyAtmosphere:true,
	undergroundMode:false,
	globe:true,
	baseColor:new Cesium.Color(0, 0, 0, 0),
	backgroundcolor:new Cesium.Color(0, 0, 0, 0),
	minimumZoomDistance:-1000,
	maximumZoomDistance: 22000000,
	_minimumZoomRate :10,
	_maximumZoomRate:5906376272000,
	pickPositionSupported:false,
	_minimumUndergroundPickDistance:-1000.0,
	_maximumUndergroundPickDistance: 3000.0,	 
	near:0.0001,
	_zoomFactor :0.5,
	_maximumRotateRate : 1.77,
	_minimumRotateRate :1.0 / 5000.0
};

var g_undergroundMode = false;
function savePreState()
{
	g_preState.sun=viewer.scene.sun.show;
	g_preState.moon=viewer.scene.moon.show;
	g_preState.skyBox=viewer.scene.skyBox.show;
	g_preState.skyAtmosphere=viewer.scene.skyAtmosphere.show;
	g_preState.undergroundMode=viewer.scene.undergroundMode;
	g_preState.globe=viewer.scene.globe.show;
	g_preState.baseColor=viewer.scene.globe.baseColor;
	g_preState.backgroundcolor=viewer.scene.backgroundcolor;
	g_preState.minimumZoomDistance=viewer.scene.screenSpaceCameraController.minimumZoomDistance;
	g_preState.maximumZoomDistance= viewer.scene.screenSpaceCameraController.maximumZoomDistance;
	g_preState._minimumZoomRate=viewer.scene.screenSpaceCameraController._minimumZoomRate;
	g_preState._maximumZoomRate=viewer.scene.screenSpaceCameraController._maximumZoomRate;
	g_preState.pickPositionSupported=viewer.scene.pickPositionSupported;
	g_preState._minimumUndergroundPickDistance=viewer.scene.screenSpaceCameraController._minimumUndergroundPickDistance;
	g_preState._maximumUndergroundPickDistance= viewer.scene.screenSpaceCameraController._maximumUndergroundPickDistance;	 
	g_preState.near=viewer.camera.near;
	g_preState._zoomFactor=viewer.scene.screenSpaceCameraController._zoomFactor;
	g_preState._maximumRotateRate=viewer.scene.screenSpaceCameraController._maximumRotateRate;
	g_preState._minimumRotateRate=viewer.scene.screenSpaceCameraController._minimumRotateRate;
}
function resetPreState()
{
	viewer.scene.sun.show=g_preState.sun;
	viewer.scene.moon.show=g_preState.moon;
	viewer.scene.skyBox.show=g_preState.skyBox;
	viewer.scene.skyAtmosphere.show=g_preState.skyAtmosphere;
	viewer.scene.undergroundMode=g_preState.undergroundMode;
	viewer.scene.globe.show=g_preState.globe;
	viewer.scene.globe.baseColor=g_preState.baseColor;
	viewer.scene.backgroundcolor=g_preState.backgroundcolor;
	viewer.scene.screenSpaceCameraController.minimumZoomDistance=g_preState.minimumZoomDistance;
	viewer.scene.screenSpaceCameraController.maximumZoomDistance=g_preState.maximumZoomDistance;
	viewer.scene.screenSpaceCameraController._minimumZoomRate=g_preState._minimumZoomRate;
	viewer.scene.screenSpaceCameraController._maximumZoomRate=g_preState._maximumZoomRate;
	viewer.scene.pickPositionSupported=g_preState.pickPositionSupported;
	viewer.scene.screenSpaceCameraController._minimumUndergroundPickDistance=g_preState._minimumUndergroundPickDistance;
	viewer.scene.screenSpaceCameraController._maximumUndergroundPickDistance=g_preState._maximumUndergroundPickDistance ;	 
	viewer.camera.near=g_preState.near;
	viewer.scene.screenSpaceCameraController._zoomFactor=g_preState._zoomFactor;
	viewer.scene.screenSpaceCameraController._maximumRotateRate=g_preState._maximumRotateRate;
	viewer.scene.screenSpaceCameraController._minimumRotateRate=g_preState._minimumRotateRate;
}
