import React from 'react'
import { useNavigate } from 'react-router-dom';

function Card({data}) {
  const navigate = useNavigate();

  const go=()=>{
    navigate('/product', { state: data});
}

  return (
    <div className=''>
        <div class="hover:bg-gray-100 cursor-pointer max-w-sm mt-5 ml-5 w-60 h-66 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
   
        <img class="rounded-t-lg" src={data?.images[0]} alt="" />
   
    <div class="p-5">
       
            <h5 onClick={go} class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white hover:text-red-800"><span className="bg-gray-100 px-2 py-1.5 text-white mr-1 rounded-full">	😊</span>{data.name}</h5>
      
        <p class="mb-3 ml-2 font-normal text-gray-700 dark:text-gray-400">{data.model} </p>
       
    </div>
</div>
    </div>
  )
}

export default Card