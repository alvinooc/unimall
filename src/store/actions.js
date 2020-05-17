import { getAddress, getCheckLogin, changAddress } from '@/service/api'

export default {
  // 检查是否登陆
  _getCheckLogin( { commit} ) {
    return new Promise((resolve, reject) => {
      getCheckLogin().then(res => {
        if (res.data.code === 1) {
          commit('getUserInfo', res.data.data)
          resolve()
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 获取地址信息
  _getAddress({ commit }) {
    return new Promise((resolve, reject) => {
      getAddress().then(res => {
        if (res.statusCode === 200) {
          // console.log(res.data.data)
          const address = res.data.data
          commit('get_address', address)
          resolve(address)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 新增/修改地址
  _changAddress({ commit } , payload) {
    return new Promise((resolve, reject) => {
      changAddress(payload).then(res => {
        console.log(res)
        resolve(res)
      }).catch(err => {
        reject()
      })
    })
  }
}
