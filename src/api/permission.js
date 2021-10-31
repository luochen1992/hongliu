import axios from '@/config/httpConfig'

export function getflyline() {
    return axios.get('api/flightroute/info')
}

export function getflgetspacestatisyline(params) {
    return axios.get('api/geo/getspacestatis', { params: params })
}

export function equipmentmodel(params) {
    return axios.get('api/geo/equipmentmodel', { params: params })
}
