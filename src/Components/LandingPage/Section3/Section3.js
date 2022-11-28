import React, { useContext } from "react";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import classes from "./Section3.module.css";
import jobLogo from "../../../Assets/landingPageJobCardImage.png";
import { DarkModeContext } from '../../Context/DarkModeContext'

const gridItem = {
  width: { xl: "23%", lg: "23%", md: "48%", sm: "48%", xs: "90%" },
  margin: "auto",
  padding: "0 !important",
};

export default function Section3() {
  const [mode, setMode] = useContext(DarkModeContext);
  return (
    <div style={{ backgroundColor: mode.mode ? '#0d1117' : 'white' }} className={classes.section3}>
      <Box sx={{ flexGrow: "1", padding: "0 20px" }} xs={12}>
        <Grid container spacing={2}>
          <Grid item>
            <h1 style={{ color: mode.mode ? 'white' : 'black' }}> Featured Job Circulars</h1>
          </Grid>
        </Grid>
      </Box>
      <div className={classes.cardContainer}>
        <Box>
          <Grid container spacing={2} sx={{ width: "100%", margin: "auto" }}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map(val =>
              <Grid key={val} sx={{ ...gridItem }} item>
                <div style={{ backgroundColor: mode.mode ? 'black' : 'white', color: mode.mode ? 'white' : 'black', boxShadow: mode.mode ? 'none' : '0 0 10px rgb(183, 183, 183)', border: mode.mode ? '1px solid' : 'none' }} className={classes.card}>
                  <div className={classes.cardHeading}>
                    <img src={jobLogo} alt="Job image" />
                    <div>
                      <h3>Microsoft</h3>
                      <p>Freelance</p>
                    </div>
                  </div>
                  <h1>Senior UI Designer</h1>
                  <div style={{ textAlign: "left" }}>
                    <h6>Fulltime</h6>
                  </div>
                  <p style={{ textAlign: 'left' }}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Nihil nisi totam cupiditate ratione, excepturi delectus
                    necessitatibus natus a. Doloremque consectetur, maxime ut
                    nihil nam fuga eligendi.
                  </p>
                  <div className={classes.footer}>
                    <p>$2500/month</p>
                    <button>Apply</button>
                  </div>
                </div>
              </Grid>
            )}
          </Grid>
        </Box>
      </div>
      <button>Find more jobs</button>
    </div>
  );
}
