import { RECORD_ADDRESS } from './mutations-types'

export default {
  [RECORD_ADDRESS](state, { latitude, longitude }) {
    state.latitude = latitude
    state.longitude = longitude
  }
}
