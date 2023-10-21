// Boiler (kinda)
import { useContext, useState, useEffect, useRef } from 'react';  // eslint-disable-line no-unused-vars
import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';
import PageCore from '../core/PageCore';

// Components
import FlexList from '../../components/flexlist/FlexList';
import ActionButton from '../../components/ActionButton';  // eslint-disable-line no-unused-vars
import CircularProgressWithLabel from '../../components/progress/CircularProgressbarWithLabel';
import ResourceCard from '../../components/resources/ResourceCard';
import MilestoneCard from './MilestoneCard';
import SacrificeModal from '../../components/modal/SacrificeModal';

// MUI
import { Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

// Icons / SVG
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFish, faWorm, faHurricane } from '@fortawesome/free-solid-svg-icons';

// JS Utility
import format from '../../utility/utility';  // eslint-disable-line no-unused-vars
import resourceHook from '../../utility/resourceHook';  // eslint-disable-line no-unused-vars

// CSS Styles
import './Queen.scss'
import AspectCard from './AspectCard';

// Route: "/queen"
function PageQueen() {

  const _context = useContext(SaveContext);
  _context; // to prevent the no-unused-vars, remove if actually used somewhere else

  const [resources, setResources] = useState(resourceHook(_context))

  const [pickerModalOpen, setPickerModalOpen] = useState(false);
  const pickerOptions = [
    {icon: <FontAwesomeIcon icon={faFish}/>, itemID: "fish"},
    {icon: <FontAwesomeIcon icon={faFish}/>, itemID: "fish"},
  ];

  const handlePickerOpen = () => {
    setPickerModalOpen(true);
  };

  const handlePickerClose = (value, reason) => {
    if (reason && reason == "backdropClick" || reason == 'escapeKeyDown' || value.value == 'close') {
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
    if (resources.fish >= amount) {
      setResources(r => ({...r, fish: r.fish - (1 * amount), worms: r.worms - (1 * amount)}));
      alert("Yum!");
    }
  };

  useEffect(() => {
    _context.setSave({resources: {...resources}});
  }, [resources]) // eslint-disable-line react-hooks/exhaustive-deps



  return (
    <PageCore pageID={GLOBALS.ENUMS.PAGES.QUEEN} title="Queen of Worms" gridId="grid-queen" contentClasses={'queen'}>

      <SacrificeModal options={pickerOptions} header="Sacrifice Fish Picker" open={pickerModalOpen} onClose={handlePickerClose}/>

      <Grid container xs={12} flexGrow={1}spacing={0.5}>
        <Grid xs={2} maxHeight={400} overflow={"auto"}>
          <FlexList headerText="Resources" mode="list" maxHeight={200}>
            <ResourceCard icon={<FontAwesomeIcon icon={faWorm} />} iconcolor="hsl(300deg, 100%, 90%)" name="Worms" value={resources.worms} cap={0} perSec={0}></ResourceCard>
            <ResourceCard icon={<FontAwesomeIcon icon={faFish} />} iconcolor="hsl(235deg, 100%, 90%)" name="Fish" value={resources.fish} cap={0} perSec={0}></ResourceCard>
          </FlexList>
        </Grid>
        <Grid xs={6} maxHeight={400} overflow={"auto"}>
          <FlexList headerText="Aspects" mode='list'>
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
        </Grid>
        <Grid xs={4} maxHeight={400} overflow={"auto"}>
          <FlexList headerText="All Milestones" mode='list' >
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
        </Grid>
      </Grid>

      <Grid container xs={4} spacing={0.5}>
        <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 255, 255, 0.5)', width: '100%', padding: '4px 16px'}}>
          <h2>Milestone Progress</h2>
          <CircularProgressWithLabel textsize='33px' icon={<FontAwesomeIcon icon={faHurricane} />} iconscale='1.66' iconcolor="hsl(0deg, 100%, 85%)" sx={{padding: "5px"}} color="queen" size={200} thickness={8} variant="determinate" value={12} />
          <div className='action-button-container' style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
            <ActionButton disabled={(resources.fish >= 1 ? false : true)} color="queen" variant="contained" text={(resources.fish >= 1 ? "Sacrifice a Fish" : "Disappointing")} func={handlePickerOpen}></ActionButton>
          </div>
        </Paper>
      </Grid>
    </PageCore>
  )
}

export default PageQueen;
