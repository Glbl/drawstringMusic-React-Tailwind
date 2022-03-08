import { fork } from 'redux-saga/effects';
import watchAuthSaga from './AuthSaga';

export default function* startForman(context = {}) {
  yield fork(watchAuthSaga, context);
}
