import React, { useEffect,useState } from "react";
import {db} from '../base'
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'
import Nav from "../components/Nav";

function Connections() {
    const navigate = useNavigate();
 const { user } = useSelector(state => state.user)
 const[data,setData]=useState([])

 useEffect(() => {
    
        db.collection("chatroom").where("members", "array-contains", user.email).orderBy('timestamp', 'desc')
        .onSnapshot((querySnapshot) => {
           
          setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
           
    })
   
  }, [user]);

  //when you click the conversation it will open that conversation in chat page
  const chat=(e)=>{
    navigate('/chat', { state: e});
}

 console.log(data)
  return (
    <div>
        <div>
        <Nav/>
        {
            data.map((e)=>(
                <>

 <div class="mt-4">
   
   <div class="">
    
     <div class="border-r border-b border-l border-gray-400 lg:border-l-2 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
      
       <div class="ml-20 flex items-center">
       {(() => {
              if (e.members[0] == user.email){
                  return (
                      <>
                      <img class="w-20 h-20 rounded-full mr-4" src={e.otherPro} alt="Avatar of Writer"/>
        
                      </>
                  )
              }else{
                return (
                    <>
                    <img class="w-20 h-20 rounded-full mr-4" src={e.yourPro} alt="Avatar of Writer"/>
      
                    </>
                )
              }
              
              return null;
            })()}
          <div class="text-sm flex">
          {(() => {
              if (e.members[0] == user.email){
                  return (
                      <>
                      <p class="text-green-600 mt-2 font-bold text-lg leading-none pr-20">{e?.members[1]}</p>
          
                      </>
                  )
              }else{
                return (
                    <>
                     <p class="text-green-600 mt-2 font-bold text-lg leading-none pr-20">{e?.members[0]}</p>
          
                    </>
                )
              }
              
              return null;
            })()}
           <p class="text-red-600 mt-4  leading-none lg:pr-20">{e?.lastmessage}</p>
           
           <button onClick={()=>{chat(e)}} className="bg-white  mr-2 border-green-600 border-2 text-black  hover:bg-green-900 hover:text-white font-bold py-1 px-4 rounded-3xl ">
                                  Chat
            </button>
         </div>
       </div>
     </div>
   </div>
 </div>


                </>
            ))
        }
        
        
        </div>
    </div>
  )
}

export default Connections