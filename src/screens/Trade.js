import React, { useEffect,useState } from 'react'
import Nav from '../components/Nav'
import {db} from "../base"
import firebase from 'firebase';
import {useDispatch, useSelector} from 'react-redux'
import {createChat} from "../slices/Chat"

function Trade() {
    const { user } = useSelector(state => state.user)
    const[from,setFrom]=useState([])
    const[to,setTo]=useState([])

   
    const dispatch = useDispatch()
    

    useEffect(() => {
   
        db.collection("requests").where("from","==",user.email).onSnapshot(querySnapshot=>{
           if(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })).length>0){
            setFrom(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
           }
          })


        db.collection("requests").where("to","==",user.email).onSnapshot(querySnapshot=>{
            if(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })).length>0){
             setTo(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
            }
           })
        
    
  }, [user])

  const accept =(id,yourID,otherID,itemName,item,to,from,yourPro,otherPro)=>{
      //change status to true
      
      db.collection('requests').doc(id).update({
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        status:true
       })
       dispatch(createChat({user,yourID,otherID,itemName,item,to,from,yourPro,otherPro}))
  }

  const decline =(id)=>{
      //delete and send to declined collection
      db.collection('requests').doc(id).update({
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        declined:true
       })
      
  }

  const cancel =(id)=>{
    db.collection('requests').doc(id).delete()
    alert("Deleted Successfully")
  }
  console.log(from)
  return (
    <div>
        <Nav/>
        <h1 className='font-bold text-xl ml-10 mt-10'>Trader</h1>
        <div className='p-10 md:flex'>
            
                    <div  className=' md:flex-initial w-full'>
                    <h1 className='font-bold text-xl'>Trade Requests</h1>
                    {
                        to.length>0?(<></>):(<>  <h1 className='mt-4 font-light text-md'>No Requests Found</h1></>)
                    }

                    {
                to?.map((e)=>(
                   
                    <>
                    
                    <div key={e.id} className='mt-10 flex'>
                        <img style={{"borderRadius":"100%","width":"60px","height":"60px"}} src="https://picsum.photos/536/354" alt="" />
                        <p className='ml-4'><span className='font-bold'>{e.from}</span> wants to trade your item <span className='font-bold' >{e.itemName}</span></p>
                    </div>
                    {
                        e.status?(<>
                        <button class="mt-4 bg-transparent hover:bg-blue-500 text-white bg-black font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded">
                        ACCEPTED
                    </button>
                        </>):(<>
                            <div className='mt-4 flex'>
                    <button onClick={()=>{accept(e.id,e.yourID,e.otherID,e.itemName,e.item,e.to,e.from,e.yourPro,e.otherPro)}} class="bg-transparent hover:bg-blue-500 text-white bg-black font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded">
                        ACCEPT
                    </button>
    
                    <button onClick={()=>{decline(e.id)}} class="ml-4 bg-transparent hover:bg-blue-500 text-black font-semibold hover:text-white py-2 px-4 border border-gray-900 hover:border-transparent rounded">
                        DECLINE
                    </button>
                    </div>
                        </>)
                    }
                    
                    </>
                     ))
                    }
                   
                </div>
    
                

            <div className=' md:flex-initial w-full'>
                <h1 className='font-bold text-xl'>Trades Proposed</h1>
                {
                    from?.map((e)=>(
                        <>
                         <div key={e.id} className='mt-10 flex'>
                    <img style={{"borderRadius":"100%","width":"60px","height":"60px"}} src="https://picsum.photos/536/354" alt="" />
                    <p className='ml-4'>You Have proposed <span className='font-bold'>{e.to}</span> to trade his  <span className='font-bold' >{e.itemName}</span></p>
                </div>
                {
                    e.status?(<>
                    <div className='mt-4 flex'>
                <button onClick={()=>{cancel(e.id)}} class="bg-transparent hover:bg-blue-500 text-white bg-blue-800 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded">
                   Accepted
                </button>

              
                </div>
                    </>):(<>
                        <div className='mt-4 flex'>
                            {
                                e.declined?(<>
                                <button onClick={()=>{cancel(e.id)}} class="bg-transparent hover:bg-blue-500 text-white bg-red-800 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded">
                                Declined
                                </button>
                                </>):(<>
                                    <button onClick={()=>{cancel(e.id)}} class="bg-transparent hover:bg-blue-500 text-white bg-red-800 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded">
                                Cancel Request
                                </button>
                                </>)
                            }
                

              
                </div>
                    </>)
                }

                
                
                        </>
                    ))
                }
               
            </div>

        </div>
    </div>
  )
}

export default Trade