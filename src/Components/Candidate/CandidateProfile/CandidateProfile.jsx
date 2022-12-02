import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import classes from "./CandidateProfile.module.css";
import { Grid, Typography } from "@mui/material";
import { Button } from "@mui/material";
import ModalWindow from "../../../UI/Modal";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import { DarkModeContext } from '../../Context/DarkModeContext';
import {
  collection,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { storage } from "../../../firebaseConfig";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";


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

function CandidateProfile() {
  const [mode, setMode] = useContext(DarkModeContext);
  const theme = useTheme();
  const [skillField, setSkills] = React.useState([]);
  const [err, setErr] = useState({
    status: false,
    message: { fileLocation: "" },
  });
  const nameRef = useRef();
  const numberRef = useRef();
  const emailRef = useRef();
  const experienceRef = useRef();
  const educationRef = useRef();
  const domainRef = useRef();
  const [file, setFile] = useState("");
  const [edit, setEdit] = useState(false);
  const [percent, setPercent] = useState(0);
  const [pdfurl, setPdfurl] = React.useState("");

   console.log('RUN');

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkills(typeof value === "string" ? value.split(",") : value);
    setFetchedData((prevState) => {
      return {
        ...prevState,
        candidateSkills: typeof value === "string" ? value.split(",") : value,
      };
    });
  };

  const addData = async (data) => {
    const { resumeLink } = data;
    console.log(resumeLink);
    const pushData = { ...data, userType: "candidate" };
    try {
      await setDoc(
        doc(
          db,
          "userData",
          `${JSON.parse(localStorage.getItem("USERDATA")).uid}`
        ),
        {
          ...pushData,
        },{
          merge: true
        }
      );
      alert("Data submitted successfully!");
      setEdit(false);
    } catch (e) {
      console.error(e);
    }
  };

  const [fetchedData, setFetchedData] = useState(null); //Fetched Data
  const getData = async () => {
    try {
      const docRef = doc(
        db,
        "userData",
        `${JSON.parse(localStorage.getItem("USERDATA")).uid}`
      );
      onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          setFetchedData(doc.data());
          setPdfurl(doc.data().resumeLink);
          setPercent(doc.data().resumeLink ? 100: 0);
        }
      });

      // const docSnap = await getDoc(docRef);
      // if (docSnap.exists()) {
      //   const data = docSnap.data();
      //   setFetchedData(data);
      // } else {
      //   console.log("No such document!");
      // }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
    }
    else if(fetchedData.candidateSkills.length === 0){
      showModal(true, "Skills cannot be empty!");
      return;
    }
    addData({
      candidateName: nameRef.current.value,
      candidateMail: emailRef.current.value,
      candidateContact: numberRef.current.value,
      candidateExperience: experienceRef.current.value,
      candidateEducation: educationRef.current.value,
      candidateDomain: domainRef.current.value,
      candidateSkills: fetchedData.candidateSkills,
      resumeLink: pdfurl,
    });
  };

  const uploadResume = (e) => {
    if (!file) {
      return;
    }
    console.log(file);
    setPercent(0);
    const storageRef = ref(storage, `resume/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPdfurl(downloadURL);
          setEdit(true);
          console.log(downloadURL);
        });
      }
    );
  };

  const fileChangeHandler = (e) => {
    const fileInfo = e.target.files[0];
    console.log(fileInfo);
    setFile(fileInfo);
    setPercent(0);
  };

  return fetchedData ? (
    <div style={{ paddingBottom: '30px', boxSizing: 'border-box', backgroundColor: mode.mode ? '#0d1117' : 'white'}} className={classes.onboarding}>
      <h1 style={{color: mode.mode ? 'white' : 'black', marginTop: '0', paddingTop: '10px'}}>Profile</h1>
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
              // sx={{ input: { outline: '1px solid white !important', borderRadius: '5px', color: 'white !important'} }}
              type="text"
              label="Name"
              placeholder="Enter your name here"
              variant="outlined"
              value={fetchedData.candidateName}
              onChange={(e) =>
                setFetchedData((state) => {
                  // console.log(fetchedData?.candidateSkills.join());
                  return { ...state, candidateName: e.target.value };
                })
              }
              disabled={!edit}
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
              value={fetchedData.candidateContact}
              disabled={!edit}
              onChange={(e) =>
                setFetchedData((state) => {
                  return { ...state, candidateContact: e.target.value };
                })
              }
              inputRef={numberRef}
            />
            <TextField
              id="outlined-basic"
              type="text"
              label="Experience"
              placeholder="Enter your experience here"
              variant="outlined"
              value={fetchedData.candidateExperience}
              disabled={!edit}
              onChange={(e) =>
                setFetchedData((state) => {
                  return { ...state, candidateExperience: e.target.value };
                })
              }
              inputRef={experienceRef}
            />
            <TextField
              id="outlined-basic"
              type="text"
              label="Education"
              placeholder="Enter your education here"
              variant="outlined"
              value={fetchedData.candidateEducation}
              disabled={!edit}
              onChange={(e) =>
                setFetchedData((state) => {
                  return { ...state, candidateEducation: e.target.value };
                })
              }
              inputRef={educationRef}
            />
            <FormControl fullWidth>
              <InputLabel id="domainLabel">Domain</InputLabel>
              <Select
                labelId="demoLabel"
                id="domainField"
                label="Domain"
                value={fetchedData.candidateDomain}
                disabled={!edit}
                onChange={(e) =>
                  setFetchedData((state) => {
                    return { ...state, candidateDomain: e.target.value };
                  })
                }
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
                value={fetchedData.candidateSkills}
                onChange={handleChange}
                disabled={!edit}
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
            {edit || !fetchedData.resumeLink ? (
              <FormControl
                sx={{
                  border: "1px solid black",
                  borderRadius: "5px",
                  padding: "10px",
                }}
                fullWidth
              >
                <label style={{ marginBottom: "10px" }} htmlFor="fileUpload">
                  Upload your Resume
                </label>
                <div>
                  <input
                    type="file"
                    onChange={fileChangeHandler}
                    accept="application/pdf"
                  />
                  <Button
                    sx={{ width: "30%" }}
                    onClick={uploadResume}
                    variant="outlined"
                  >
                    {`${percent > 0 && percent < 100 ? 'Uploading': percent === 0 ? 'Upload' : 'Uploaded'}`}
                  </Button>
                </div>
              </FormControl>
            ) : (
                fetchedData?.resumeLink && (
                <Button
                  sx={{ width: "100%", margin: "auto" }}
                  variant="outlined"
                >
                  <a href={fetchedData?.resumeLink} target="_blank">
                    View Resume
                  </a>
                </Button>
              )
            )}

            {edit && (
              <div style={{ margin: "auto", marginTop: "5vh" }}>
                <Button sx={{ width: "50%" }} type="submit" variant="contained">
                  Submit
                </Button>
              </div>
            )}
          </Box>
        </Grid>
      </Grid>
      {!edit && (
        <Button
          onClick={() => setEdit((prevState) => !prevState)}
          sx={{ width: "100px", margin: "5vh" }}
          variant="contained"
        >
          Edit
        </Button>
      )}
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default CandidateProfile;
