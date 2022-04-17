import React, { useEffect,useState } from "react";
import {db} from "../base"
import { useNavigate } from 'react-router-dom';
import Nav from "../components/Nav";

function SearchPage() {
    const[data,setData]=useState([])
    const[search,setSearch]=useState([])

    useEffect(() => {
   
        db.collection("products").onSnapshot(querySnapshot=>{
           if(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })).length>0){
            setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
           }
          })
        
    
  }, [])

  const navigate = useNavigate();

  const go=(e)=>{
    navigate('/product', { state: e});
}

const find =()=>{

    db.collection("products").where("name","==",search).onSnapshot(querySnapshot=>{
       
         setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
        
       })
     
}

  console.log(data)

  return (
    <div>
       <Nav/>

       <div class="flex justify-center">
  <div class="mb-3 mt-5 xl:w-96">
    <div class="input-group relative flex  items-stretch w-full mb-4">
      <input value={search} onChange={(e)=>{setSearch(e.target.value)}} type="search" class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2"/>
      <button onClick={find} class="btn  px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
      </button>
    </div>
  </div>
</div>
       
        {
        data?.map((e)=>(
          <>
           <div class="p-10 lg:mx-20 font-serif">
   
   <div class=" w-full lg:max-w-full lg:flex">
     <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover bg-no-repeat bg-center rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{"backgroundImage": `url('${e.images[0]}')`}} title="Mountain">
     </div>
     <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
       <div class="mb-8">
         <p class="text-sm text-gray-600 flex items-center">
           <svg class="fill-current text-blue-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
             <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
           </svg>
           
          
         </p>
        
            <div class="text-green-600 font-bold text-xl mb-2 hover:text-green-900 cursor-pointer" onClick={()=>{go(e)}}>{e.name}</div>
        
           
         <p class="text-gray-700 text-base">{e.description}</p>
       </div>
       <div class="flex items-center">
         <img class="w-10 h-10 rounded-full mr-4" src={e.proPic} alt="Avatar of Writer"/>
         <div class="text-sm">
           <p class="text-green-600  leading-none">{e.username}</p>
         
         </div>
       </div>
     </div>
   </div>
 </div>

  
          </>
        ))
      }
    </div>

  
  )
}

export default SearchPage