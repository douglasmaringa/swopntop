import React,{useEffect,useState} from 'react'
import { useSelector} from 'react-redux'
import { db} from "../base";
import Nav from '../components/Nav'
import SideNav from '../components/SideNav'
import "./Profile.css"

function Profile() {
  const { user } = useSelector(state => state.user)
const[data,setData]=useState([])
const[name,setName]=useState("")
const[mobile,setMobile]=useState("")

  useEffect(() => {
    db.collection("users").where("email", "==", user.email)
    .onSnapshot((querySnapshot) => {
       
      setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
      if(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })).length>0){
        setName(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id }))[0].name)
        setMobile(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id }))[0].mobile)
      }
     
})
  }, [])
  console.log(data)
  
  return (
    <div>
        <Nav/>
        <div className='md:flex'>

        <div className='md:flex-none md:w-60'>
          <SideNav/>
        </div>

        <div className='md:flex-initial w-full '>
       
<div class="m-auto rounded-3xl overflow-hidden shadow-xl max-w-2xl my-3 bg-gray-800">
  	<img style={{"height":"260px"}} src={"https://i0.wp.com/www.zimshoppingmalls.com/directory/wp-content/uploads/sites/10/2019/05/ahmed-electronics-stationery-store-harare-zimbabwe-zimshoppingmalls.jpg?fit=800%2C448&ssl=1"} class="w-full" />
    <div class="flex justify-center -mt-8">
        <img style={{"borderRadius":"100%","height":"140px"}} width={140} src={data[0]?.image} class="rounded-full border-solid border-white border-2 -mt-3"/>		
    </div>
	<div class="text-center px-3 pb-6 pt-2">
		<h3 class="text-white text-sm bold font-sans">{data[0]?.name}</h3>
		<p class="mt-2 font-sans font-light text-white">Hello, i'm from {data[0]?.city}</p>
	</div>
  	<div class="flex justify-center pb-3 text-white">
      <div class="text-center mr-3 border-r pr-3">
        <h2>34</h2>
        <span>Trades</span>
      </div>
      <div class="text-center">
        <h2>42</h2>
        <span>Followers</span>
      </div>
  	</div>
</div>

<h1 className='text-center mb-10 font-bold text-lg mt-10'>Profile Information</h1>

<form class="w-full max-w-md mb-5 m-auto">
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Full Name
      </label>
    </div>
    <div class="md:w-2/3">
      <input value={name} onChange={(e)=>{setName(e.target.value)}} class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" />
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
       Mobile
      </label>
    </div>
    <div class="md:w-2/3">
      <input value={mobile} onChange={(e)=>{setMobile(e.target.value)}} class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" />
    </div>
  </div>
  
  <div class="md:flex md:items-center">
    <div class="md:w-1/3"></div>
    <div class="md:w-2/3">
      <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
        Save
      </button>
    </div>
  </div>
</form>
        </div>

        </div>
      
    </div>
  )
}

export default Profile