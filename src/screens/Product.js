import React, { useEffect,useState } from 'react'
import Nav from '../components/Nav'
import { useLocation,useNavigate} from 'react-router-dom';
import Map from '../components/Map';
import { useSelector} from 'react-redux'
import {db} from "../base"
import firebase from 'firebase';
import { render } from 'react-dom';
import ReactWhatsapp from 'react-whatsapp';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ButtonMailto from '../components/MailBtn';
import EmailIcon from '@mui/icons-material/Email';

function Product() {
    const {state} = useLocation();
    const { user } = useSelector(state => state.user)
    const[mine,setMine]=useState(false)
    const[userId,setUserId]=useState("")
    const[otherId,setOtherId]=useState("")
    const[userPro,setUserPro]=useState("")
    const[otherPro,setOtherPro]=useState("")
    const[products,setProducts]=useState([])
    const[selected,setSelected]=useState([])
    
 
    const navigate = useNavigate();

    useEffect(() => {
      if(user.email===state.email){
        setMine(true)
      }else{
        setMine(false)
      }
     
    }, [])

    useEffect(() => {
      db.collection("users").where("email","==",user.email).onSnapshot(querySnapshot=>{
        if(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })).length>0){
         setUserId(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id }))[0].id)
         setUserPro(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id }))[0].image)
      
        }
       })

       db.collection("users").where("email","==",state.email).onSnapshot(querySnapshot=>{
        if(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })).length>0){
         setOtherId(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id }))[0].id)
         setOtherPro(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id }))[0].image)
      
        }
       })

       db.collection("products").where("email","==",user.email).onSnapshot(querySnapshot=>{
       
         setProducts(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
       
       })
    }, [])
    
    console.log(selected)
    console.log("you",user.email,userId)
    console.log("other",state.email,otherId)

    const trade =()=>{
      db.collection("users").where("email", "==", user.email)
    .onSnapshot((querySnapshot) => {
       
      const res = querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id }))
      if(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })).length>0){
           if(res[0].friends.includes(state.email)){

            console.log(res)
            return alert("Already connected")
            
           }else{
           if(selected.length>0){
            db.collection('requests').add({
              timestamp:firebase.firestore.FieldValue.serverTimestamp(),
              from:user.email,
              to:state.email,
              yourID:userId,
              otherID:otherId,
              yourPro:userPro,
              otherPro:otherPro,
              users:[user.email,state.email],
              item:state.id,
              status:false,
              declined:false,
              itemName:state.name,
              otherItem:selected,
              })
              alert("sent")
            navigate("/trade")
           }else{
             alert("Select what you are trading in exchange")
           }
           }
      }
   })
      
    }

    const fav = ()=>{
      db.collection('favourite').add({
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        email:user.email,
        item:[{state}],
        })
        alert("added to favourites")
    }
    
  return (
    <div>
        <Nav/>
        <div className="bg-white">
      <div className="max-w-2xl mx-auto py-24 px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8 lg:grid-cols-2">
        
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
         {
             state.images.map((e)=>(
                 <>
                  <img
            src={e}
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            className="bg-gray-100 rounded-lg"
          />
                 </>
             ))
         }
         
        </div>

        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{state.name}</h2>
          <p className="mt-4 text-gray-500">
           {state.description}  </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-1 sm:gap-y-4 lg:gap-x-4">
           
           <div className='flex border-t border-gray-200 pt-4'>
               <div className="rounded-full flex">
                   <img style={{"borderRadius":"100%","height":"100px"}} width={90} height={120}  src={state.proPic} alt="" />
                   <h1 className='ml-5 mt-5'>{state.username}</h1>
               </div>
              <div key={state.name} className=" ml-auto ">
                <dt className="font-medium mt-5 text-gray-900"><button class="bg-blue-500 mt-2 w-44 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location = `mailto:${state.email}`}><EmailIcon/> Email Me</button></dt>
               
                     <button class="bg-green-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                       
                        <ReactWhatsapp number="1-212-736-5000" message="Hello World!!!">
                        <span className=''><WhatsAppIcon/></span>{state.mobile} 
                        </ReactWhatsapp>
                    </button>
                   
              </div>
              </div>

              <p className=" text-gray-500">
          {state.city}
          {
            state.latitude?(<>
             <Map lat={JSON.parse(state?.latitude)} long={JSON.parse(state?.longitude)}/>
             
            </>):(<></>)

        }
           </p>
           <div>
          
            {
              mine?(<>
              
              </>):(<>
                <button onClick={fav} class="bg-red-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Add To Favourite
            </button>
                <button onClick={trade} class="bg-blue-800 hover:bg-blue-700 ml-2 text-white font-bold py-2 px-4 rounded">
                       Trade Request
            </button>
             
            
           <select value={selected} onChange={(e)=>{setSelected(e.target.value)}} className="block appearance-none w-full mt-2 bg-gray-200 border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                          {
                            products?.length>0?(
                            <>
                            <option value="[-,-]">What are you trading in exchange?</option>
                            {products.map(profile => <option value={[profile.name,profile.id]}>Your {profile.name}</option>)}
                          
                            </>):(
                            <>
                              <option value="[-,-]">What are you trading in exchange?</option>
                              <option value="[cash,cash]">Cash</option>
                            </>)
                          }
            </select>
            </>)
            }
            </div>
          </dl>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Product