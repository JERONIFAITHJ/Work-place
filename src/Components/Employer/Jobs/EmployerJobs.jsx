import React, { useContext, useEffect, useState } from "react";
import classes from "./EmployerJobs.module.css";
import JobForm from "./JobForm";
import { Button, Grid } from "@mui/material";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { DarkModeContext } from "../../Context/DarkModeContext";

function EmployerJobs() {
  const [jobPost, setJobPost] = useState(false);
  const [disable, setDisable] = useState(false);
  const [fetchedJobs, setFetchedJobs] = useState();
  const [populate, setPopulate] = useState();
  const [mode, setMode] = useContext(DarkModeContext);
  const postJobHandler = (job) => {
    setJobPost((prevState) => true);
    setDisable(true);
    if (job) {
      setPopulate(job);
    } else {
      setPopulate({
        jobTitle: "",
        location: "",
        salary: "",
        experience: "",
        jobType: "",
        jobDescription: "",
        domain: "",
        skillsRequired: [],
      });
    }
  };

  const disableHandler = () => {
    setDisable(false);
    setJobPost(false);
  };

  const fetchJobs = async () => {
    try {
      const q = await query(
        collection(db, "jobData"),
        where(
          "employerId",
          "==",
          JSON.parse(localStorage.getItem("USERDATA")).uid
        )
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const jobs = [];
        querySnapshot.forEach((doc) => {
          jobs.push(doc.data());
        });
        setFetchedJobs(jobs);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div style={{backgroundColor: mode.mode ? '#0d1117': 'white', minHeight: '100vh '}} className={classes.jobs}>
      <Grid container spacing={1}>
        <Grid xs={12} md={3} lg={3} item>
          <Button
            sx={{
              padding: "15px 15px",
              width: { xl: "80%", lg: "80%", md: "80%", sm: "80%", xs: "95%" },
              margin: 'auto',
              color: mode.mode ? 'white' :'black' ,
              border: '1px solid',
              '&: hover': {backgroundColor: 'transparent', border: '2px solid', padding: '14px 15px'}
            }}
            disabled={disable}
            onClick={() => postJobHandler(null)}
            variant="outlined"
          >
            Post a job
          </Button>

          {fetchedJobs && fetchedJobs.length > 0 ? (
            fetchedJobs.map((job) => {
              return (
                <Button
                  key={job.jobId}
                  sx={{
                    padding: "15px 15px",
                    width: {
                      xl: "80%",
                      lg: "80%",
                      md: "80%",
                      sm: "80%",
                      xs: "95%",
                    },
                    color: mode.mode ? 'white' :'black' ,
                    border: "1px solid",
                    margin: 'auto',
                    marginTop: "5vh",
                    '&: hover': {backgroundColor: 'transparent', border: '4px solid', padding: '12px 15px'}
                  }}
                  disabled={disable}
                  onClick={() => postJobHandler(job)}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <p>{job.jobTitle}</p>
                    <p>{job.jobType}</p>
                    <p>{job.location}</p>
                  </div>
                </Button>
              );
            })
          ) : (
            <p>No Jobs found!</p>
          )}
        </Grid>
        {jobPost && (
          <JobForm jobData={populate} disableHandler={disableHandler} />
        )}
      </Grid>
    </div>
  );
}

export default EmployerJobs;
