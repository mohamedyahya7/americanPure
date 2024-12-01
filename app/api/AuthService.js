import axios from './axios';
import * as SecureStore from 'expo-secure-store';
import { setToken } from './tokenService';
export const login = async (credentials)=>{
    try{
    const {data} = await axios.post('login',credentials);
    setToken(data.token);
    await SecureStore.setItemAsync('user',JSON.stringify(data.user));
    return data.user;
    }catch(error){
        console.log('login error', error);
        return false;
    }
}
export const logout = async (setUser)=>{
    await SecureStore.deleteItemAsync('user');
    setToken(null);
    setUser(null);
    // await axios.post('/logout');
}
