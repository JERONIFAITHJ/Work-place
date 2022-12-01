import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const domains = [
  { id: "1", domain: "Full Stack" },
  { id: "2", domain: "Front end" },
  { id: "3", domain: "Back end" },
  { id: "4", domain: "Java" },
  { id: "5", domain: "Cyber Security" },
  { id: "6", domain: "Devops" },
  { id: "7", domain: "Testing" },
  { id: "8", domain: "Sales Force" },
  { id: "9", domain: "Service now" },
  { id: "10", domain: "Content Creator" },
];
const skills = [
  { id: "1", skill: "HTML5" },
  { id: "2", skill: "CSS" },
  { id: "3", skill: "Javascript" },
  { id: "4", skill: "React" },
  { id: "5", skill: "Java" },
  { id: "6", skill: "C/C++" },
  { id: "7", skill: "Python" },
  { id: "8", skill: "Angular" },
  { id: "9", skill: "Cloud" },
  { id: "10", skill: "NodeJs" },
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export default function JobForm({ jobData, disableHandler }) {
  const theme = useTheme();
  const [jobInfo, setJobInfo] = useState(jobData);
  const [skillField, setSkills] = React.useState();

  //Skills Change Handler
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkills(typeof value === "string" ? value.split(",") : value);
    setJobInfo((prevState) => {
      return {
        ...prevState,
        skillsRequired: typeof value === "string" ? value.split(",") : value,
      };
    });
  };

  // const employerName = async () => {
  //   const q = query(collection(db, 'userData'));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, " => ", doc.data());
  //   });
  // };

  // useEffect(() => {
  //   employerName();
  // }, []);

  const addJob = async (data) => {
    try {
      const job_ID = jobInfo.jobId || uuidv4();
      console.log(data, job_ID);
      await setDoc(doc(db, "jobData", job_ID), {
        jobId: job_ID,
        ...data,
        employerName: JSON.parse(localStorage.getItem("USERDATA")).displayName,
        employerId: JSON.parse(localStorage.getItem("USERDATA")).uid,
        dateAdded: new Date(),
      });
      alert("Job posted successfully!");
      disableHandler();
    } catch (e) {
      console.log(e);
    }
  };

  const domainChangeHandler = (e) => {
    setJobInfo((prevState) => {
      return { ...prevState, domain: e.target.value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (jobInfo.jobTitle === "") {
      alert("Job title cannot be empty!");
      return;
    }
    if (jobInfo.location === "") {
      alert("Location cannot be empty!");
      return;
    }
    if (jobInfo.salary === "") {
      alert("Salary cannot be empty!");
      return;
    }
    if (jobInfo.experience === "") {
      alert("Experience cannot be empty!");
      return;
    }
    if (jobInfo.jobType === "") {
      alert("Job Type cannot be empty!");
      return;
    }
    if (jobInfo.jobDescription === "") {
      alert("Job Description cannot be empty!");
      return;
    }
    if (jobInfo.domain === "") {
      alert("Domain cannot be empty!");
      return;
    }
    if (jobInfo.skillsRequired.length <= 0) {
      alert("Skill requirements cannot be empty!");
      return;
    }
    addJob(jobInfo);
  };

  return jobInfo ? (
    <Grid
      sx={{ paddingBottom: "100px", minHeight: "100vh" }}
      xs={12}
      lg={9}
      md={9}
      item
    >
      <h1>Job Details</h1>
      <Box
        component="form"
        onSubmit={submitHandler}
        sx={{
          "& > :not(style)": {
            m: 1,
            width: {
              lg: "40%",
              xl: "40%",
              md: "50%",
              sm: "80%",
              xs: "95%",
            },
            margin: {
              lg: "20px",
            },
          },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="title"
          type="text"
          label="Job Title"
          placeholder="Job Title"
          variant="outlined"
          required
          value={jobInfo.jobTitle}
          onChange={(e) =>
            setJobInfo((prevState) => {
              return { ...prevState, jobTitle: e.target.value };
            })
          }
        />
        <TextField
          id="location"
          type="text"
          label="Location"
          placeholder="Company location"
          variant="outlined"
          required
          value={jobInfo.location}
          onChange={(e) =>
            setJobInfo((prevState) => {
              return { ...prevState, location: e.target.value };
            })
          }
        />
        <TextField
          id="salary"
          type="text"
          label="Salary"
          placeholder="Salary range"
          variant="outlined"
          required
          value={jobInfo.salary}
          onChange={(e) =>
            setJobInfo((prevState) => {
              return { ...prevState, salary: e.target.value };
            })
          }
        />
        <TextField
          id="Experience"
          type="number"
          label="Experience"
          placeholder="Required Experience"
          variant="outlined"
          required
          value={jobInfo.experience}
          onChange={(e) =>
            setJobInfo((prevState) => {
              return { ...prevState, experience: e.target.value };
            })
          }
        />
        <TextField
          helperText=""
          id="Job Type"
          type="text"
          label="Type of Job"
          variant="outlined"
          required
          value={jobInfo.jobType}
          onChange={(e) =>
            setJobInfo((prevState) => {
              return { ...prevState, jobType: e.target.value };
            })
          }
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Job Description"
          multiline
          maxRows={4}
          value={jobInfo.jobDescription}
          onChange={(e) =>
            setJobInfo((prevState) => {
              return { ...prevState, jobDescription: e.target.value };
            })
          }
        />
        <FormControl fullWidth>
          <InputLabel id="domainLabel">Domain</InputLabel>
          <Select
            labelId="demoLabel"
            id="domainField"
            value={jobInfo.domain}
            onChange={domainChangeHandler}
            label="Domain"
          >
            {domains.map((domain) => (
              <MenuItem key={domain.id} value={domain.domain}>
                {domain.domain}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="skillLabel">Skills</InputLabel>
          <Select
            labelId="skill"
            id="skillSelect"
            multiple
            onChange={handleChange}
            value={jobInfo.skillsRequired}
            input={<OutlinedInput id="skillsField" label="Skills" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {skills.map((name) => (
              <MenuItem
                key={name.id}
                id={name.id}
                value={name.skill}
                style={getStyles(name.skill, jobInfo.skillsRequired, theme)}
              >
                {name.skill}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div style={{margin: 'auto', marginTop: '2vh', display: 'flex', flexWrap: 'nowrap', gap: '5px', justifyContent: 'center'}}>
          <Button
            sx={{
              width: "200px !important",
              color: "lightgreen",
              border: "1px solid lightgreen",
              "&: hover": { color: "lightskyblue" },
            }}
            type="submit"
            variant="outlined"
          >
            Submit
          </Button>
          <Button
            sx={{
              width: "200px !important",
              color: "lightcoral",
              border: "1px solid lightcoral",
              "&: hover": { color: "lightskyblue" },
            }}
            onClick={() => disableHandler()}
            variant="outlined"
          >
            Cancel
          </Button>
        </div>
      </Box>
    </Grid>
  ) : (
    <p style={{ marginTop: "5vh" }}>Loading...</p>
  );
}
