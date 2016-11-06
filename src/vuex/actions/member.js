import * as types from 'src/vuex/mutation-types'
import Api from 'libs/api'
import {
  TOKEN_KEY,
} from 'src/config'
import {syncCart, clearCart} from 'actions/cart'

export const register = ({dispatch}, params, success, error) => {
  Api.request (
    {
      url: 'member/register',
      method: 'POST',
      params: params,
    },
    (res) => {
      // token 缓存在 Api.request() 中
      dispatch(types.SET_AUTH, res.data.member)
      success(res)
    },
    (res) => {
      error(res.data)
    }
  )
}

export const login = ({dispatch}, account, password, success, error) => {
  Api.request (
    {
      url: 'member/login',
      method: 'POST',
      params: {
        account,
        password
      }
    },
    (res) => {
      // TOKEN 已在 Api.request() 中被截取并缓存
      dispatch(types.SET_AUTH, res.data.member)
      // 同步购物车
      syncCart({dispatch})
      success(res)
    },
    (res) => {
      error(res.data)
      dispatch(types.CANCEL_AUTH)
    }
  )
}

export const tokenLogin = ({dispatch}, success, error) => {
  if (Cache.get(TOKEN_KEY)) {
    Api.request (
      {url: 'member/login/token'},
      (res) => {
        dispatch(types.SET_AUTH, res.data.member)
        if (success) success(res)
        console.log('TOKEN LOGIN OK');
      },
      (res) => {
        dispatch(types.CANCEL_AUTH)
        Cache.delete(TOKEN_KEY)
        if (error) error(res)
        console.log('TOKEN LOGIN FAILS');
      }
    )
  } else if (error) { error() }
}

export const logout = ({dispatch}) => {
  dispatch(types.CANCEL_AUTH)
  dispatch(types.CLEAR_CART)
  Cache.delete(TOKEN_KEY)
}

export const fetchAddresses = ({dispatch}) => {
  Api.request (
    {url: 'member/address/list'},
    (res) => dispatch(types.SET_ADDRESSES, res.data.addresses),
    (res) => {}
  )
}

export const setAddress = ({dispatch}, data) => dispatch(types.SET_ADDRESSES, data)

export const selectAddress = ({dispatch}, id) => dispatch(types.SELECT_ADDRESS, id)
