/**
 * 创建一通三防路线的基本函数
 * Date:2021.11.27
 */

export default class Flow {
    constructor(viewer, rescueType, rescueDirect) {
            this.viewer = viewer
            this.rescueType = rescueType
            this.rescueDirect = rescueDirect
        }
        /**
         * @param {JSON} json 巷道json文件
         * @returns {Array} coordList  获取所属避灾路线的巷道
         * @param {Number} W  巷道宽度
         * @param {Number} H  巷道高度
         * @param {Number} speed  流速/移动速度
         * @param {String} arrowImageFile 箭头图片
         * @param {Number} arrowDistance 箭头间隔（多少米一个箭头）
         */
    getNeededRoute(json, W, H, speed, arrowImageFile, arrowDistance) {
            window.cesiumvariate[this.rescueType] = []
            var length = json.Map.length
            for (var j = 0; j < length; j++) {
                var obj = json.Map[j]
                if (obj.ModelType == 'MModel_Passage') {
                    if (obj[this.rescueType]) {
                        var W = obj.W * 1.1
                        var H = obj.H * 1.1
                        var xyz = obj.XYZ
                        var coordList = []
                        var xyzArr = obj.XYZ.split(';')
                        if (obj[this.rescueDirect]) {
                            //与巷道同向
                            for (var k = 0; k < xyzArr.length; k++) {
                                var xyzArr2 = xyzArr[k].split(',')
                                var x1 = parseFloat(xyzArr2[0])
                                var y1 = parseFloat(xyzArr2[1])
                                var z1 = parseFloat(xyzArr2[2])

                                var pos = window.convert2000ToWGS84(x1, y1, z1)
                                coordList.push(pos.x)
                                coordList.push(pos.y)
                                coordList.push(pos.z)
                            }
                        } else {
                            //与巷道反向
                            for (var k = xyzArr.length - 1; k >= 0; k--) {
                                var xyzArr2 = xyzArr[k].split(',')
                                var x1 = parseFloat(xyzArr2[0])
                                var y1 = parseFloat(xyzArr2[1])
                                var z1 = parseFloat(xyzArr2[2])

                                var pos = window.convert2000ToWGS84(x1, y1, z1)
                                coordList.push(pos.x)
                                coordList.push(pos.y)
                                coordList.push(pos.z)
                            }
                        }
                        this.createFlowVolume(coordList, W, H, speed, arrowImageFile, arrowDistance);
                    }
                }
            }

        }
        /**
         * @param {Array} coordList 符合要求的数组
         * @param {Number} W  巷道包围盒宽度
         * @param {Number} H  巷道包围盒高度
         * @param {Number} speed  流速/移动速度
         * @param {String} arrowImageFile 箭头图片
         * @param {Number} arrowDistance 箭头间隔（多少米一个箭头）
         * @returns 
         */
    createFlowVolume(coordList, W, H, speed, arrowImageFile, arrowDistance) {
        if (coordList.length < 6) return

        /************************开始构建对象**********************************/
        var coordListLB = []
        var coordListLT = []
        var coordListRB = []
        var coordListRT = []
        var x1, y1, z1, x2, y2, z2
        var azi, azi2, W2
        var COS, SIN
        var COS2, SIN2
        for (let i = 0; i < coordList.length - 3; i += 3) {
            x1 = coordList[i] //.x;
            y1 = coordList[i + 1] //.y;
            z1 = coordList[i + 2] - 0.2 //.z;

            x2 = coordList[i + 3] //.x;
            y2 = coordList[i + 4] // .y;
            z2 = coordList[i + 5] - 0.2 // .z;
            W2 = this.MToDegree(y1, W)
            var dis = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
            if (dis < 20) {
                coordListLB.push(x1 - W2, y1 + W2, z1);
                coordListLB.push(x2 - W2, y2 + W2, z2);
                coordListLT.push(x1 - W2, y1 - W2, z1);
                coordListLT.push(x2 - W2, y2 - W2, z2)



                coordListRB.push(x1 + W2, y1 + W2, z1);
                coordListRB.push(x2 + W2, y2 + W2, z2);

                coordListRT.push(x1 + W2, y1 - W2, z1);
                coordListRT.push(x2 + W2, y2 - W2, z2);
            } else {
                azi2 = azi = this.GetAzimuth(x2, y2, x1, y1)
                azi += 90
                azi2 -= 90

                azi = (azi / 180) * Math.PI
                COS = Math.cos(azi) * W2
                SIN = Math.sin(azi) * W2

                azi2 = (azi2 / 180) * Math.PI
                COS2 = Math.cos(azi2) * W2
                SIN2 = Math.sin(azi2) * W2

                coordListLB.push(x1 + COS2, y1 + SIN2, z1)
                coordListLB.push(x2 + COS2, y2 + SIN2, z2)
                coordListLT.push(x1 + COS2, y1 + SIN2, z1 + H + 0.4)
                coordListLT.push(x2 + COS2, y2 + SIN2, z2 + H + 0.4)

                coordListRB.push(x1 + COS, y1 + SIN, z1)
                coordListRB.push(x2 + COS, y2 + SIN, z2)

                coordListRT.push(x1 + COS, y1 + SIN, z1 + H + 0.4)
                coordListRT.push(x2 + COS, y2 + SIN, z2 + H + 0.4)
            }
        }
        var coordListLB2 = Cesium.Cartesian3.fromDegreesArrayHeights(coordListLB)
        var coordListLT2 = Cesium.Cartesian3.fromDegreesArrayHeights(coordListLT)
        var coordListRB2 = Cesium.Cartesian3.fromDegreesArrayHeights(coordListRB)
        var coordListRT2 = Cesium.Cartesian3.fromDegreesArrayHeights(coordListRT)

        var k = 0
        var numVertex = 0

        var textureArr = []
        var colorArr = []
        var curdataArr = []
        var stsTemp = []

        var totalLength = 0
        var addLen = 0
        for (let i = 0; i < coordListLB2.length - 1; i++) {
            var x1 = coordListLB2[i].x
            var y1 = coordListLB2[i].y
            var z1 = coordListLB2[i].z
            var x2 = coordListLB2[i + 1].x
            var y2 = coordListLB2[i + 1].y
            var z2 = coordListLB2[i + 1].z
            totalLength += Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) + (z2 - z1) * (z2 - z1))
        }
        var links = new Uint32Array((coordListLB2.length - 1) * 8 * 3)
        for (let i = 0; i < coordListLB2.length - 1; i++) {
            var x1 = coordListLB2[i].x
            var y1 = coordListLB2[i].y
            var z1 = coordListLB2[i].z
            var x2 = coordListLB2[i + 1].x
            var y2 = coordListLB2[i + 1].y
            var z2 = coordListLB2[i + 1].z

            var x3 = coordListLT2[i].x
            var y3 = coordListLT2[i].y
            var z3 = coordListLT2[i].z
            var x4 = coordListLT2[i + 1].x
            var y4 = coordListLT2[i + 1].y
            var z4 = coordListLT2[i + 1].z

            var x5 = coordListRB2[i].x
            var y5 = coordListRB2[i].y
            var z5 = coordListRB2[i].z
            var x6 = coordListRB2[i + 1].x
            var y6 = coordListRB2[i + 1].y
            var z6 = coordListRB2[i + 1].z

            var x7 = coordListRT2[i].x
            var y7 = coordListRT2[i].y
            var z7 = coordListRT2[i].z
            var x8 = coordListRT2[i + 1].x
            var y8 = coordListRT2[i + 1].y
            var z8 = coordListRT2[i + 1].z
            var len = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) + (z2 - z1) * (z2 - z1))
            var st1 = addLen / totalLength
            addLen += len
            var st2 = addLen / totalLength; {
                curdataArr.push(x1)
                curdataArr.push(y1)
                curdataArr.push(z1)

                curdataArr.push(x2)
                curdataArr.push(y2)
                curdataArr.push(z2)

                curdataArr.push(x3)
                curdataArr.push(y3)
                curdataArr.push(z3)

                curdataArr.push(x4)
                curdataArr.push(y4)
                curdataArr.push(z4)
                stsTemp.push(st1)
                stsTemp.push(0.0)
                stsTemp.push(st2)
                stsTemp.push(0.0)
                stsTemp.push(st1)
                stsTemp.push(1.0)
                stsTemp.push(st2)
                stsTemp.push(1.0)

                links[k++] = numVertex + 0
                links[k++] = numVertex + 1
                links[k++] = numVertex + 3

                links[k++] = numVertex + 0
                links[k++] = numVertex + 3
                links[k++] = numVertex + 2

                numVertex += 4
            } {
                curdataArr.push(x3)
                curdataArr.push(y3)
                curdataArr.push(z3)

                curdataArr.push(x4)
                curdataArr.push(y4)
                curdataArr.push(z4)

                curdataArr.push(x7)
                curdataArr.push(y7)
                curdataArr.push(z7)

                curdataArr.push(x8)
                curdataArr.push(y8)
                curdataArr.push(z8)

                links[k++] = numVertex + 0
                links[k++] = numVertex + 1
                links[k++] = numVertex + 3
                stsTemp.push(st1)
                stsTemp.push(0.0)
                stsTemp.push(st2)
                stsTemp.push(0.0)
                stsTemp.push(st1)
                stsTemp.push(1.0)
                stsTemp.push(st2)
                stsTemp.push(1.0)

                links[k++] = numVertex + 0
                links[k++] = numVertex + 3
                links[k++] = numVertex + 2

                numVertex += 4
            } {
                curdataArr.push(x7)
                curdataArr.push(y7)
                curdataArr.push(z7)

                curdataArr.push(x8)
                curdataArr.push(y8)
                curdataArr.push(z8)

                curdataArr.push(x5)
                curdataArr.push(y5)
                curdataArr.push(z5)

                curdataArr.push(x6)
                curdataArr.push(y6)
                curdataArr.push(z6)

                links[k++] = numVertex + 0
                links[k++] = numVertex + 1
                links[k++] = numVertex + 3
                stsTemp.push(st1)
                stsTemp.push(0.0)
                stsTemp.push(st2)
                stsTemp.push(0.0)
                stsTemp.push(st1)
                stsTemp.push(1.0)
                stsTemp.push(st2)
                stsTemp.push(1.0)

                links[k++] = numVertex + 0
                links[k++] = numVertex + 3
                links[k++] = numVertex + 2

                numVertex += 4
            } {
                curdataArr.push(x5)
                curdataArr.push(y5)
                curdataArr.push(z5)

                curdataArr.push(x6)
                curdataArr.push(y6)
                curdataArr.push(z6)

                curdataArr.push(x1)
                curdataArr.push(y1)
                curdataArr.push(z1)

                curdataArr.push(x2)
                curdataArr.push(y2)
                curdataArr.push(z2)

                links[k++] = numVertex + 0
                links[k++] = numVertex + 1
                links[k++] = numVertex + 3
                stsTemp.push(st1)
                stsTemp.push(0.0)
                stsTemp.push(st2)
                stsTemp.push(0.0)
                stsTemp.push(st1)
                stsTemp.push(1.0)
                stsTemp.push(st2)
                stsTemp.push(1.0)

                links[k++] = numVertex + 0
                links[k++] = numVertex + 3
                links[k++] = numVertex + 2

                numVertex += 4
            }
        }
        let sts = new Float32Array(stsTemp)
        var geometryMesh = new Cesium.Geometry({
            attributes: {
                position: new Cesium.GeometryAttribute({
                    componentDatatype: Cesium.ComponentDatatype.DOUBLE,
                    componentsPerAttribute: 3,
                    values: curdataArr
                }),
                st: new Cesium.GeometryAttribute({
                    componentDatatype: Cesium.ComponentDatatype.FLOAT,
                    componentsPerAttribute: 2,
                    values: sts
                })
            },
            indices: links,
            primitiveType: Cesium.PrimitiveType.TRIANGLES,
            boundingSphere: Cesium.BoundingSphere.fromVertices(curdataArr)
        })
        geometryMesh = Cesium.GeometryPipeline.computeNormal(geometryMesh)

        var instanceMesh = new Cesium.GeometryInstance({
            geometry: geometryMesh
        })

        var appc = new Cesium.PolylineMaterialAppearance({
            material: new Cesium.Material({
                fabric: {
                    uniforms: {
                        color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
                        image: arrowImageFile,
                        animationSpeed: speed,
                        repeat: new Cesium.Cartesian2(totalLength / arrowDistance, 1)
                    },
                    source: 'czm_material czm_getMaterial(czm_materialInput materialInput) { \n\
                        czm_material material = czm_getDefaultMaterial(materialInput);\n\
                        vec2 st = repeat *materialInput.st;\n\
                        float time = czm_frameNumber*animationSpeed;\n\
                        vec4 colorImage = texture2D(image,vec2(fract(st.s - time), st.t));\n\
                        material.alpha = colorImage.a;\n\
                        material.diffuse = colorImage.rgb;\n\
                        return material;\n\
                        } \n'
                },
                translucent: function() {
                    return false
                }
            })
        })

        window.cesiumvariate[this.rescueType].push(new Cesium.CustomDataSource(Cesium.createGuid()))
        this.viewer.dataSources.add(window.cesiumvariate[this.rescueType][window.cesiumvariate[this.rescueType].length - 1])
        var custom_flowMesh = window.cesiumvariate[this.rescueType][window.cesiumvariate[this.rescueType].length - 1]._primitives.add(
            new Cesium.Primitive({
                geometryInstances: instanceMesh,
                appearance: appc,
                asynchronous: false
            })
        )
    }
    MToDegree(lat, r) {
        var degree = (2 * Math.PI * Math.cos(((2 * Math.PI) / 360) * lat) * 6378140) / 360
        var degree2 = (1 / degree) * r
        return degree2
    }
    GetAzimuth(X1, Y1, X2, Y2) {
        var tmpValue = 0

        if (X1 == X2 || Y1 == Y2) {
            if (X1 == X2) {
                /// 经度相同
                if (Y2 >= Y1) {
                    return 90
                } else {
                    return 270
                }
            } else {
                /// 纬度相同
                if (X2 >= X1) {
                    return 0
                } else {
                    return 180
                }
            }
        }

        tmpValue = Math.atan((Y2 - Y1) / (X2 - X1))
        var resultAngle = Math.abs((tmpValue * 180) / Math.PI)

        if (X2 > X1) {
            if (Y2 >= Y1) {
                /// 第一象限
                return resultAngle
            } else {
                /// 第四象限
                return 360 - resultAngle
            }
        } else {
            /// 第二象限
            if (Y2 >= Y1) {
                return 180 - resultAngle
            } else {
                /// 第三象限
                return 180 + resultAngle
            }
        }
    }
}