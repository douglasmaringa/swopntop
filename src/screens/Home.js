import React, { useEffect,useState } from "react";
import Card from "../components/Card";
import PopularCard from "../components/PopularCard";
import Footer from "../components/Footer";
import Nav from "../components/Nav"
import { useSelector} from 'react-redux'
import CategoryCard from "../components/CategoryCard";
import { useNavigate } from 'react-router-dom';
import {db} from "../base"

function Home() {
  const[data,setData]=useState([])
  const { user } = useSelector(state => state.user)
  const navigate = useNavigate();

  useEffect(() => {
   
        db.collection("products").onSnapshot(querySnapshot=>{
           if(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })).length>0){
            setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
           }
          })
        
    
  }, [])

  const go=(e)=>{
    navigate('/category', { state: "laptops"});
}

   
  return (
    <div className="">
      <Nav/>
      <div className="flex">
      <h5 class="mb-2 text-lg font-bold tracking-tight ml-36 mt-4 text-gray-900 dark:text-white">Your Matches</h5>
      <button onClick={()=>{navigate("/addproduct")}} type="button" className="ml-auto mr-28 mt-4 py-2.5 px-5   text-sm font-medium text-white focus:outline-none bg-blue-800 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Create Post</button>
      
      </div>
     
      <div className="flex m-auto mb-10">
      <div className="flex flex-wrap mx-20 lg:m-auto ">
        {
          data?.map((e)=>(
            <>
             <Card data={e}/>
            </>
          ))
        }
      </div>
      </div>
      <div className="flex mb-4">
      <button onClick={()=>{navigate("/search")}} type="button" className="m-auto py-2.5 px-5   text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Load More</button>
      </div>


      <h5 class="mb-2 text-lg font-bold tracking-tight ml-36 mt-4 text-gray-900 dark:text-white">Categories</h5>
    
    <div className="flex m-auto mb-10">
    <div className="flex flex-wrap pl-10 mx-20 lg:m-auto ">
      <div onClick={()=>{go()}}>
     <CategoryCard/>
     </div>
     <div onClick={()=>{go()}}>
     <CategoryCard/>
     </div>
     <div onClick={()=>{go()}}>
     <CategoryCard/>
     </div>
     <div onClick={()=>{go()}}>
     <CategoryCard/>
     </div>
     
    </div>
    </div>
    <div className="flex mb-4">
    <button  type="button" className="m-auto py-2.5 px-5   text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Load More</button>
    </div>


      <h5 class="mb-2 text-lg font-bold tracking-tight ml-36 mt-4 text-gray-900 dark:text-white">Most Popular</h5>
    
      <div className="flex m-auto mb-10">
      <div className="flex flex-wrap mx-20 lg:m-auto ">
      
       {
          data?.map((e)=>(
            <>
             <PopularCard data={e}/>
            </>
          ))
        }
      </div>
      </div>
      <div className="flex mb-4">
      <button type="button" className="m-auto py-2.5 px-5   text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Load More</button>
      </div>
       


      <Footer/>
      </div>
  )
}

export default Home