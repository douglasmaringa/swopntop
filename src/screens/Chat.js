import React,{useEffect,useState} from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import {useSelector} from 'react-redux'
import ChatUi from '../components/ChatUi';
import {db} from "../base"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function Chat() {
    const {state} = useLocation();
    const navigate = useNavigate();
    const[data,setData]=useState([])
    const[other,setOther]=useState("")
    const[you,setYou]=useState("")

    const { user } = useSelector(state => state.user)

    console.log(state)

    useEffect(() => {
        if(state.members[0]===user.email){
            setYou(state.members[0])
            setOther(state.members[1])
        }else{
            setYou(state.members[1])
            setOther(state.members[0])
        }
        db.collection("chatroom").where("chatID", "==", state.id)
          .onSnapshot((querySnapshot) => {
             //sending a message to the chat room 
       
            setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
             
      })
    }, [user,state])
    
console.log(data)
  return (
    <div>
      <Nav/>  
      <h1 className='ml-4 text-lg cursor-pointer' onClick={()=>{navigate("/connections")}}><KeyboardBackspaceIcon/></h1>
   <ChatUi user={user} id={state.id} you={you} other={other} members={data[0]?.members[0]} otherPro={data[0]?.otherPro} yourPro={data[0]?.yourPro}  messages={ data[0]?.messages} final={data[0]?.final} itemID={data[0]?.itemID} itemName={data[0]?.itemName} otherItem={data[0]?.otherItem}/>
    </div>
  )
}