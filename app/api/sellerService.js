import axios from './axios';
import {axiosF} from './axios';

export const getOrders = async ()=>{
    try{
    const {data} = await axios.get('seller/orders');
    return data;
}catch(error){
    console.log(error);
}
}

export const createOrder = async (nlisting,onUploadProgress)=>{
    //let data = new FormData();
            
    // data.append('name',nlisting.name)
    // data.append('phone',nlisting.phone)
    // data.append('phone2',nlisting.phone2)
    // data.append('national_id',nlisting.nationalId)
    // data.append('address',nlisting.address)
    
    // data.append('payment_method',nlisting.payment_method)
    // data.append('latitude',nlisting.latitude)
    // data.append('longitude',nlisting.longitude)
    
    // data.append('image1',{ name: `image1`, type: "image/jpeg", uri: nlisting.image1[0]});
    // if(nlisting.image2[0]) data.append('image2',{ name: `image2`, type: "image/jpeg", uri: nlisting.image2[0]});
    // if(nlisting.image3[0]) data.append('image3',{ name: `image3`, type: "image/jpeg", uri: nlisting.image3[0]});

    // // nlisting.images.forEach((image, index) =>data.append(`image${index+1}`,
    // //    { name: `image${index+1}`, type: "image/jpeg",uri: image,}));
    //     console.log('data',data);
    try{
    const response = await axios.post('/seller/order',nlisting,{
        onUploadProgress: (progress) =>
          onUploadProgress(progress.loaded / progress.total),
      });
    return response;
}catch(error){
    console.log(error);
}
}
