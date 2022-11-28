import React, { useRef, useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import classes from "./CandidateOnboarding.module.css";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import ModalWindow from "../../../UI/Modal";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { UserInfoContext } from "../../Context/UserInfoContext";

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

function CandidateOnboarding() {
  const navigate = useNavigate();
  const [userContext, setUserContext] = useContext(UserInfoContext);
  const theme = useTheme();
  const [skillField, setSkills] = React.useState([]);
  const [candidateData, setCandidateData] = useState({});
  const [domain, setDomain] = useState("");
  const [err, setErr] = useState({ status: false, message: "" });
  const nameRef = useRef();
  const numberRef = useRef();
  const emailRef = useRef();
  const experienceRef = useRef();
  const educationRef = useRef();
  const domainRef = useRef();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkills(typeof value === "string" ? value.split(",") : value);
  };

  const addData = async (data) => {
    const pushData = { ...data, userType: "candidate", resumeLink: '' };
    try {
      await setDoc(
        doc(
          db,
          "userData",
          `${JSON.parse(localStorage.getItem("USERDATA")).uid}`
        ),
        {
          ...pushData,
        }
      );
      const docRef = doc(db, "userData", userContext.userData.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error("Docs doesnt exist!");
      }
      setUserContext({ type: "SET_DBDATA", payload: docSnap.data() });
      alert("Data submitted successfully!");
      navigate("/candidate/profile");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const showModal = (isError, errorText) => {
    setErr({ status: isError, message: errorText });
    setTimeout(() => setErr({ status: false, message: "" }), 5000);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (nameRef.current.value <= 3) {
      showModal(true, "Name has to be at least 3 characters long!");
      return;
    } else if (numberRef.current.value.length != 10) {
      showModal(true, "Phone number has to be 10 digits!");
      return;
    } else if (experienceRef.current.value.length === "") {
      showModal(true, "Experience cannot be empty!");
      return;
    } else if (educationRef.current.value === "") {
      showModal(true, "Education cannot be empty!");
      return;
    } else if (domainRef.current.value === "") {
      showModal(true, "Domain cannot be empty!");
      return;
    } else if (skillField.length <= 0) {
      showModal(true, "Skills field cannot be empty!");
      return;
    }
    // setCandidateData((prevState) => {
    //   return {
    //     candidateName: nameRef.current.value,
    //     candidateMail: emailRef.current.value,
    //     candidatePhone: numberRef.current.value,
    //     candidateExperience: experienceRef.current.value,
    //     candidateEducation: educationRef.current.value,
    //     candidateDomain: domainRef.current.value,
    //     candidateSkills: skillField,
    //   };
    // });
    addData({
      candidateName: nameRef.current.value,
      candidateMail: emailRef.current.value,
      candidateContact: numberRef.current.value,
      candidateExperience: experienceRef.current.value,
      candidateEducation: educationRef.current.value,
      candidateDomain: domainRef.current.value,
      candidateSkills: skillField,
    });
  };

  return (
    <div className={classes.onboarding}>
      <h1>Welcome to work place!</h1>
      {err.status && <ModalWindow show={err.status} message={err.message} />}
      <Grid container sx={{ width: "100%", margin: "auto" }} spacing={2}>
        <Grid sx={{ width: "100%", paddingLeft: "0 !important" }} xs={12} item>
          <Box
            component="form"
            onSubmit={submitHandler}
            sx={{
              "& > :not(style)": {
                m: 1,
                width: {
                  lg: "25%",
                  xl: "25%",
                  md: "50%",
                  sm: "80%",
                  xs: "100%",
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
              id="outlined-basic"
              type="text"
              label="Name"
              placeholder="Enter your name here"
              variant="outlined"
              inputRef={nameRef}
            />
            <TextField
              helperText=""
              id="outlined-basic"
              type="email"
              value={JSON.parse(localStorage.getItem("USERDATA")).email}
              disabled
              label="Email"
              variant="outlined"
              required
              inputRef={emailRef}
            />
            <TextField
              id="outlined-basic"
              type="number"
              label="Phone"
              placeholder="Enter your number here"
              variant="outlined"
              inputRef={numberRef}
            />
            <TextField
              id="outlined-basic"
              type="text"
              label="Experience"
              placeholder="Enter your experience here"
              variant="outlined"
              inputRef={experienceRef}
            />
            <TextField
              id="outlined-basic"
              type="text"
              label="Education"
              placeholder="Enter your education here"
              variant="outlined"
              inputRef={educationRef}
            />
            <FormControl fullWidth>
              <InputLabel id="domainLabel">Domain</InputLabel>
              <Select
                labelId="demoLabel"
                id="domainField"
                label="Domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                inputRef={domainRef}
              >
                {domains.map((domain) => (
                  <MenuItem key={domain.id} value={domain.domain}>
                    {domain.domain}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="skillLabel">Skills</InputLabel>
              <Select
                labelId="skill"
                id="skillSelect"
                multiple
                value={skillField}
                onChange={handleChange}
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
                    style={getStyles(name.skill, skillField, theme)}
                  >
                    {name.skill}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div style={{ margin: "auto", marginTop: "5vh" }}>
              <Button sx={{ width: "50%" }} type="submit" variant="contained">
                Submit
              </Button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default CandidateOnboarding;
