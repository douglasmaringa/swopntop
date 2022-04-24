import React,{useState,useEffect} from 'react'
import  "./Register.css"
import {useDispatch,useSelector} from 'react-redux'
import {register} from "../slices/User"
import { useNavigate } from 'react-router-dom';
import { storage } from "../base";
import Multiselect from 'multiselect-react-dropdown';
import ReactMapGL from "react-map-gl";


function Register() {
  const[step,setStep]=useState(1)
  const[loading,setLoading]=useState(false)
//first page
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[name,setName]=useState("")
  const[mobile,setMobile]=useState("")
  

  //second page
  const[image,setImage]=useState("")
  
 //third page
 const[lat,setLat]=useState("")
  const[long,setLong]=useState("")
  const[city,setCity]=useState("")

 //image state 
 const allInputs={imgUrl:''}
 const[imageAsFile,setImageAsFile]= useState("")
const[imageAsUrl,setImageAsUrl]= useState(allInputs)

 const navigate = useNavigate();
 const dispatch = useDispatch()
 const { user } = useSelector(state => state.user)

 //map state 
 const [viewport, setViewport] = React.useState({
  latitude:  -17.824858,
  longitude: 31.053028,
  zoom: 12,
  width:400,
  height:250
});


const map=(evt)=>{
  setLat(evt.lngLat[1]);
  setLong(evt.lngLat[0]);
}

console.log(lat,long)
 useEffect(() => {
   if(user){
    navigate("/home")
   }
 }, [user,navigate])
 
 //uploading image to firebase
 const handleImageAsFile=(e)=>{
  const image = e.target.files[0]
  setImageAsFile(imageFile=>(image))
  
}

const handleFireBaseUpload= (e)=>{
e.preventDefault()
  setLoading(true)
  console.log('start of upload')
  if(imageAsFile===''){
      console.error("not an image")
  }
  const uploadTask =storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
  uploadTask.on('state_changed',(snapShot)=>{
      console.log(snapShot)
  },(err)=>{
      console.log(err)
  },()=>{
      storage.ref('images').child(imageAsFile.name).getDownloadURL().then(firebaseUrl=>{
          
        setImageAsUrl(firebaseUrl)
        alert("image uploaded")
        setLoading(false)
        
      })
  })
}


  const next = (e)=>{
    e.preventDefault()
    if(step<3){
    setStep(step + 1)
    }else{
      console.log("its now 4")
      submit()
    }
  }
  const prev = (e)=>{
    e.preventDefault()
    if(step>1){
      setStep(step - 1)
      }else{
        console.log("its now 1")
        
      }
  }

  const submit =()=>{
    //console.log(name,email,password,gender,city,ethnicity,about,education,away,image,insurance,focus,online,person)
    dispatch(register({name:name,email:email,password:password,image:imageAsUrl,city:city,latitude:lat,longitude:long,mobile:mobile}))
  }

console.log(step)


  return (
    <div style={{"height":"100%"}} className="p-10 h-screen bg-green-200 ">
      <h1 className='cursor-pointer ml-4 hover:text-red-800 hover:text-xl' onClick={()=>{navigate("/login")}}>Already A Member Login</h1>
{(() => {
              if (step === 1){
                  return (
                    <form  className=" lg:mr-10 text-black  bg-white rounded-lg w-full mt-10 p-5  mx-auto md:mx-auto lg:mx-auto xlg:mx-auto 2xl:mx-auto max-w-6xl">
                      <div className='m-auto max-w-lg pt-10'>
                      <h1 className="text-sm font-extrabold">Step 1</h1>
            <div class="flex items-center md:w-36">
							<div class="w-full bg-green-600 rounded-full mr-2">
							<div class="rounded-full text-xs leading-none h-2 text-center text-white"></div>
							</div>
							<div class="text-xs w-10 text-gray-600" x-text="parseInt(step / 3 * 100) +'%'"></div>
						</div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 mt-4 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-first-name">
                          Full Name
                        </label>
                        <input value={name} onChange={(e)=>{setName(e.target.value)}} className="appearance-none block w-full bg-gray-200  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Name"/>
                       
                      </div>
                      <div className="w-full md:w-1/2 mt-4 px-3">
                        <label className="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-last-name">
                          Email
                        </label>
                        <input value={email} onChange={(e)=>{setEmail(e.target.value)}}  className="appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Enter your email"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-password">
                          Password
                        </label>
                        <input value={password} onChange={(e)=>{setPassword(e.target.value)}}  className="appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******"/>
                        <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                      </div>

                      <div className="w-full mt-4 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-first-name">
                          Mobile
                        </label>
                        <input value={mobile} onChange={(e)=>{setMobile(e.target.value)}} className="appearance-none block w-full bg-gray-200  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Mobile"/>
                       
                      </div>
                    </div>
                   
                    <div className="flex flex-wrap -mx-3 mb-2">
                      
                      
                      
                      <button onClick={prev}  className="bg-white border-green-600 border-2 text-black ml-4 rounded-3xl mt-10 hover:bg-red-700 hover:text-white font-bold py-2 px-4 ">
                        Previous
                      </button>
                     
                      <button onClick={next} className="bg-white border-green-600 border-2 text-black mr-2 mt-10 ml-auto hover:bg-green-900 hover:text-white font-bold py-2 px-4 rounded-3xl">
                        Next Step
                      </button>
                  
                  
                    </div>
                    </div>
                  </form>
                  
                  )
              }else if(step ===2){
                return (
                  <form style={{"height":"80%"}} className="py-20 text-black bg-white rounded-lg w-full mt-20 p-5 m-auto md:mx-auto lg:mx-auto xlg:mx-auto 2xl:mx-auto max-w-6xl">
                    <div className='m-auto max-w-lg'>
                  <div className="flex flex-wrap mb-6">
                    <div className="w-full  mb-6 md:mb-0">

                  <h1 className="text-sm font-extrabold">Step 2</h1>
            <div class="flex items-center md:w-60">
							<div class="w-full bg-green-600 rounded-full mr-2">
							<div class="rounded-full  text-xs leading-none h-2 text-center text-white"></div>
							</div>
							<div class="text-xs w-10 text-gray-600" x-text="parseInt(step / 3 * 100) +'%'"></div>
						</div>

                     
                    </div>
                   
                  </div>
                 
                  <div className="flex flex-wrap mb-2">
                  <div class="">
                            <label for="exampleInputName1" class="text-dark">Upload Image</label>
                            {
                                loading?(<>
                                <br/>
                                <h1 className='text-red-600'>loading....</h1>
                                </>):(<>
                                  {
                      imageAsUrl?(<>
                      <img width={100}  className="rounded-full" src={imageAsUrl} alt="" />
                      </>):(<></>)
                    }
                    <br/> 
                                </>)
                            }
                            <input type="file" onChange={handleImageAsFile} placeholder="upload image" class="form-control" id="exampleInputName1" aria-describedby="nameHelp" />
                            <button onClick={handleFireBaseUpload} className="bg-white border-green-600 border-2 h-10 text-black rounded-3xl hover:bg-red-700 hover:text-white font-bold py-2 px-4 ">
                     Upload
                    </button>

                    
                        </div>
                   
                       
                
                    <button onClick={prev} className="bg-white border-green-600 border-2 text-black  rounded-3xl mt-10 hover:bg-red-700 hover:text-white font-bold py-2 px-4 ">
                      Previous
                    </button>
                   
                    <button onClick={next} className="bg-white border-green-600 border-2 text-black mr-2 lg:mt-10 ml-56 hover:bg-green-900 hover:text-white font-bold py-2 px-4 rounded-3xl">
                      Next Step
                    </button>
                
                
                  </div>
                  </div>
                </form>
                
              )

              }else if(step ===3){
                return (
                  <form style={{"height":"80%"}} className=" text-black bg-white rounded-lg w-full mt-20 p-5 m-auto md:mx-auto lg:mx-auto xlg:mx-auto 2xl:mx-auto max-w-6xl">
   <div className='m-auto max-w-3xl'>
  <h1 className="text-sm  font-extrabold">Step 3</h1>
            <div class="flex items-center md:w-100">
							<div class="w-full bg-green-600 rounded-full mr-2">
							<div class="rounded-full  text-xs leading-none h-2 text-center text-white"></div>
							</div>
							<div class="text-xs w-10 text-gray-600" x-text="parseInt(step / 3 * 100) +'%'"></div>
						</div>
 
  
  
  <div className=" flex-wrap  mb-2">
    <div className='lg:flex mt-6'>
      <div>
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={"pk.eyJ1IjoiZG91Z2xhc21hcmluZ2EiLCJhIjoiY2twYzZid2kzMWF1eDJ1cDc1dmo0NmswdCJ9.AWID9iqWzNnDlKJI-vH90Q"}
     
      onViewportChange={(viewport) => setViewport(viewport)}
      onClick={map}
      
      >
      </ReactMapGL>
      </div>
      <div className='ml-2'>
      <div className="w-full  mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-city">
     City
      </label>
      <input value={city} onChange={(e)=>{setCity(e.target.value)}}  className="appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder=""/> </div>
   
      <div className="w-full  mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-city">
     Latitude
      </label>
      <input value={lat} onChange={(e)=>{setLat(e.target.value)}}  className="appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder=""/></div>

    <div className="w-full  mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-city">
    Longitute
      </label>
      <input value={long} onChange={(e)=>{setLong(e.target.value)}}  className="appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder=""/> </div>
      </div>
      </div>
    
    
   
    <button onClick={prev} className="bg-white border-green-600 border-2 text-black ml-4 rounded-3xl mt-10 hover:bg-red-700 hover:text-white font-bold py-2 px-4 ">
      Previous
    </button>
   
    <button onClick={next} className="bg-white border-green-600 border-2 text-black mr-2 mt-10 ml-40 hover:bg-green-900 hover:text-white font-bold py-2 px-4 rounded-3xl">
      Next Step
    </button>


  </div>
  </div>
</form>

              )

              }
              
              return null;
            })()}

      

    </div>
  )
}

export default Register