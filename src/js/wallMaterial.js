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
     wall: {
      positions: Cesium.Cartesian3.fromDegreesArray(points),
      maximumHeights: maximumHeights,
      minimumHeights: minimumHeights,
      material: materialWall
    }
  })
}
const createGrowWall = function(points) {
  const material2 = d3kit.getCustomMaterialWall({
    image: require('@/assets/images/glowline.jpg'),
    freely: 'cross',
    direction: '+',
    count: 5,
    color: Cesium.Color.RED,
    duration: 3000
  })

  const GrowWallEntity = window.viewer.entities.add({
    name: 'GrowWallEntity',
    wall: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        [
          112.666679,
          35.699997,
          200,
          112.715782,
          35.699989,
          200,
          112.705994,
          35.679314,
          200,
          112.729988,
          35.676205,
          200,
          112.729973,
          35.674404,
          200,
          112.734169,
          35.674397,
          200,
          112.734154,
          35.6698,
          200,
          112.725014,
          35.669807,
          200,
          112.725136,
          35.673183,
          200,
          112.714981,
          35.675266,
          200,
          112.71286,
          35.672646,
          200,
          112.703995,
          35.674438,
          200,
          112.703201,
          35.671791,
          200,
          112.692116,
          35.671661,
          200,
          112.692169,
          35.660225,
          200,
          112.656815,
          35.666321,
          200,
          112.643036,
          35.66634,
          200,
          112.658394,
          35.704113,
          200,
          112.666656,
          35.704159,
          200,
          112.666679,
          35.699997,
          200
        ]
      ]),
      material: material2
    }
  })
}
export { createWall, createGrowWall }

