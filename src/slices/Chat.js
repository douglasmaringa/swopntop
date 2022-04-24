import { createSlice } from '@reduxjs/toolkit'
import { firestore } from 'firebase'
import { db} from "../base";
import firebase from 'firebase';


// Slice


const slice = createSlice({
  name: 'chatroom',
  initialState: {
    chatroom: false,
    loading:false,
    error:false
  },
  reducers: {
    chatSuccess: (state, action) => {
        state.loading = false;
      state.chatroom = true;
      },
     chatFailed: (state, action) => {
        state.error = true;
       
      },
      
      chatLoading: (state, action) => {
        state.loading = true;
       
      },
  },
});

export default slice.reducer

// Actions

const {chatLoading } = slice.actions

export const createChat = ({yourID,otherID,itemName,item,to,from,yourPro,otherPro,otherItem}) => async dispatch => {
   
    console.log(to,from,yourPro,otherPro)
    dispatch(chatLoading())

    db.collection('chatroom').add({
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        members:[to,from],
        messages:[{"sender":"","time":"","message":""}],
        lastmessage:"",
        final:false,
        itemName:itemName,
        itemID:item,
        yourPro:yourPro,
        otherPro:otherPro,
        otherItem:otherItem
    }).then(res=>{
      //adding the user into your friend list
      db.collection('users').doc(yourID).update({
       friends: firestore.FieldValue.arrayUnion(to)
      })
         //chatroom created
        //putting chat room id in current user user's object.
       db.collection('users').doc(yourID).update({
       chatroom: firestore.FieldValue.arrayUnion(res.id)
     })

     //putting chat room id in other users user's object
     //first we find the users object so we can get its id
    
          db.collection('users').doc(otherID).update({
            chatroom: firestore.FieldValue.arrayUnion(res.id),
            friends: firestore.FieldValue.arrayUnion(from)
          })

    
     
    //not neccessary for this but allows us to query the chatroom by id later on in chats page.
     db.collection('chatroom').doc(res.id).update({
      chatID: res.id
    })
     alert("chatroom id added to user object")
    
    })
}
