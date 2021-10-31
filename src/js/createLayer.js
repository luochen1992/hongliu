import GroupLayer from './groupLayer'
import TileLayer from './tileLayer'
import Tiles3dLayer from './tiles3dLayer'
import HangdaoLayer from './Hangdao'
import GeojsonLayer from './Geojson'
import loadgltfLayer from './loadGltf'
import GltfLayer from './gltfLayer'
import GltfLayer2 from './gltfLayer2'
import Clusterpoint2 from './clusterpoint2'
import AnimateLayer from './animatelayer'
import AddLabelLayer from './addLabel'
import ShowFacilityPoint from './showfacilitypoint'
import GobAreaLayer from './GobArea'

/**
 * 创建图层
 */
function createLayer(item, viewer, callback) {
    var layer

    switch (item.type) {
        // ===============地图数组====================
        case 'group':
            // 示例：{ "name": "电子地图", "type": "group","layers": [    ]}
            if (item.layers && item.layers.length > 0) {
                var arrVec = []
                for (var index = 0; index < item.layers.length; index++) {
                    var temp = createLayer(item.layers[index], viewer, callback)
                    if (temp == null) continue
                    arrVec.push(temp)
                    if (viewer && viewer.layerList && viewer.layerList.length > 0) {
                        for (var it = 0; it < viewer.layerList.length; it++) {
                            if (viewer.layerList[it] === temp) {
                                viewer.layerList.splice(it, 1)
                            }
                        }
                    }
                }
                item._layers = arrVec
                layer = new GroupLayer(item, viewer)
                if (viewer && layer != null) {
                    viewer.layerList.push(layer)
                }
            } else {
                item._layers = []
                layer = new GroupLayer(item, viewer)
                if (viewer && layer != null) {
                    viewer.layerList.push(layer)
                }
            }
            break
        case 'WebMapTileServiceImageryProvider':
        case 'ArcGisMapServerImageryProvider':
        case 'SingleTileImageryProvider':
        case 'UrlTemplateImageryProvider':
        case 'WebMapServiceImageryProvider':
        case 'TileMapServiceImageryProvider':
        case 'BingMapsImageryProvider':
        case 'MapboxImageryProvider':
        case 'MapboxStyleImageryProvider':
        case 'GridImageryProvider':
        case 'TileCoordinatesImageryProvider':
        case '_FeatureGridImageryProvider':
            // 瓦片图层
            layer = new TileLayer(item, viewer)
            if (viewer && layer != null) {
                viewer.layerList.push(layer)
            }
            break

        case '3dtiles':
            layer = new Tiles3dLayer(item, viewer)
            if (viewer && layer != null) {
                viewer.layerList.push(layer)
            }
            break
        case 'hangdao':
            layer = new HangdaoLayer(item, viewer)
            if (viewer && layer != null) {
                viewer.layerList.push(layer)
            }
            break
        case 'geojson':
            layer = new GeojsonLayer(item, viewer)
            if (viewer && layer != null) {
                viewer.layerList.push(layer)
            }
            break
        case 'loadgltf':
            layer = new loadgltfLayer(item, viewer)
            if (viewer && layer != null) {
                viewer.layerList.push(layer)
            }
            break

        case 'gltflayer':
            layer = new GltfLayer(item, viewer)
            if (viewer && layer != null) {
                viewer.layerList.push(layer)
            }
            break
        case 'gltflayer2':
            layer = new GltfLayer2(item, viewer)
            if (viewer && layer != null) {
                viewer.layerList.push(layer)
            }
            break
        case 'clusterpoint2':
            layer = new Clusterpoint2(item, viewer)
            if (viewer && layer != null) {
                viewer.layerList.push(layer)
            }
            break
        case 'addlabellayer':
            layer = new AddLabelLayer(item, viewer)
            if (viewer && layer != null) {
                viewer.layerList.push(layer)
            }
            break
        case 'showfacilitypoint':
            layer = new ShowFacilityPoint(item, viewer)
            if (viewer && layer != null) {
                viewer.layerList.push(layer)
            }
            break
        case 'gobArea':
            layer = new GobAreaLayer(item, viewer)
            if (viewer && layer != null) {
                viewer.layerList.push(layer)
            }
            break
            case 'animatelayer':
            layer = new AnimateLayer(item, viewer)
            if (viewer && layer != null) {
                viewer.layerList.push(layer)
            }
            break
        default:
            break
    }
    if (item.id) {
        layer._id = item.id
    }
    if (callback) {
        var _temp = callback(item, viewer, layer)
        if (_temp) { layer = _temp }
    }

    if (layer == null) {
        if (item.type !== 'group') { console.log('配置中的图层未处理：' + JSON.stringify(item)) }
    } else { }

    return layer
}
export default createLayer