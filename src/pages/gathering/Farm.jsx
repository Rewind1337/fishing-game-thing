import PropTypes from 'prop-types';
import { useContext, useEffect, useRef, useState } from 'react';
import SaveContext from '../../context/SaveContext';

import FlexList from '../../components/flexlist/FlexList';
import Unicode from '../../components/Unicode'
import CircularProgressWithLabel from '../../components/progress/CircularProgressbarWithLabel';
import ActionButton from '../../components/ActionButton';

// MUI 
import Grid from '@mui/material/Unstable_Grid2';
import { Paper } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function SeedCard({ c, select, onClick }) {
    return (
      <Paper onClick={onClick} title={c} className='seed-card' elevation={1} sx={{ border: '1px solid rgba(255, 255, 255, 0.4)', backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: '4px', display: 'grid', alignItems: 'center' }}>
        <Unicode c={c} color={select}></Unicode>
      </Paper>);
  }

  SeedCard.propTypes = {
    c: PropTypes.string,
    select: PropTypes.func,
    onClick: PropTypes.func,
  }

  function FarmCell({row, col, savedState, selectedSeed, setGridRowCol}) {

    const [cropState, setCropState] = useState({active: false});

    const handleClick = (row, col) => {
      let cropData = {
        active: true, 
        id: selectedSeed.current,
        name: selectedSeed.current.toString() + "-Plant",
        ticksDone: 0,
      }

      setCropState(cropData);
      setGridRowCol(row, col, cropData)
    }
    const uprootClick = (row, col) => {
      let cropData = {active: false};
      setCropState(cropData);
      setGridRowCol(row, col, cropData)
    }

    useEffect(() => {
      setCropState(savedState);
    }, [])

    return (<div className='farm-cell'>
      {cropState.active && <>
        <div className='farm-cell-name'>{cropState.name}</div>
        <div className='farm-cell-progress'>
          <CircularProgressWithLabel fontSize='12px' iconOffsetTop="-15%" iconSize="12px" textOffsetTop="40%" icon={<FontAwesomeIcon icon={"fa-solid fa-seedling"} />} sx={{padding: "2px", color: "hsl(120deg, 90%, 50%"}} color={"gathering"} size={50} thickness={5} variant="determinate" value={33}/>
        </div>
        <div className='farm-cell-buttons' style={{display: "flex"}}>
          <ActionButton color='queen' text={"Uproot"} variant='text' func={() => {uprootClick(row, col)}}></ActionButton>
          <ActionButton color='gathering' text={"Collect"} variant='text'></ActionButton>
        </div>
      </>}
      {(!cropState.active && selectedSeed.current == -1) && <>
        <div className='farm-cell-name'>No Seed</div>
      </>}
      {(!cropState.active && selectedSeed.current != -1) && <>
        <div onClick={() => {handleClick(row, col)}} className='farm-cell-name hover-effect'>Click to Plant</div>
      </>}
    </div>);
  }
  
  FarmCell.propTypes = {
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    savedState: PropTypes.object,
    selectedSeed: PropTypes.number.isRequired,
    setGridRowCol: PropTypes.func.isRequired,
  }

  function FarmGrid({width, height, grid, selectedSeed, setGridFull, setGridRowCol}) {
    const buildGrid = (grid) => {
      let _grid = [];
      if (grid.length == 0) {
        for (let i = 0; i < height; i++) {
          _grid.push([])
          for (let j = 0; j < width; j++) {
            _grid[i].push({active: false})
          }
        }
      } else {
        _grid = grid;
      }
      setGridFull(_grid);
    }

    useEffect(() => {
      buildGrid(grid);
    }, [])

    return (
      <Grid container mobile={12}>
        {grid.map((el, row) => {
          return (
            <Grid container key={row} mobile={12} minHeight={300 / height}>
              {el.map((el, col) => {
                return (
                  <Grid container key={col} mobile={"auto"} flexGrow={1} justifyContent={"center"}>
                    <FarmCell row={row} col={col} savedState={grid[row][col]} selectedSeed={selectedSeed} setGridRowCol={setGridRowCol}/>
                  </Grid>
              )})}
            </Grid>
        )})}
      </Grid>
    );
  }

  FarmGrid.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    grid: PropTypes.array.isRequired,
    selectedSeed: PropTypes.number.isRequired,
    setGridFull: PropTypes.func.isRequired,
    setGridRowCol: PropTypes.func.isRequired,
  }

  function Farm({farmWidth, farmHeight}) {
    const _context = useContext(SaveContext)
    const _farm = _context.save.farm

    const selectedSeedRef = useRef(-1)
    const [selectedSeed, setSelectedSeed] = useState(-1);
    const [grid, setGridFull] = useState(_farm.grid || [])
    
    const setGridRowCol = (row, col, data) => {
      let changedGrid = grid.slice();
      changedGrid[row][col] = data;
      setGridFull(changedGrid)
    }

    const setSave = _context.setSave;

    useEffect(() => {
      setSave({farm: {grid: grid}})
    })
    
    const updateSeedRef = (seed) => {
      if (selectedSeedRef.current == seed) {
        setSelectedSeed(-1);
        selectedSeedRef.current = -1;
      } else {
        setSelectedSeed(seed);
        selectedSeedRef.current = seed;
      }
    }

    const seedSelectColor = (seed) => {
      return selectedSeedRef.current == seed ? "hsl(330, 100%, 50%)" : "pink";
    }

    return (
      <>
        <Grid mobile={12} width={"100%"} paddingLeft={0} marginTop={1}>
          <Paper elevation={1} sx={{ width: "100%", border: '1px solid rgba(255, 255, 255, 0.5)', backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: '4px' }}>
            <FlexList mode='compact' collapsible headerText='Seeds'>
              <SeedCard c="0" select={seedSelectColor(0)} onClick={() => {updateSeedRef(0)}} />
              <SeedCard c="1" select={seedSelectColor(1)} onClick={() => {updateSeedRef(1)}}  />
              <SeedCard c="2" select={seedSelectColor(2)} onClick={() => {updateSeedRef(2)}}  />
              <SeedCard c="3" select={seedSelectColor(3)} onClick={() => {updateSeedRef(3)}}  />
            </FlexList>
          </Paper>
        </Grid>

        <Grid mobile={12} width={"100%"} paddingLeft={0}>
          <Paper elevation={1} sx={{ border: '1px solid rgba(255, 255, 255, 0.5)', backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
            <FarmGrid width={farmWidth} height={farmHeight} grid={grid} selectedSeed={selectedSeedRef} setGridFull={setGridFull} setGridRowCol={setGridRowCol}></FarmGrid>
          </Paper>
        </Grid>
      </>
    )
  }

  Farm.propTypes = {
    farmWidth: PropTypes.number.isRequired,
    farmHeight: PropTypes.number.isRequired,
  }

  export default Farm;