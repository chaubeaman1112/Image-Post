
const myserver= require('./src/app')
const mydatabase= require('./src/db/db')

mydatabase();

myserver.listen(3000,()=>{
    console.log("Server is running on the port 3000")
})