import * as types from 'src/vuex/mutation-types'
import Api from 'libs/api'
import LS from 'libs/local-storage'
import Cookie from 'libs/vendor/vue-cookie'
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
      // token 缓存在 Api.request() 中
      dispatch(types.SET_AUTH, res.data.member)
      // 同步购物车
      syncCart({dispatch})
      success(res)
    },
    (res) => {
      error(res.data)
      dispatch(types.CANCEL_AUTH)
      LS.delete(TOKEN_KEY)
      Cookie.delete(TOKEN_KEY)
    }
  )
}

export const tokenLogin = ({dispatch}) => {
  let token = LS.get(TOKEN_KEY) ? LS.get(TOKEN_KEY) : Cookie.get(TOKEN_KEY)
  if (!_.isEmpty(token)) {
    console.log('Token Login ...');
    Api.request (
      {
        url: 'member/login/token',
        method: 'GET'
      },
      (res) => {
        dispatch(types.SET_AUTH, res.data.member)
      },
      (res) => {
        dispatch(types.CANCEL_AUTH)
        LS.delete(TOKEN_KEY)
        Cookie.delete(TOKEN_KEY)
      }
    )
  }
}

export const logout = ({dispatch}) => {
  dispatch(types.CANCEL_AUTH)
  dispatch(types.CLEAR_CART)
  LS.delete(TOKEN_KEY)
  Cookie.delete(TOKEN_KEY)
}
