function PolylineTrailLinkMaterialProperty(name, color, image, duration) {
    this._definitionChanged = new window.Cesium.Event();
    this._color = undefined;
    this._colorSubscription = undefined;
    this.color = color;
    this.duration = duration;
    this.image = image;
    this.name = name;
    this._time = (new Date()).getTime();
}
Object.defineProperties(PolylineTrailLinkMaterialProperty.prototype, {
    isConstant: {
        get: function () {
            return false;
        }
    },
    definitionChanged: {
        get: function () {
            return this._definitionChanged;
        }
    },
    color: window.Cesium.createPropertyDescriptor('color')
});
PolylineTrailLinkMaterialProperty.prototype.getType = function (time) {
    return this.name; //'PolylineTrailLink';
}
PolylineTrailLinkMaterialProperty.prototype.getValue = function (time, result) {
    if (!window.Cesium.defined(result)) {
        result = {};
    }
    result.color = window.Cesium.Property.getValueOrClonedDefault(this._color, time, window.Cesium.Color.WHITE, result.color);
    result.image = this.image; //Cesium.Material.PolylineTrailLinkImage;
    result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration;
    return result;
}
PolylineTrailLinkMaterialProperty.prototype.equals = function (other) {
    return false;
}
window.Cesium.PolylineTrailLinkMaterialProperty = PolylineTrailLinkMaterialProperty;
window.Cesium.Material.PolylineTrailLinkSource =
    "czm_material czm_getMaterial(czm_materialInput materialInput)\n" +
    "{\n" +
    "czm_material material = czm_getDefaultMaterial(materialInput);\n" +
    "vec2 st =repeat * materialInput.st;\n" +
    "vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n" +
    "material.alpha = colorImage.a * color.a;\n" +
    "material.diffuse = (colorImage.rgb*0.7+color.rgb*0.3);\n" +
    "return material;\n" +
    "}";