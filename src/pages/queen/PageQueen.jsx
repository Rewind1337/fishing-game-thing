// Boiler (kinda)
import { useContext, useState, useEffect, useRef } from 'react';  // eslint-disable-line no-unused-vars
import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';  // eslint-disable-line no-unused-vars
import PageCore from '../core/PageCore';

// Components
import FlexList from '../../components/flexlist/FlexList';
import GridCell from '../../components/grid/GridCell';
import ActionButton from '../../components/ActionButton';  // eslint-disable-line no-unused-vars
import CircularProgressWithLabel from '../../components/progress/CircularProgressbarWithLabel';
import ResourceCard from '../../components/ResourceCard';
import MilestoneCard from './MilestoneCard';
import PickerModal from './PickerModal';

// MUI
import { Paper } from '@mui/material';

// Icons / SVG
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFish, faWorm, faHurricane } from '@fortawesome/free-solid-svg-icons';

// JS Utility
import format from '../../utility/utility';

// CSS Styles
import './Queen.css'

// Route: "/queen"
function PageQueen() {

  const _context = useContext(SaveContext);
  _context; // to prevent the no-unused-vars, remove if actually used somewhere else

  const [fish, setFish] = useState(_context.save.resources.fish || 0);
  const [worms, setWorms] = useState(_context.save.resources.worms || 0);

  const [pickerModalOpen, setPickerModalOpen] = useState(false);
  const pickerOptions = ["fish", "test2", "test3", "test4", "test5", "test6"];

  const handlePickerOpen = () => {
    setPickerModalOpen(true);
  };

  const handlePickerClose = (value, reason) => {
    if (reason && reason == "backdropClick" || reason == 'backdropClick') 
        setPickerModalOpen(false);

    sacrificeToQueen(value);
  };

  const sacrificeToQueen = (input) => {
    switch (input.value) {
      case "fish":
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fish, worms])

  return (
    <PageCore title="Queen of Worms" gridId="grid-queen" contentClasses={'queen'}>
      <PickerModal options={pickerOptions} header="Sacrifice Fish Picker" open={pickerModalOpen} onClose={handlePickerClose}/>

      <GridCell gridPosition='top-left'>
        <FlexList headerElement={<h4>{"Resources"}</h4>} mode="list" minHeight={128} maxHeight={192}>
          <ResourceCard icon={<FontAwesomeIcon icon={faWorm} />} iconColor="hsl(300deg, 100%, 90%)" name="Worms" value={worms} cap={0} perSec={0}></ResourceCard>
          <ResourceCard icon={<FontAwesomeIcon icon={faFish} />} iconColor="hsl(235deg, 100%, 90%)" name="Fish" value={fish} cap={0} perSec={0}></ResourceCard>
        </FlexList>
      </GridCell>
      <GridCell gridPosition='top-middle'></GridCell>
      <GridCell gridPosition='top-right'></GridCell>
      <GridCell gridPosition='center' flexDirection='row'>
        <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.0)', width: '100%', padding: '4px 16px'}}>
          <h2>Milestone Progress</h2>
          <CircularProgressWithLabel textSize='26px' icon={<FontAwesomeIcon icon={faHurricane} />} iconScale='1.66' iconColor="hsl(0deg, 100%, 85%)" sx={{padding: "5px"}} color="queen" size={200} thickness={8} variant="determinate" value={12} />
          <div className='action-button-container' style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
            <ActionButton disabled={(fish >= 1 ? false : true)} color="queen" variant="contained" text={(fish >= 1 ? "Sacrifice a Fish" : "Disappointing")} func={handlePickerOpen}></ActionButton>
          </div>
        </Paper>
      </GridCell>
      <GridCell gridPosition='bottom-left'>
        <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.0)', width: '100%'}}>
          <FlexList headerElement={<h2>{"All Milestones"}</h2>} mode='list' >
            <MilestoneCard completed id={0} wormsRequired={format(25)} bonus='wow you did it'/>
            <MilestoneCard id={1} wormsRequired={format(125)} bonus='wow you did it'/>
            <MilestoneCard id={2} wormsRequired={format(500)} bonus='wow you did it'/>
            <MilestoneCard id={3} wormsRequired={format(1000)} bonus='wow you did it'/>
            <MilestoneCard id={4} wormsRequired={format(2500)} bonus='wow you did it'/>
            <MilestoneCard id={5} wormsRequired={format(5000)} bonus='wow you did it'/>
            <MilestoneCard id={6} wormsRequired={format(10000)} bonus='wow you did it'/>
            <MilestoneCard id={7} wormsRequired={format(22500)} bonus='wow you did it'/>
            <MilestoneCard id={8} wormsRequired={format(50000)} bonus='wow you did it'/>
            <MilestoneCard id={9} wormsRequired={format(100000)} bonus='wow you did it'/>
            <MilestoneCard id={10} wormsRequired={format(250000)} bonus='wow you did it'/>
            <MilestoneCard id={11} wormsRequired={format(500000)} bonus='wow you did it'/>
            <MilestoneCard id={12} wormsRequired={format(1000000)} bonus='wow you did it'/>
            <MilestoneCard id={13} wormsRequired={format(2500000)} bonus='wow you did it'/>
          </FlexList>
        </Paper>
      </GridCell>
      <GridCell gridPosition='bottom-right'></GridCell>
    </PageCore>
  )
}

export default PageQueen;
