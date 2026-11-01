import React from 'react'
import Createpost from './components/Createpost'
import FeedPost from './components/FeedPost'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className='bg-blue-200 h-full w-full'>
  <Router>
    <Routes>
      <Route path='/' element={<Createpost/>}/>
      <Route path='/myfeed' element={<FeedPost/>}/>
    </Routes>
  </Router>
      
    </div>
  )
}

export default App