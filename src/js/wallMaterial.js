const createWall = function (points, maximumHeights, minimumHeights) {
  const materialWall = window.d3kit.getCustomMaterialWall({
    image: require('@/assets/images/b2.png'),
    freely: 'vertical',
    direction: '+',
    count: 2,
    color: new Cesium.Color(10 / 155, 38 / 255, 75 / 255, 1),
    duration: 1000
  })
const wallEntity = window.viewer.entities.add({
    name: 'wallUnique',
    // wall: {
    //   positions: Cesium.Cartesian3.fromDegreesArrayHeights(points),
    //   material: materialWall
    // }
     wall: {
      positions: Cesium.Cartesian3.fromDegreesArray(points),
      maximumHeights: maximumHeights,
      minimumHeights: minimumHeights,
      material: materialWall
    }
  })
}
const createWall2 = function(points) {
  const material2 = d3kit.getCustomMaterialWall({
    image: require('@/assets/images/b2.png'),
    freely: 'cross',
    direction: '+',
    count: 5,
    color: Cesium.Color.RED,
    duration: 3000
  })

  const three = viewer.entities.add({
    name: 'aaaaa',
    wall: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        104.09816110606057, 30.659821965447698, 500.0,
        104.1120972824757, 30.65330300319938, 500.0,
        104.10758419863926, 30.64592470850288, 500.0,
        104.09351691196979, 30.652434826507452, 500.0,
        104.09816110606057, 30.659821965447698, 500.0
      ]),
      material: material2
    }
  })
}
export { createWall }

