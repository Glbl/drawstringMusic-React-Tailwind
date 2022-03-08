import * as types from '../../constant/actions/Auth'

export const signupAction = payload =>({
  type: types.SIGNUP_REQUEST,
  payload
})

export const loginAction = payload =>({
  type: types.LOGIN_REQUEST,
  payload
})

export const forgotPasswordAction = payload =>({
  type: types.FORGOT_PASSWORD_REQUEST,
  payload
})

export const resetPasswordAction = payload =>({
  type: types.RESET_PASSWORD_REQUEST,
  payload
})