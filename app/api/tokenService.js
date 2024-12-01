import * as SecureStore from 'expo-secure-store';


let token = null;

export async function getToken (){
    if(token !==null) return token;
    token = await SecureStore.getItemAsync('token');
    return token;
}   

    export async function setToken (newToken){
        token = newToken;
        (token !== null) ? await SecureStore.setItemAsync('token',token)
        : await SecureStore.deleteItemAsync('token');
    }

