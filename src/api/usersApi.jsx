import axios from "axios"



export let getUsers = async()=>{
        let res = await axios.get("https://fakestoreapi.com/users")
        console.log(res.data)
    }