import { put, call, takeLatest, all } from 'redux-saga/effects';
import { signup, login, forgotPassword, resetPassword } from '../../api/Auth'
import * as types from '../../constant/actions/Auth'


export default function* watchOptionsListener(context = {}){
  yield takeLatest(types.SIGNUP_REQUEST, signupSaga)
  yield takeLatest(types.LOGIN_REQUEST, loginSaga)
  yield takeLatest(types.FORGOT_PASSWORD_REQUEST, forgotPasswordSaga)
  yield takeLatest(types.RESET_PASSWORD_REQUEST, resetPasswordSaga)
}

export function* signupSaga({payload}) {
  try{
    const res = yield call(signup, payload)
    yield all([
      put({type: types.SIGNUP_SUCCESS, res})
    ])
  }catch (error) {
    yield put({ type: types.SIGNUP_FAILURE, error });
  }
}

export function* loginSaga({payload}) {
  try{
    const res = yield call(login, payload)
    yield all([
      put({type: types.LOGIN_SUCCESS, res})
    ])
  }catch (error) {
    yield put({ type: types.LOGIN_FAILURE, error });
  }
}

export function* forgotPasswordSaga({payload}) {
  try{
    const res = yield call(forgotPassword, payload)
    yield all([
      put({type: types.FORGOT_PASSWORD_SUCCESS, res})
    ])
  }catch (error) {
    yield put({ type: types.FORGOT_PASSWORD_FAILURE, error });
  }
}

export function* resetPasswordSaga({payload}) {
  try{
    const res = yield call(resetPassword, payload)
    yield all([
      put({type: types.RESET_PASSWORD_SUCCESS, res})
    ])
  }catch (error) {
    yield put({ type: types.RESET_PASSWORD_FAILURE, error });
  }
}


