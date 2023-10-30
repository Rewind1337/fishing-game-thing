import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

import Unicode from '../../components/Unicode'
import CircularProgressWithLabel from '../../components/progress/CircularProgressbarWithLabel';
import ActionButton from '../../components/ActionButton';

import { faSeedling } from '@fortawesome/free-solid-svg-icons';
// MUI 
import Grid from '@mui/material/Unstable_Grid2';
import { Paper } from '@mui/material';
import FlexList from '../../components/flexlist/FlexList';


function SeedCard({ c, onClick }) {
    return (
      <Paper onClick={onClick} title={c} className='seed-card' elevation={1} sx={{ border: '1px solid rgba(255, 255, 255, 0.4)', backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: '4px', display: 'grid', alignItems: 'center' }}>
        <Unicode c={c} color="pink"></Unicode>
      </Paper>);
  }

  SeedCard.propTypes = {
    c: PropTypes.string,
    onClick: PropTypes.func,
  }

  function FarmCell({row, col, selectedSeed, setGridRowCol}) {

    const [cropState, setCropState] = useState({active: false, id: 0, name: "Test Seed"})

    return (<div className='farm-cell'>
      {cropState.active && <>
        <div className='farm-cell-name'>{cropState.name}</div>
        <div className='farm-cell-progress'>
          <CircularProgressWithLabel fontSize='12px' iconOffsetTop="-15%" iconSize="12px" textOffsetTop="40%" icon={<FontAwesomeIcon icon={faSeedling} />} sx={{padding: "2px", color: "hsl(120deg, 90%, 50%"}} color={"gathering"} size={50} thickness={5} variant="determinate" value={33}/>
        </div>
        <div className='farm-cell-buttons' style={{display: "flex"}}>
          <ActionButton color='queen' text={"Uproot"} variant='text'></ActionButton>
          <ActionButton color='gathering' text={"Collect"} variant='text'></ActionButton>
        </div>
      </>}
      {(!cropState.active && selectedSeed.current == -1) && <>
        <div className='farm-cell-name'>No Seed</div>
      </>}
      {(!cropState.active && selectedSeed.current != -1) && <>
        <div className='farm-cell-name hover-effect'>Click to Plant</div>
      </>}
    </div>);
  }
  
  FarmCell.propTypes = {
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    selectedSeed: PropTypes.number.isRequired,
    setGridRowCol: PropTypes.func.isRequired,
  }

  function FarmGrid({width, height, grid, selectedSeed, setGridFull, setGridRowCol}) {
    const buildGrid = () => {
      let _grid = [];
      let n = 0;
      for (let i = 0; i < height; i++) {
        _grid.push([])
        for (let j = 0; j < width; j++, n++) {
          _grid[i].push(n)
        }
      }
      setGridFull(_grid);
    }

    useEffect(() => {
      buildGrid();
    }, [])

    return (
      <Grid container mobile={12}>
        {grid.map((el, row) => {
          return (
            <Grid container key={row} mobile={12} minHeight={300 / height}>
              {el.map((el, col) => {
                return (
                  <Grid container key={col} mobile={"auto"} flexGrow={1} justifyContent={"center"}>
                    <FarmCell row={row} col={col} selectedSeed={selectedSeed} setGridRowCol={setGridRowCol}/>
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

  function Farm() {
    const selectedSeed = useRef(-1)
    const [grid, setGridFull] = useState([])
    const setGridRowCol = (row, col, data) => {
      let changedGrid = grid;
      changedGrid[row][col] = data;
      setGridFull(changedGrid)
    }

    return (
      <>
        <Grid mobile={12} width={"100%"} paddingLeft={0} marginTop={1}>
          <Paper elevation={1} sx={{ width: "100%", border: '1px solid rgba(255, 255, 255, 0.5)', backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: '4px' }}>
            <FlexList mode='compact' collapsible headerText='Seeds'>
              <SeedCard c="0" onClick={() => {selectedSeed.current = 0}} />
              <SeedCard c="1" onClick={() => {selectedSeed.current = 1}}  />
              <SeedCard c="2" onClick={() => {selectedSeed.current = 2}}  />
              <SeedCard c="3" onClick={() => {selectedSeed.current = 3}}  />
            </FlexList>
          </Paper>
        </Grid>

        <Grid mobile={12} width={"100%"} paddingLeft={0}>
          <Paper elevation={1} sx={{ border: '1px solid rgba(255, 255, 255, 0.5)', backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
            <FarmGrid width={2} height={1} grid={grid} selectedSeed={selectedSeed} setGridFull={setGridFull} setGridRowCol={setGridRowCol}></FarmGrid>
          </Paper>
        </Grid>
      </>
    )
  }

  export default Farm;