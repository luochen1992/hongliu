export default class rotateCamera {
    constructor(viewer) {
        this.viewer = viewer
        this.Exection = null
    }

    //开始绕中心点旋转
    //rotateCamera({lng:116.404125, lat:39.914714, pitch: -35, height: 400});
    startRotate(position) {
        let lpitch = -35
        let height = this.getHeight()
        console.log(height);
        // 相机看点的角度，如果大于0那么则是从地底往上看，所以要为负值，这里取-30度
        var pitch = Cesium.Math.toRadians(lpitch)
            // 给定飞行一周所需时间，比如30s, 那么每秒转动度数
        var angle = 360 / 30
            // 给定相机距离点多少距离飞行
        var distance = height
        var startTime = Cesium.JulianDate.fromDate(new Date())

        var stopTime = Cesium.JulianDate.addSeconds(startTime, 60 * 60 * 24, new Cesium.JulianDate())

        this.viewer.clock.startTime = startTime.clone() // 开始时间
        this.viewer.clock.stopTime = stopTime.clone() // 结速时间
        this.viewer.clock.currentTime = startTime.clone() // 当前时间
        this.viewer.clock.clockRange = Cesium.ClockRange.CLAMPED // 行为方式
        this.viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK // 时钟设置为当前系统时间; 忽略所有其他设置。
            // 相机的当前heading
        var initialHeading = this.viewer.camera.heading
        var that = this
        this.Exection = function TimeExecution() {
            // 当前已经过去的时间，单位s
            var delTime = Cesium.JulianDate.secondsDifference(that.viewer.clock.currentTime, that.viewer.clock.startTime)
                // 根据过去的时间，计算偏航角的变化
            var heading = Cesium.Math.toRadians(delTime * angle) + initialHeading

            that.viewer.camera.lookAt(position, new Cesium.HeadingPitchRange(heading, pitch, distance))

            if (Cesium.JulianDate.compare(that.viewer.clock.currentTime, that.viewer.clock.stopTime) >= 0) {
                that.viewer.clock.onTick.removeEventListener(that.Exection)
            }
        };
        this.viewer.clock.onTick.addEventListener(this.Exection)
    }

    //结束绕中心点旋转
    endRotate() {
        if (this.Exection) {
            this.viewer.clock.onTick.removeEventListener(this.Exection)
        }
    }

    /* 获取camera高度  */
    getHeight() {
        if (this.viewer) {
            var height = this.viewer.camera.positionCartographic.height
            if (height > 10000) { height = 10000 }
            if (height < -10000) { height = -10000 }
            return height
        }
    }
}