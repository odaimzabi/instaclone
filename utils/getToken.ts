import { useEffect } from "react"



export default function getToken(){

    let token=""

    if (typeof window !== "undefined") {

    token=localStorage.getItem('token')||""
        
        }
    return token
}