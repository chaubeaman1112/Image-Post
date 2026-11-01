import React from "react";
import { useState,useEffect } from "react";
import axios from 'axios'


const FeedPost = () => {
  const [post, setpost] = useState([
  
  ]);

  useEffect(() => {
    axios.get('https://image-post-gp45.onrender.com/posts')
    .then((res)=>{
      setpost(res.data.post)
    })
  
    
  }, [])
  
  return (
    <div className="scrollbar">
      <h3 className=" max-w-[600px] mx-auto  text-2xl font-bold sticky top-0 mb-1 bg-blue-500  p-3 ">
        My Posts
      </h3>
      <div className="flex flex-col justify-center gap-1">
        {post.length > 0 ? (
          post.map((e) => {
            return (
              <div
                key={e.id}
                className="h-[250px] w-[300px] mx-auto bg-blue-300 rounded-md flex flex-col p-2 mb-2"
              >
                <img src={e.images} className="h-[90%] w-full rounded-md" />
                <p className="text-[19px]">{e.caption}</p>
              </div>
            );
          })
        ) : (
          <h1>No Posts Available</h1>
        )}
      </div>
    </div>
  );
};

export default FeedPost;
