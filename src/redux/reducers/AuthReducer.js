import * as types from '../../constant/actions/Auth'

const initialState = {
  data:[],
  loading: false,
  error:''
}

export default function auth (state = initialState, action){
  switch(action.type){

    // signup

    case types.SIGNUP_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          data: [],
          error: '',
          loading: false,
        }
      }
      return{
        ...state,
        data:(action.res.data && action.res.data.token),
        loading: false,
      }

    case types.SIGNUP_REQUEST:
      return {
        ...state,
        data: [],
        error: '',
        loading: true,
      }

    case types.SIGNUP_FAILURE:
      return {
        ...state,
        data: [],
        error: 'error',
        loading: false,
      }

      // login

    case types.LOGIN_SUCCESS:
    if (!action.res.success) {
      return {
        ...state,
        data: [],
        error: '',
        loading: false,
      }
    }
    return{
      ...state,
      data:(action.res.data && action.res.data.token),
      loading: false,
    }

    case types.LOGIN_REQUEST:
      return {
        ...state,
        data: [],
        error: '',
        loading: true,
      }

    case types.LOGIN_FAILURE:
      return {
        ...state,
        data: [],
        error: 'error',
        loading: false,
      }

      // Forgot password 

    case types.FORGOT_PASSWORD_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          data: [],
          error: '',
          loading: false,
        }
      }
      return{
        ...state,
        data:(action.res.data && action.res.data.token),
        loading: false,
      }
  
    case types.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        data: [],
        error: '',
        loading: true,
      }

    case types.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        data: [],
        error: 'error',
        loading: false,
      }

      // Reset Password

    case types.RESET_PASSWORD_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          data: [],
          error: '',
          loading: false,
        }
      }
      return{
        ...state,
        data:(action.res.data && action.res.data.token),
        loading: false,
      }
  
    case types.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        data: [],
        error: '',
        loading: true,
      }

    case types.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        data: [],
        error: 'error',
        loading: false,
      }
    default:
      return state;
  }
}