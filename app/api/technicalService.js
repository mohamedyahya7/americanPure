import axios from "./axios";

export const getOrders = async () => {
    try{
        const {data} = await axios.get('/technical/orders');
        return data;
    }catch(error){
        console.log('getOrders error',error);
        return false;
    }
}

export const acceptOrder = async (id) => {
    try{
        const {data} = await axios.put(`/technical/orders/${id}`);
        return data;
    }catch(error){
        console.log('acceptOrder error',error);
        return false;
    }
}

