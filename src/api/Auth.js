import { getAccessToken, axios } from "./index.js";
import { API_ENDPOINT_URL } from "../constant/default";

export const signup = (payload = {})=>{
let url = `${API_ENDPOINT_URL}/auth/signup`

return axios
  .get(url,{
    params: {
      ...(payload.params || {})
    },
  })
  .then((res) => ({
    success: true,
    data: res.data,
  }))
  .catch((err) => ({
    success: false,
    message: err.response.data.message,
  }));
}


export const login = (payload = {})=>{
  let url = `${API_ENDPOINT_URL}/auth/login`
  
  return axios
    .get(url,{
      params: {
        ...(payload.params || {})
      },
    })
    .then((res) => ({
      success: true,
      data: res.data,
    }))
    .catch((err) => ({
      success: false,
      message: err.response.data.message,
    }));
  }


export const forgotPassword = (payload = {})=>{
  let url = `${API_ENDPOINT_URL}/auth/forgot-password`
  
  return axios
    .get(url,{
      params: {
        ...(payload.params || {})
      },
    })
    .then((res) => ({
      success: true,
      data: res.data,
    }))
    .catch((err) => ({
      success: false,
      message: err.response.data.message,
    }));
  }


export const resetPassword = (payload = {})=>{
  let url = `${API_ENDPOINT_URL}/auth/reset-password`
  
  return axios
    .get(url,{
      params: {
        ...(payload.params || {})
      },
    })
    .then((res) => ({
      success: true,
      data: res.data,
    }))
    .catch((err) => ({
      success: false,
      message: err.response.data.message,
    }));
  }