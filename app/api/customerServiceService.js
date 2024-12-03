import axios from './axios';

export const getCustomerService = async ()=>{
    try{
        const response = await axios.get('/checking/orders');
        return response;
    }catch(error){
        console.log('getCustomerService error',error);
        return false;
    }
}

export const checked = async (id)=>{
    try{
        const response = await axios.put(`/checking/${id}/checked`);
        return response;
    }catch(error){
        console.log('checked error',error);
        return false;
    }   
}
export const canceled = async (reason)=>{
    try{
        const response = await axios.post(`/checking/canceled`,{...reason});
        return response;
    }catch(error){
        console.log('checked error',error);
        return false;
    }
}

export const edit = async (order)=>{
    try{
        const response = await axios.put(`/checking/${order.id}/edit`,{...order});
        return response;
    }catch(error){
        console.log('edit error',error);
        return false;
    }
}