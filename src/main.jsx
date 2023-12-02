import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Layout from './pages/core/Layout.jsx';
import RouterWrapper from './RouterWrapper.jsx';

import PageSplash from './pages/splash/PageSplash.jsx'

import PageHome from './pages/home/PageHome.jsx'
import PageInventory from './pages/inventory/PageInventory.jsx';
import PagePets from './pages/pets/PagePets.jsx';

import PageFishingZone from './pages/fishing/PageFishingZone.jsx';
import PageGatheringZone from './pages/gathering/PageGatheringZone.jsx'
import PageAdventureZone from './pages/adventure/PageAdventureZone.jsx';

import PageTraders from './pages/traders/PageTraders.jsx';
import PageQueen from './pages/queen/PageQueen.jsx';

import PageHelp from './pages/help/PageHelp.jsx';

import './imports.scss'
import CssBaseline from '@mui/material/CssBaseline';

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterWrapper>
    <CssBaseline enableColorScheme />
    <Router>
      <Routes>
        <Route index path='/' element={<Layout sidebar={false}><PageSplash/></Layout>} />

        <Route path='/home' element={<Layout><PageHome/></Layout>} />
        <Route path='/inventory' element={<Layout><PageInventory/></Layout>} />
        <Route path='/pets' element={<Layout><PagePets/></Layout>} />

        <Route path='/fishing' element={<Layout><PageFishingZone/></Layout>} />
        <Route path='/gathering' element={<Layout><PageGatheringZone/></Layout>} />
        <Route path='/adventure' element={<Layout><PageAdventureZone/></Layout>} />
        
        <Route path='/traders' element={<Layout><PageTraders/></Layout>} />
        <Route path='/queen' element={<Layout><PageQueen/></Layout>} />

        <Route path='/help' element={<Layout><PageHelp/></Layout>} />
        <Route path='*' element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  </RouterWrapper>,
)
