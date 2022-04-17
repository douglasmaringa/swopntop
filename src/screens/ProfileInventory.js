import React,{useEffect,useState} from 'react'
import { useSelector} from 'react-redux'
import { db} from "../base";
import Nav from '../components/Nav'
import SideNav from '../components/SideNav'
import { useNavigate } from 'react-router-dom';

function ProfileInventory() {
    const { user } = useSelector(state => state.user)
const[data,setData]=useState([])
const navigate = useNavigate();

useEffect(() => {
    db.collection("products").where("email", "==", user.email)
    .onSnapshot((querySnapshot) => {
       
      setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
      
     
})
  }, [])
  console.log(data)

  const remove =(id)=>{
    db.collection('products').doc(id).delete()
    alert("Removed Successfully")
    navigate("/profileinventory")
  }
  return (
    <div>
        <Nav/>
        <div className='md:flex'>

        <div className='md:flex-none md:w-60'>
          <SideNav/>
        </div>

        <div className='md:flex-initial w-full '>
        <h1 className='ml-40 mt-4 mb-4 font-bold text-lg'>Inventory</h1>

      {
        data?.map((e)=>(
<div className='mt-4 mx-auto max-w-3xl flex p-10 border-2 border-gray-100'>
            <img style={{"height":"140px"}} src={e?.images[0]} alt="" />
          <div>
        <h1 className='ml-4 font-bold text-lg'>{e.name}</h1>
            <p className='ml-4'>{e.description}</p>
       </div>
      <button onClick={()=>{remove(e.id)}} class="bg-red-500 ml-4 mt-10  h-10 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
      Remove
     </button>
    </div>

        ))
      }
    

        </div>
        </div>
    </div>
  )
}

export default ProfileInventory