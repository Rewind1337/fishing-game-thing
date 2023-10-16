// Boiler (kinda)
import { useContext, useState, useEffect, useRef } from 'react';  // eslint-disable-line no-unused-vars
import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';  // eslint-disable-line no-unused-vars
import PageCore from '../core/PageCore';
import PropTypes from 'prop-types';

// Components
import FlexList from '../../components/flexlist/FlexList';
import GridCell from '../../components/grid/GridCell';
import ActionButton from '../../components/ActionButton';  // eslint-disable-line no-unused-vars
import CircularProgressWithLabel from '../../components/progress/CircularProgressbarWithLabel';
import ResourceCard from '../../components/resources/ResourceCard';
import MilestoneCard from './MilestoneCard';
import SacrificeModal from '../../components/modal/SacrificeModal';

// MUI
import { Paper } from '@mui/material';

// Icons / SVG
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFish, faWorm, faHurricane } from '@fortawesome/free-solid-svg-icons';

// JS Utility
import format from '../../utility/utility';  // eslint-disable-line no-unused-vars

// CSS Styles
import './Queen.scss'

// Route: "/queen"
function PageQueen() {

  const _context = useContext(SaveContext);
  _context; // to prevent the no-unused-vars, remove if actually used somewhere else

  const [fish, setFish] = useState(_context.save.resources.fish || 0);
  const [worms, setWorms] = useState(_context.save.resources.worms || 0);

  const [pickerModalOpen, setPickerModalOpen] = useState(false);
  const pickerOptions = [
    {icon: <FontAwesomeIcon icon={faFish}/>, itemID: "fish"},
    {icon: <FontAwesomeIcon icon={faFish}/>, itemID: "fish"},
  ];

  const handlePickerOpen = () => {
    setPickerModalOpen(true);
  };

  const handlePickerClose = (value, reason) => {
    if (reason && reason == "backdropClick" || reason == 'escapeKeyDown' || value == 'close') {
      setPickerModalOpen(false);
      return;
    }

    sacrificeToQueen(value);
  };

  const sacrificeToQueen = (input) => {
    switch (input.value) {
      case pickerOptions[0].itemID:
        gainBonus(input.amount);
      break;
      default:
      break;
    }
  }

  const gainBonus = (amount) => {
    if (fish >= amount) {
      setFish(fish - 1*amount);
      setWorms(worms + 3*amount);
      alert("Yum!");
    }
  };

  useEffect(() => {
    _context.setSave({resources: {worms: worms, fish: fish}});
  }, [fish, worms]) // eslint-disable-line react-hooks/exhaustive-deps




  
  function Unicode({c, iconscale = 1, color = 'white', style}) {
    return (
      <div className="unicode aspect-card-icon " style={style}>
        <div className="character" style={{filter: 'drop-shadow(0 0 4px)', scale: (iconscale), color: color}}>
          {c}
        </div>
      </div>
    )
  }

  Unicode.propTypes = {
    c: PropTypes.string.isRequired,
    iconscale: PropTypes.string,
    color: PropTypes.string,
    style: PropTypes.object,
  };

  function AspectCard({c, name, iconscale = 1, color = 'white', amount}) {
    return (
      <Paper title={name} className='aspect-card' elevation={1} sx={{border: '1px solid rgba(255, 255, 255, 0.5)', borderLeft: '0', backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: '4px', display: 'flex', alignItems: 'center'}}>
        <Unicode c={c} color={color} iconscale={iconscale} style={{border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '4px'}}/>
        <div className='aspect-card-amount' style={{width: '100px'}}>{amount}</div>
        <div className='aspect-card-effect' style={{width: 'auto', borderLeft: '1px solid rgba(255, 255, 255, 0.5)', flexGrow: '1'}}>effect maybe?</div>
      </Paper>
    )
  }

  AspectCard.propTypes = {
    c: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    iconscale: PropTypes.string,
    color: PropTypes.string,
    amount: PropTypes.number.isRequired,
  };

  return (
    <PageCore title="Queen of Worms" gridId="grid-queen" contentClasses={'queen'}>

      <SacrificeModal options={pickerOptions} header="Sacrifice Fish Picker" open={pickerModalOpen} onClose={handlePickerClose}/>

      <GridCell gridPosition='top-left'>
        <FlexList headerElement={<h4>{"Resources"}</h4>} mode="list" maxHeight={200}>
          <ResourceCard icon={<FontAwesomeIcon icon={faWorm} />} iconcolor="hsl(300deg, 100%, 90%)" name="Worms" value={worms} cap={0} perSec={0}></ResourceCard>
          <ResourceCard icon={<FontAwesomeIcon icon={faFish} />} iconcolor="hsl(235deg, 100%, 90%)" name="Fish" value={fish} cap={0} perSec={0}></ResourceCard>
        </FlexList>
      </GridCell>
      <GridCell gridPosition='top-middle'>
        <FlexList headerElement={<h4>{"Aspects"}</h4>} mode='flex' maxHeight={200}>
          <AspectCard c="🜁" name="Air" color='hsl(60deg, 100%, 90%)' amount={999999}/>
          <AspectCard c="🜂" name="Fire" color='hsl(0deg, 100%, 85%)' amount={0}/>
          <AspectCard c="🜄" name="Earth" color='hsl(30deg, 60%, 66%)' amount={0}/>
          <AspectCard c="🜃" name="Water" color='hsl(240deg, 100%, 90%)' amount={0}/>
          <AspectCard c="🜚" name="Gold" color='hsl(45deg, 100%, 66%)' amount={0} iconscale={"1.1"}/>
          <AspectCard c="🜛" name="Silver" color='hsl(0deg, 5%, 98%)' amount={0} iconscale={"1.25"}/>
          <AspectCard c="🝣" name="Purify" color='hsl(120deg, 100%, 90%)' amount={0}/>
          <AspectCard c="🜲" name="Regulus" color='hsl(290deg, 100%, 90%)' amount={0}/>
          <AspectCard c="🜳" name="Regulus-2" color='hsl(0deg, 100%, 100%)' amount={0}/>
          <AspectCard c="🜏" name="Brimstone" color='hsl(0deg, 100%, 40%)' amount={0} iconscale={"1.25"}/>
          <AspectCard c="🝈" name="Tincture" color='hsl(270deg, 100%, 60%)' amount={0} iconscale={"1.15"}/>
          <AspectCard c="🝒" name="Starred Trident" color='hsl(190deg, 100%, 40%)' amount={0}/>
        </FlexList>
      </GridCell>
      <GridCell gridPosition='top-right'></GridCell>
      <GridCell gridPosition='center' flexDirection='row'>
        <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.0)', width: '100%', padding: '4px 16px'}}>
          <h2>Milestone Progress</h2>
          <CircularProgressWithLabel textsize='33px' icon={<FontAwesomeIcon icon={faHurricane} />} iconscale='1.66' iconcolor="hsl(0deg, 100%, 85%)" sx={{padding: "5px"}} color="queen" size={200} thickness={8} variant="determinate" value={12} />
          <div className='action-button-container' style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
            <ActionButton disabled={(fish >= 1 ? false : true)} color="queen" variant="contained" text={(fish >= 1 ? "Sacrifice a Fish" : "Disappointing")} func={handlePickerOpen}></ActionButton>
          </div>
        </Paper>
      </GridCell>
      <GridCell gridPosition='bottom-left'>
        <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.0)', width: '100%'}}>
          <FlexList headerElement={<h2>{"All Milestones"}</h2>} mode='list' >
            <MilestoneCard completed id={0} wormsRequired={25} bonus='wow you did it'/>
            <MilestoneCard id={1} wormsRequired={125} bonus='wow you did it'/>
            <MilestoneCard id={2} wormsRequired={500} bonus='wow you did it'/>
            <MilestoneCard id={3} wormsRequired={1000} bonus='wow you did it'/>
            <MilestoneCard id={4} wormsRequired={2500} bonus='wow you did it'/>
            <MilestoneCard id={5} wormsRequired={5000} bonus='wow you did it'/>
            <MilestoneCard id={6} wormsRequired={10000} bonus='wow you did it'/>
            <MilestoneCard id={7} wormsRequired={22500} bonus='wow you did it'/>
            <MilestoneCard id={8} wormsRequired={50000} bonus='wow you did it'/>
            <MilestoneCard id={9} wormsRequired={100000} bonus='wow you did it'/>
            <MilestoneCard id={10} wormsRequired={250000} bonus='wow you did it'/>
            <MilestoneCard id={11} wormsRequired={500000} bonus='wow you did it'/>
            <MilestoneCard id={12} wormsRequired={1000000} bonus='wow you did it'/>
            <MilestoneCard id={13} wormsRequired={2500000} bonus='wow you did it'/>
          </FlexList>
        </Paper>
      </GridCell>
      <GridCell gridPosition='bottom-right'></GridCell>
    </PageCore>
  )
}

export default PageQueen;
