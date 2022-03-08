import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from 'react-loading-overlay';

import Layout from '../Layout';

const RequireAuth = ({ children, ...props }) => {
  const token = true;
  const navigate = useNavigate();
  // const currentPath = window.location.pathname
  // if (!token && currentPath !== '/') localStorage.setItem('redirect_url', currentPath)

  const findLoading = (data) => {
    let states = Object.keys(data);
    let loading = false;
    states.forEach(state => {
      if (data[state].loading) {
        loading = true;
      }
    })
    return loading;
  }

  useEffect(() => {
    if (!token) navigate("/login")
  }, [token]);

  return (
    <>
      {
        token
          ? (
            <Loading
              active={findLoading(props)}
              spinner
              className="h-full"
              text=""
            >
              <Layout>{children}</Layout>
            </Loading>
          )
          : (
            <Navigate to="/login" replace />
          )
      }
    </>
  )
};

export default connect(state => state)(RequireAuth);