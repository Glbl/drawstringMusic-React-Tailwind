/* eslint-disable */
import { combineReducers, createStore, applyMiddleware } from 'redux'
// import { reducer as reduxFormReducer } from 'redux-form'
// import { connectRouter } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootReducers from '../reducers/index'
import rootSaga from '../sagas/index'

const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({
  // form: reduxFormReducer, // mounted under "form",
  ...rootReducers,
})
// const store = (initialState, context = {}) => ({
//   ...createStore(reducer, applyMiddleware(sagaMiddleware)),
//   runSaga: sagaMiddleware.run(rootSaga, context),
// });

const store = (initialState, context = {}) => {
  const sagaMiddleware = createSagaMiddleware()
  return {
    ...createStore(reducer, composeWithDevTools(
      applyMiddleware(sagaMiddleware))),
    runSaga: sagaMiddleware.run(rootSaga, context),
  }
}
export default store
