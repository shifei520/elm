export default {
  getGeohash(state) {
    return state.latitude + ',' + state.longitude
  }
}
