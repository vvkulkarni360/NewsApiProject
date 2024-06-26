import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App =()=> {
  const pageSize = 5;
  const apiKey=process.env.REACT_APP_NEWS_APIKEY

  const [progress, setProgress] = useState(0)

  const [passQuery, setPassQuery] = useState('')

  const handleSearchButtonClick = (query) => {
    setPassQuery(query)
  }

    return (
      <div>
        <Router>
          <Navbar onSearchButtonClick={handleSearchButtonClick} />
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" filterApply={passQuery} />}></Route>
            <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business" filterApply={passQuery}/>}></Route>
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment" filterApply={passQuery}/>} ></Route>
            <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" filterApply={passQuery}/>}></Route>
            <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health" filterApply={passQuery}/>}></Route>
            <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science" filterApply={passQuery}/>}></Route>
            <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports" filterApply={passQuery}/>}></Route>
            <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology" filterApply={passQuery}/>}></Route>
          </Routes>
        </Router>
      </div>
    )
  
}
export default App
// f1c2065075584e1eb1fa7f2ba040c3ab
