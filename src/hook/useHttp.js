import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url,option){
const response=await fetch(url,option);
if(!response.ok){
    throw new Error('failed to fetch data');
}
const data=await response.json();
return data;
}//this function is called in useHttp ->sendReguest->sendHttpRequest

export function useHttp(url,option,initialState){
    const [data,setData]=useState(initialState);
    const[loading,setLoading]=useState(false);
    const [error,setError]=useState();

   const sendRequest=useCallback( async function sendRequest(data){
        try{
            setLoading(true);
           const responsedata= await  sendHttpRequest(url,{...option,body:data});
           setData(responsedata);
        }
        catch(error){
            setError('failed to fetch');
        }
        finally{
            setLoading(false);
        }
    
    })
    useEffect(()=>{
        if((option && ( !option.method || option.method==='GET')) || !option){
         sendRequest();
        }
    },[sendRequest,option])
    return{
        data,
       loading,
       error,
       sendRequest
    }
}