import React, { useState,useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Createpost = () => {
  const [caption, setcaption] = useState("")
  const [loading, setloading] = useState(false)

   const navigate= useNavigate()
  const submithandler=async (e)=>{
   e.preventDefault();

   const formData= new FormData(e.target)
   axios.post("https://image-post-5pff.onrender.com/create-post",formData)
   .then((res)=>{
    alert('Post Created Successfully')
   navigate('/myfeed')
   }
  )
  .catch((err)=>{
    console.log(err);
    alert('Error creating post')
  }
    )

  }
  const imageRef = useRef(null);
  const generatecaption= ()=>{
  
   const image = imageRef.current.files[0];
   if(!image){
    alert("Please select your Image");
    return;
   }
   
   const myformdata= new FormData()
   myformdata.append("images", image)
   myformdata.append("idea", caption)

   axios.post("https://image-post-5pff.onrender.com/generate-caption",myformdata)
   .then((res)=>{
    setcaption(res.data.caption)
   })
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full p-4 ">
      <form className="flex flex-col gap-2 justify-center items-center border-2 border-gray-400 p-4 rounded-xl bg-green-100 " onSubmit={submithandler}>
            <h1 className="text-[2em] text-black font-bold">Create Post</h1>
            <input type="file" name="images" accept="image/*"
            className="border border-gray-400 rounded-md p-2 mt-4 mb-4"
            ref={imageRef}
             />
            <input type="text" name="caption" placeholder="Enter Caption" value={caption}
            onChange={(e)=>setcaption(e.target.value)}
            required
            className="border border-gray-400 rounded-md p-2 mb-4 w-full"
             />
            <button type="submit" className="bg-green-500 w-fit py-2 px-3 text-gray-100 font-bold text-xl rounded-md active:scale-75 duration-300 transition-all ">Post</button>
            <button
  type="button"
  onClick={generatecaption}
  className="bg-red-600 text-white px-3 py-2 rounded-md active:scale-75 duration-300 transition-all"
>
  ✨ Generate AI Caption
</button>
      </form>
    </div>
  );
};

export default Createpost;
