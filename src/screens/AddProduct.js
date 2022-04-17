import React, { useState, useEffect } from "react";
import Nav from '../components/Nav'
import { Grid, Box } from "@mui/material";

import ImagesDropzone from "../components/imagesDropzone";
import ImageElement from "../components/imageElement";

import firebase from "firebase"
import { db} from "../base";
import {useDispatch,useSelector} from 'react-redux'

function AddProduct() {
    const [imageList, setImageList] = useState([]);
    const [imageList2, setImageList2] = useState([]);
    const[data,setData]=useState([])
    const[nun,setNun]=useState(false)

    const[name,setName]=useState("")
    const[model,setModel]=useState("")
    const[desc,setDesc]=useState("")
    const[category,setCategory]=useState("")

    const changeImageField = (index, parameter, value) => {
      
       const newArray = [...imageList];
       newArray[index][parameter] = value;
       setImageList(newArray);
    };
 
    const handleChangeOrderUp = (index) => {
       // If first, ignore
       if (index !== 0) {
          const newArray = [...imageList];
          const intermediate = newArray[index - 1];
          newArray[index - 1] = newArray[index];
          newArray[index] = intermediate;
          setImageList(newArray);
       }
    };
 
    const handleChangeOrderDown = (index) => {
       // If last, ignore
       if (index < imageList.length - 1) {
          const newArray = [...imageList];
          const intermediate = newArray[index + 1];
          newArray[index + 1] = newArray[index];
          newArray[index] = intermediate;
          setImageList(newArray);
       }
    };
 
    const handleDeleteImage = (index) => {
       imageList[index].storageRef
          .delete()
          .then(() => {
             const newArray = [...imageList];
             newArray.splice(index, 1);
             setImageList(newArray);
          })
          .catch((error) => {
             console.log("Error deleting file:", error);
          });
    };
 
    useEffect(() => {
       imageList.forEach((image, index) => {
          if (image.status === "FINISH" || image.status === "UPLOADING") return;
          changeImageField(index, "status", "UPLOADING");
          const uploadTask = image.storageRef.put(image.file);
          uploadTask.on(
             "state_changed",
             null,
             function error(err) {
                console.log("Error Image Upload:", err);
             },
             async function complete() {
                const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                changeImageField(index, "downloadURL", downloadURL);
                
                changeImageField(index, "status", "FINISH");
                
             }
          );
       });
    });
    const { user } = useSelector(state => state.user)
    useEffect(() => {
        if(user){
            db.collection("users").where("email","==",user.email).onSnapshot(querySnapshot=>{
                if(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })).length>0){
                setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
                }else{
                 setNun(true)
                }
              })
        }
      }, [user])
 
    const add =(e)=>{
        e.preventDefault()
                var res2 = []
                const res = imageList.map((e)=>{
                    return res2.push(e.downloadURL)
                })
               
        if(nun){
        db.collection('products').add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            email:user.email,
            name:"",
            model:"",
            description:"",
            category:"",
            images:res2,
            city:"harare",
            longitude:"31.053028",
            latitude:"-17.824858",
            mobile:"+263774849049", 
           })
           alert("saved")
        }else{
            db.collection('products').add({
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                email:user.email,
                name:name,
                model:model,
                description:desc,
                category:category,
                images:res2,
                city:data[0].city,
                longitude:data[0].longitude,
                latitude:data[0].latitude,
                mobile:"+263774849049", 
                proPic:data[0].image,
                username:data[0].name,
               })
               alert("saved")
        }
    }

       



  return (
    <div className='flex-col'>
        <Nav/>
       <div className='m-auto p-10 mb-4 rounded-lg border-2 border-gray-400 max-w-3xl mt-5'>
       <form>
  <div class="relative z-0 mb-6 w-full group">
      <input value={name} onChange={(e)=>{setName(e.target.value)}} type="name" name="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_email" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
  </div>
  
  
  <div class="grid xl:grid-cols-2 xl:gap-6">
    <div class="relative z-0 mb-6 w-full group">
        <input value={model} onChange={(e)=>{setModel(e.target.value)}} type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_first_name" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Model</label>
    </div>
    <div class="relative z-0 mb-6 w-full group">
        <textarea value={desc} onChange={(e)=>{setDesc(e.target.value)}} type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_last_name" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Descrption</label>
    </div>
  </div>
  <div class="grid xl:grid-cols-2 xl:gap-6">
   
    <div class="relative z-0 mb-6 w-full group">
    <select value={category} onChange={(e)=>{setCategory(e.target.value)}} className="block appearance-none w-full  py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            <option>Laptops</option>
                            <option>Smart Phones</option>
                            <option>Cars</option>
                            <option>Appliances</option>
                            <option>Kitchen Wear</option>
                            <option>Clothes</option>
                          </select> <label for="floating_company" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category</label>
    </div>
  </div>

  <Grid container direction="column" alignItems="center" spacing={2}>
         <Box border={1} margin={4} padding={3}>
            <Grid
               item
               container
               direction="column"
               alignItems="center"
               xs={12}
               spacing={1}
            >
               <Grid item container xs={12} justify="center">
                  <ImagesDropzone setImageList={setImageList} />
               </Grid>
            </Grid>
         </Box>
         {imageList.length > 0 && (
            <Box bgcolor="primary.light" p={4}>
               {imageList.map((image, index) => {
                  return (
                     <Grid item key={image.file.size + index}>
                        <ImageElement
                           image={image}
                           index={index}
                           isFirstElement={index === 0}
                           isLastElement={index === imageList.length - 1}
                           handleChangeOrderUp={handleChangeOrderUp}
                           handleChangeOrderDown={handleChangeOrderDown}
                           handleDeleteImage={handleDeleteImage}
                           changeImageField={changeImageField}
                        />
                     </Grid>
                  );
               })}
            </Box>
         )}
      </Grid>


  <button onClick={add} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
       </div>

      

    </div>
  )
}

export default AddProduct