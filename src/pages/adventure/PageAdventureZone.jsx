import { useContext } from 'react';
import PropTypes from 'prop-types';

import SaveContext from '../../context/SaveContext';
import PageCore from '../core/PageCore';
import GridCell from '../../components/grid/GridCell';

import './Adventure.css'

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
  const data = generate(2, 5, 1, 3, [
    {nodeType: 'random', weight: 1},
    {nodeType: 'event', weight: 1},
    {nodeType: 'resources', weight: 1},
    {nodeType: 'battle', weight: 1},
    {nodeType: 'miniboss', weight: 1},
  ])

  AdventureMapView.propTypes = {
    data: PropTypes.object.isRequired,
  };

  // test visualisation
  function AdventureMapView({ data }) {
    return (
    <div className='adventure-map'>
      {data.map((set, length) => {
        console.log(set, length);
        return (
        <div key={'layer-' + length} className='adventure-layer'>
          {set.map((node, subKey) => {
            console.log(node, subKey);
            return (
              <div key={'node-' + node.id} className={'adventure-node ' + node.type}>
                {node.id}
              </div>
            )
          })}
        </div>
        )
      })}
    </div>
    );
  }

  return (
    <PageCore title="Adventure Zone" gridId="grid-adventure" contentClasses={'adventure'}>
      <GridCell gridPosition='top-left'></GridCell>
      <GridCell gridPosition='top-middle'></GridCell>
      <GridCell gridPosition='top-right'></GridCell>
      <GridCell gridPosition='right-side'>
        <AdventureMapView data={data}/>
      </GridCell>
      <GridCell gridPosition='center-left'></GridCell>
      <GridCell gridPosition='center-right'></GridCell>
      <GridCell gridPosition='bottom-row'></GridCell>
    </PageCore>
  )
}

export default PageAdventureZone;
