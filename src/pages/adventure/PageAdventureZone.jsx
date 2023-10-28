// Boiler (kinda)
import { useContext, useState, useRef } from 'react';
import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';
import PageCore from '../core/PageCore';
import PropTypes from 'prop-types';

// Components

// MUI
import Grid from '@mui/material/Unstable_Grid2';

// JS Utility
import format from '../../utility/utility';  // eslint-disable-line no-unused-vars
import resourceHook from '../../utility/resourceHook';  // eslint-disable-line no-unused-vars

import './Adventure.scss'

function PageAdventureZone() {

  const _context = useContext(SaveContext);
  _context; // to prevent the no-unused-vars, remove if actually used somewhere else

  function generate (minLength, maxLength, minWidth, maxWidth, nodeWeights) {
    let data = [];
    
    // generate nodes in layers
    let randomLength = minLength + ~~(Math.random() * ((maxLength + 1) - minLength))
    for (let lengthI = 0; lengthI < randomLength; lengthI++) {
      data.push([]);
      let randomWidth = minWidth + ~~(Math.random() * ((maxWidth + 1) - minWidth))

      for (let widthI = 0; widthI < randomWidth; widthI ++) {
        let randomNodeType = ~~(Math.random() * nodeWeights.length)
        let type = nodeWeights[randomNodeType].nodeType;
        let id = (lengthI+1) + "-" + (widthI+1);
      data[lengthI].push({id: id, type: type, connections: []});
      }
    }

    // generating start, boss and end nodes
    
    data.unshift([{id: "0-0", type: "start"}]);
    // data.push([{id: data.length + "-B", type: "boss"}]); This is where the boss would go or something
    data.push([{id: data.length + "-X", type: "end"}]);

    // go over data and make random connections
    for (let lengthI = 0; lengthI < data.length; lengthI++) {
      let currentSet = data[lengthI];
      if (lengthI + 1 > data.length) break;
      let nextSet = data[lengthI + 1];
      for (let widthI = 0; widthI < currentSet.length; widthI ++) {
        let currentNode = data[lengthI][widthI];
        nextSet; currentNode;
      }
    }

    // link up nodetypes to events, battles, etc. data.

    // some other steps probably

    return data;
  }

  // test generation
  const data = generate(15, 41, 1, 9, [
    {nodeType: 'random', weight: 1},
    {nodeType: 'event', weight: 1},
    {nodeType: 'resources', weight: 1},
    {nodeType: 'battle', weight: 1},
    {nodeType: 'miniboss', weight: 1},
  ])



  AdventureMapView.propTypes = {
    data: PropTypes.array.isRequired,
  };

  // test visualisation
  function AdventureMapView({ data }) {
  
    const [dragging, setDragging] = useState(false)
    const mapRef = useRef(null)
    const lastCursor = useRef({x: 0, y: 0})
    const currentCursor = useRef({x: 0, y: 0})

    const mouseClick = (e) => {
      console.log(mapRef.current);
      let element = e.target;
      let elementRect = element.getBoundingClientRect()
      let mapHeight = mapRef.current.getBoundingClientRect().height + 100;
      let mapWidth = mapRef.current.getBoundingClientRect().width;
      mapRef.current.scrollTo({ // very fucking whacky, supposed to scroll to center kinda
        top: mapRef.current.scrollTop + elementRect.top + (elementRect.height / 2) - mapHeight / 2,
        left: mapRef.current.scrollLeft + (elementRect.left - ((window.innerWidth * 0.70) + 100)) + (elementRect.width / 2) - mapWidth / 2,
        behavior: 'smooth'
      })
    }
  
    const mouseMove = (e) => {
      if (dragging) {
        currentCursor.current = {x: e.pageX, y: e.pageY};

        let dx = lastCursor.current.x - currentCursor.current.x
        let dy = lastCursor.current.y - currentCursor.current.y
        
        mapRef.current.scrollBy(dx * 1.2, dy * 1.2)
        lastCursor.current = {x: e.pageX, y: e.pageY};
      }
    }
  
    const mouseDown = (e) => {
      setDragging(true);
      currentCursor.current = {x: e.pageX, y: e.pageY};
      lastCursor.current = {x: e.pageX, y: e.pageY};
    }
  
    const mouseUp = () => {
      setDragging(false);
    }

    return (
    <div className='adventure-map' onMouseMove={mouseMove} onMouseDown={mouseDown} onMouseUp={mouseUp} ref={mapRef}>
      <div className='adventure-wrap'>
        {data.map((set, length) => {
          // console.log(set, length);
          return (
          <div key={'layer-' + length} className='adventure-layer'>
            {set.map((node, subKey) => {
              // console.log(node, subKey);
              return (
                <div key={'node-' + node.id + "-" + subKey} className={'adventure-node ' + node.type} onMouseUp={mouseClick}>
                  {node.id}
                </div>
              )
            })}
          </div>
          )
        })}
      </div>
    </div>
    );
  }

  return (
    <PageCore pageID={GLOBALS.ENUMS.PAGES.ADVENTURE} title="Adventure Zone" gridId="grid-adventure" contentClasses={'adventure'}>
      <Grid container mobile={12} flexGrow={1}spacing={0.5}>
        <Grid mobile={8}>
          
        </Grid>
        <Grid mobile={4} maxHeight={400} >
          <AdventureMapView data={data}/>
        </Grid>
      </Grid>
    </PageCore>
  )
}

export default PageAdventureZone;
