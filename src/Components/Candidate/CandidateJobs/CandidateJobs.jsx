import React, { useEffect, useState, useContext } from "react";
import { db } from "../../../firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Button, Grid } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import classes from "./CandidateJobs.module.css";
import { doc, setDoc, getDocs } from "firebase/firestore";
import { DarkModeContext } from "../../Context/DarkModeContext";

function CandidateJobs() {
  const [mode] = useContext(DarkModeContext);
  const [jobs, setJobs] = useState();
  const savedUserId = JSON.parse(localStorage.getItem("USERDATA")).uid;
  const savedUserName = JSON.parse(localStorage.getItem('USERDATA')).displayName;
  const savedUserMail = JSON.parse(localStorage.getItem('USERDATA')).email;

  const fetchAllJobs = async () => {
    try {
      const q = query(collection(db, "jobData"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const jobInfo = [];
        querySnapshot.forEach((doc) => {
          jobInfo.push(doc.data());
        });
        setJobs(jobInfo);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const applyJob = async (job) => {
    try {

      //Fetching all the applications of this user
      const q = query(
        collection(db, "applications"),
        where("candidateId", "==", savedUserId)
      );
      let applyCheck = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        applyCheck.push(doc.data());
      });

      //Checking whether the user has already applied for a particular job
      const jobFlag = applyCheck.find((val) => val.jobId === job.jobId);
      console.log(typeof jobFlag);

      //If yes, alert and return
      if (jobFlag) {
        alert("You have already applied to this position!");
        return;
      } else {
        // else push the data to the db
        const applicationId = uuidv4();
        await setDoc(doc(db, "applications", applicationId), {
          applicationId,
          jobId: job.jobId,
          employerId: job.employerId,
          employerName: job.employerName,
          jobTitle: job.jobTitle,
          location: job.location,
          candidateId: savedUserId,
          candidateMail: savedUserMail,
          candidateName: savedUserName,
          appliedAt: new Date(),
          status: "applied",
        });
        alert('We have sent the application to the company!');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  return jobs && jobs.length > 0 ? (
    <div style={{ backgroundColor: mode.mode ? "#0d1117" : 'white', minHeight: "100vh", paddingBottom: '100px' }}>
      <h2 style={{ paddingTop: "3vh", marginTop: "0", color: mode.mode ? 'white' : 'black' }}>All availabe jobs</h2>
      <Grid sx={{ margin: "auto", width: "100%" }} container>
        {jobs.map((val, index) => {
          return (
            <Grid
              key={index}
              sx={{
                backgroundColor: mode.mode ? 'black' : "lavender",
                color: mode.mode ? 'white' : 'black',
                padding: "20px !important",
                margin: "auto",
                marginBottom: "5vh",
                borderRadius: "5px",
              }}
              xs={11}
              item
            >
              <h3>{val.jobTitle}</h3>
              <div className={classes.jobData}>
                <div>
                  <table>
                    <tbody>
                      <tr>
                        <td>Domain: </td>
                        <td>{val.domain}</td>
                      </tr>
                      <tr>
                        <td>Experience: </td>
                        <td>{val.experience}</td>
                      </tr>
                      <tr>
                        <td>Job Description: </td>
                        <td>{val.jobDescription}</td>
                      </tr>
                      <tr>
                        <td>Skills Required: </td>
                        <td>{val.skillsRequired.join(", ")}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className={classes.loca}>Location: {val.location}</div>
              </div>
              <div style={{ marginTop: "20px" }}>
                <Button
                  sx={{
                    backgroundColor: mode.mode ? 'white' : "black",
                    color: mode.mode ? "black" : 'white',
                    padding: "8px 40px",
                    "&: hover": { backgroundColor: "black", color: "white" },
                  }}
                  variant="contained"
                  onClick={() => applyJob(val)}
                >
                  Apply
                </Button>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  ) : jobs && jobs.length === 0 ? <p>No Jobs at the moment</p> : (
    <p>Loading Jobs...</p>
  );
}

export default CandidateJobs;