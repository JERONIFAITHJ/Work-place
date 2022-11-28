import React, {useContext} from "react";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import classes from "./Section2.module.css";
import CampaignIcon from "@mui/icons-material/Campaign";
import CreateIcon from "@mui/icons-material/Create";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import HandshakeIcon from "@mui/icons-material/Handshake";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import EventNoteIcon from "@mui/icons-material/EventNote";
import Cards from "./Cards";
import {DarkModeContext} from '../../Context/DarkModeContext'

const cardInfo = [
  {
    id: "1",
    head1: "Marketing &",
    head2: "Communications",
    openings: "237 Job openings",
    Icon: <CampaignIcon />,
    iconStyles: { color: "#FF9191", fontSize: "40px" },
  },
  {
    id: "2",
    head1: "Design &",
    head2: "Development",
    openings: "237 Job openings",
    Icon: <CreateIcon />,
    iconStyles: { color: "#8783E7", fontSize: "40px" },
  },
  {
    id: "3",
    head1: "Human Research &",
    head2: "Development",
    openings: "237 Job openings",
    Icon: <PeopleOutlineIcon />,
    iconStyles: { color: "#79EBB0", fontSize: "40px" },
  },
  {
    id: "4",
    head1: "Finance",
    head2: "Management",
    openings: "237 Job openings",
    Icon: <TrendingUpIcon />,
    iconStyles: { color: "#F8D198", fontSize: "40px" },
  },
  {
    id: "5",
    head1: "Project",
    head2: "Management",
    openings: "237 Job openings",
    Icon: <EventNoteIcon />,
    iconStyles: { color: "#8E83DD", fontSize: "40px" },
  },
  {
    id: "6",
    head1: "Government",
    head2: "Jobs",
    openings: "237 Job openings",
    Icon: <AssuredWorkloadIcon />,
    iconStyles: { color: "#C293FE", fontSize: "40px" },
  },
  {
    id: "7",
    head1: "Business &",
    head2: "Marketing",
    openings: "237 Job openings",
    Icon: <HandshakeIcon />,
    iconStyles: { color: "#F7A6FF", fontSize: "40px" },
  },
  {
    id: "8",
    head1: "Customer",
    head2: "Care",
    openings: "237 Job openings",
    Icon: <HeadsetMicIcon />,
    iconStyles: { color: "#A3D4C3", fontSize: "40px" },
  },
];

export default function Section2() {
  const [mode, setMode] = useContext(DarkModeContext);
  return (
    <div style={{backgroundColor: mode.mode ? 'rgb(26 36 50)' : '#f6f7fc'}} className={classes.section2}>
      <Box sx={{ flexGrow: "1", padding: "0 20px" }} xs={12}>
        <Grid container spacing={2}>
          <Grid item>
            <h1 style={{color:  mode.mode ? 'white' : 'black'}}>
              One Platform <br /> Many{" "}
              <span style={{ color: "#4540DB" }}> Solutions </span>
            </h1>
          </Grid>
        </Grid>
      </Box>
      <div className={classes.cardContainer}>
        <Box>
          <Grid container spacing={2} sx={{ width: "100%", margin: "auto" }}>
            {cardInfo.map((val) => (
              <Cards
                key={val.id}
                heading1={val.head1}
                heading2={val.head2}
                openings={val.openings}
                icon={val.Icon}
                iconStyles={val.iconStyles}
              />
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
}
