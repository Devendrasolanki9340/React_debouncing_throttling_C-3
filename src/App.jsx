import { useEffect, useState } from "react"
import axios from "axios"


const App = () => {
  const [productData, setProductData] = useState([])
  const [searchData, setSearchData] = useState(null)
  const [scrolly, setScrolly] = useState(null)

  let throttle = false

  let getProduct = async ()=>{
    let res = await axios.get("https://fakestoreapi.com/products")
    setProductData(res.data)
  }

  let filteredData = ()=>{ 
    console.log("Filter is runnign")
    let result = productData.filter((val)=>{
      return val.title.toLowerCase().includes(searchData.toLowerCase())
    })
    setProductData(result)
  }

  //  debouncing
  useEffect(()=>{
    if(! searchData) return;

   let timeout = setTimeout(() => {
      filteredData()
    }, 700);
    return()=> clearTimeout(timeout)
  },[searchData])


  // throttling 

  useEffect(()=>{
    let handleScroll = ()=>{
      if (throttle)  return
      throttle = true
      console.log("scroll triggered...")
      setScrolly(window.scrollY)

      setTimeout(()=>{
        throttle = false
      },5000)
    }
    window.addEventListener("scroll",handleScroll)

    return()=> window.removeEventListener("scroll",handleScroll)
  },[])





  useEffect(()=>{
    getProduct()
  },[])


  return (
    <div>
      <h1>debouncing</h1>
      <input  
        style={{padding:"10px 30px"}}
       type="text" placeholder=" Search product" 
        onChange={(e)=> setSearchData(e.target.value)}
       />
      {
        productData.map((val)=>{
          return <h1  key={val.id}> {val.title}</h1>
        })
      }
    </div>
  )
}

export default App
