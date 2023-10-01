//  import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from './App.jsx'
import PageHome from './pages/PageHome.jsx'
import PageFishingZone from './pages/PageFishingZone.jsx';
import PageGatheringZone from './pages/PageGatheringZone.jsx'
import PageAdventureZone from './pages/PageAdventureZone.jsx';
import PageQueen from './pages/PageQueen.jsx';
import PageDebugStyles from './pages/PageDebugStyles.jsx';
import PageHelp from './pages/PageHelp.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
//  <React.StrictMode>
      <Router>
        <Routes>
          <Route index element={<App/>} />
          <Route path='/home' element={<PageHome/>} />
          <Route path='/fishing' element={<PageFishingZone/>} />
          <Route path='/gathering' element={<PageGatheringZone/>} />
          <Route path='/adventure' element={<PageAdventureZone/>} />
          <Route path='/queen' element={<PageQueen/>} />

          <Route path='/help' element={<PageHelp/>} />
          <Route path='/debugstyles' element={<PageDebugStyles/>} />
          <Route path='*' element={<Navigate to="/home" />} />
        </Routes>
      </Router>
//  </React.StrictMode>,
)
