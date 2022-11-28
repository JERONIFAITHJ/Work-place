import React, {useContext} from 'react'
import { Grid } from '@mui/material'
import classes from './Section2.module.css';
import {DarkModeContext} from '../../Context/DarkModeContext'
const gridItem = {
  width: { xl: '23%', lg: '23%', md: '49%', sm: '49%', xs: '90%' },
  margin: 'auto',
  padding: '0 !important'
}

export default function Cards({ heading1, heading2, openings, icon, iconStyles }) {
  const [mode] = useContext(DarkModeContext);
  const Icon = React.cloneElement(icon, {style: {...iconStyles}});
  return (
    <Grid sx={{ ...gridItem }} item>
      <div style={{backgroundColor: mode.mode ? 'black' : 'white', color: mode.mode ? 'white' : 'black', boxShadow: mode.mode ? 'none' : '0 0 10px rgb(183, 183, 183)', border: mode.mode ? '1px solid' : 'none'}} className={classes.card}>
        <div className={classes.header}>
          {Icon}
          <h3 className={classes.heading}>{heading1} <br /> {heading2}</h3>
        </div>
        <p className={classes.p}>{openings}</p>
      </div>
    </Grid>
  )
}