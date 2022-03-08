import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as history from 'history';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import ConnectProvider from './ConnectProvider';

import Dashboard from './pages/Dashboard';
import RequireAuth from './common/RequireAuth';
import Mint from './pages/Mint';

let Notification = (props) => {
  useEffect(() => {
    if (props.notification.id) {
      if (props.notification.success)
        toast.dark(props.notification.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      else
        toast.error(props.notification.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
    }
  }, [props.notification && props.notification.id]);
  return <></>
};

Notification = connect(state => {
  return {
    notification: state.global.notification
  }
})(Notification)

function App() {
  const Loader = () => {
    return (
      <div className="grid place-items-center h-screen bg-black bg-opacity-70">
        <div className="loader w-12 h-12 mt-2 border-white border-solid border-4 rounded-full" />
      </div>
    )
  };
  return (
    <Router history={history}>
      <ConnectProvider>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path='/'
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path='/mint'
              element={
                <RequireAuth>
                  <Mint />
                </RequireAuth>
              }
            />
          </Routes>
          <ToastContainer />
          <Notification />
        </Suspense>
      </ConnectProvider>
    </Router>
  );
}

export default App;
