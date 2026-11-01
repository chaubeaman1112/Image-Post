const Imagekit= require('@imagekit/nodejs')

const imagekit = new Imagekit({
    privateKey: process.env.privatekey
})


async function uploadfile(buffer){
    // console.log(buffer)
   const result=await imagekit.files.upload({
               file:buffer.toString("base64"),
               fileName:"image.jpg"
   })

   return result;
}

module.exports= uploadfile ;