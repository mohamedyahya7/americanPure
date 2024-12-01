import axios from './axios';
import {axiosF} from './axios';

export const createDevice = async (device)=>{
    try{
        const data = new FormData();
            data.append('name',device.name);
            data.append('price',device.price);
            data.append('type',device.type);
            data.append('stages',device.stages);
            data.append('image',{ name: `image`, type: "image/jpeg", uri: device.images[0]});
        const response = await axiosF.post('/device',data);
        return response;
    }catch(error){
        console.log('createDevice error',error);
        return false;
    }
}

export const createEmployee = async (employee)=>{
    try{
        const response = await axios.post('/createEmployee',employee);
        console.log(JSON.stringify(response,null,2));
        return response;
    }catch(error){
        console.log('createEmployee error',error);
        return false;
    }
}
//team
export const createTeam = async (team)=>{
    try{
        const response = await axios.post('/team',team);
        return response;
    }catch(error){
        console.log('createTeam error',error);
        return false;
    }
}
export const getTeams = async ()=>{
    try{
        const response = await axios.get('/teams');
        return response;
    }catch(error){
        console.log('getTeams error',error);
        return false;
    }
}

export const getDevices = async ()=>{
    try{
        const response = await axios.get('/devices');
        return response;
    }catch(error){
        console.log('getDevices error',error);
        return false;
    }
}

export const updateDevicePrice = async (id,price)=>{
    try{
        const response = await axios.put(`/device/${id}/price`,{price,id});
        return response;
    }catch(error){
        console.log('updateDevicePrice error',error);
        return false;
    }
}

export const updateDeviceName = async (id,name)=>{
    try{
        const response = await axios.put(`/device/${id}/name`,{name,id});
        return response;
    }catch(error){
        console.log('updateDeviceName error',error);
        return false;
    }
}
export const deleteDevice = async (id)=>{
    try{
        const response = await axios.post(`/deleteDevice`,{id});
        return response;
    }catch(error){
        console.log('deleteDevice error',error);
        return false;
    }
}


export const getEmployees = async ()=>{ 
    try{
        const response = await axios.get('/employees');
        return response;
    }catch(error){
        console.log('getEmployees error',error);
        return false;
    }
}
export const getManagerDetails = async ()=>{
    try{
        const response = await axios.get('/manager');
        return response;

    }catch(error){
        console.log('getManager error',error);
        return false;
    }
}
