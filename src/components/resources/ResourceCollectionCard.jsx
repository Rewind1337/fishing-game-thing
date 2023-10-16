import PropTypes from 'prop-types';
import ResourceCard from './ResourceCard';
import { useState } from 'react';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import './resource.scss';

ResourceCollectionCard.propTypes = {
  collection: PropTypes.array.isRequired,
  icon: PropTypes.object.isRequired,
  iconcolor: PropTypes.string,
  name: PropTypes.string,
};
  
function ResourceCollectionCard({collection = [], icon, iconcolor, name}) {
  
  const [collapsed, setCollapsed] = useState(false)

  let combinedTotal = 0
  for (let i = 0; i < collection.length; i++) {combinedTotal += collection[i].value;}

  const collectionHeader = (
    <div className='resource-collection-card-header' style={{textAlign: 'left', textIndent: '8px', display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={() => {setCollapsed(!collapsed)}}>
      {(collapsed ? <KeyboardArrowRightIcon/> : <KeyboardArrowDownIcon/>)}
      <ResourceCard paperBorder height={32} icon={icon} iconcolor={iconcolor} name={name} value={combinedTotal} cap={0} perSec={0}/>
    </div>
  )
  
  if (collapsed) {
    return (
      [collectionHeader]
    )
  } else {
    return (
      <>
        {collectionHeader}
        {collection.map(card => <ResourceCard key={card.name} icon={card.icon} iconcolor={card.iconcolor} name={card.name} value={card.value} cap={card.cap} perSec={card.perSec}/>)}
      </>
    )
  }
}

export default ResourceCollectionCard