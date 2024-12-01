import axiosLib from "axios";
import settings from "../config/settings";
import { getToken } from "./tokenService";



 const axios = axiosLib.create({
    baseURL:settings.apiUrl,
      headers:{
        Accept:'application/json',
      }
});
export const axiosF = axiosLib.create({
    baseURL:settings.apiUrl,
    headers:{
      'Content-Type':'multipart/form-data',
    }
});
async function token(req){
  let token = await getToken()
  if(token !== null) req.headers.Authorization = `Bearer ${token}`
  return req
 }
 axios.interceptors.request.use(token);
 axiosF.interceptors.request.use(token);
 
 export default axios;