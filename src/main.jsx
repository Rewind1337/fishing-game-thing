//  import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import PageHome from './pages/home/PageHome.jsx'
import PageInventory from './pages/inventory/PageInventory.jsx';
import PagePets from './pages/pets/PagePets.jsx';

import PageFishingZone from './pages/fishing/PageFishingZone.jsx';
import PageGatheringZone from './pages/gathering/PageGatheringZone.jsx'
import PageAdventureZone from './pages/adventure/PageAdventureZone.jsx';

import PageQueen from './pages/queen/PageQueen.jsx';

import PageDebugStyles from './pages/PageDebugStyles.jsx';
import PageHelp from './pages/help/PageHelp.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
//  <React.StrictMode>
      <Router>
        <Routes>
          <Route index path='/home' element={<PageHome/>} />
          <Route path='/inventory' element={<PageInventory/>} />
          <Route path='/pets' element={<PagePets/>} />

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
