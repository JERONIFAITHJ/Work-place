import React, { Fragment, useContext } from 'react'
import Navbar from '../NavBar'
import classes from './Header.module.css';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import {DarkModeContext} from '../../Context/DarkModeContext'

export default function Header() {
    const [mode, setMode] = useContext(DarkModeContext);
    return (
        <Fragment>
            <Navbar />
            <div style={{backgroundColor: mode.mode ? '#0d1117' : 'white'}} className={classes.mainHeaderSection}>
                <div>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item sx={{ fontSize: { lg: '2rem', md: '1.9rem', xs: '1.5rem' } }} xs={12}>
                                <div className={classes.firstChild}>
                                    <h1 style={{color: mode.mode ? 'white' : 'black'}}>GET THE <span style={{ color: '#4540DB' }}>RIGHT JOB</span> <br /> YOU DESERVE</h1>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={classes.secondChild}>
                                    <p style={{color: mode.mode ? 'white' : 'black'}}>768 jobs and 110 candidates registered!</p>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </div>
        </Fragment>
    )
}
