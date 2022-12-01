import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import classes from "./EmployerProfile.module.css";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import ModalWindow from "../../../UI/Modal";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const industries = [
  { id: "1", industry: "Agriculture" },
  { id: "2", industry: "Commerce" },
  { id: "3", industry: "IT" },
  { id: "4", industry: "Basic Metal Production" },
  { id: "5", industry: "Chemical Industries" },
  { id: "6", industry: "Construction" },
  { id: "7", industry: "Education" },
  { id: "8", industry: "Financial Services" },
  { id: "9", industry: "Hotel Management" },
  { id: "10", industry: "Event Organizing" },
];

function EmployerProfile({ isEdit = false }) {
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const [err, setErr] = useState({ status: false, message: "" });
  const nameRef = useRef();
  const numberRef = useRef();
  const emailRef = useRef();
  const companyNameRef = useRef();
  const companySizeRef = useRef();
  const hrMailRef = useRef();
  const companyAddressRef = useRef();
  const industryRef = useRef();


  const showModal = (isError, errorText) => {
    setErr({ status: isError, message: errorText });
    setTimeout(() => setErr({ status: false, message: "" }), 5000);
  };

  const pushData = async (data) => {
    console.log(JSON.parse(localStorage.getItem('USERDATA')).uid);
    const push = { ...data, userType: 'employer' }
    try {
      await setDoc(doc(db, "userData", `${(JSON.parse(localStorage.getItem('USERDATA'))?.uid) ? JSON.parse(localStorage.getItem('USERDATA')).uid : 'null check'}`), {
        ...push
      });
      alert('Data submitted successfully!');
      setEdit(prevState => !prevState);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // ----------DATA FETCHING------------

  const [fetchedData, setFetchedData] = useState(null); //Fetched Data
  const getData = async () => {
    console.log(JSON.parse(localStorage.getItem('USERDATA')).uid);
    try {
      const docRef = doc(db, "userData", `${JSON.parse(localStorage.getItem('USERDATA')).uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setFetchedData(data);
      } else {
        console.log("No such document!");
      }
    } catch (e) {
      console.log('Error!');
    }
  }

  useEffect(() => {
    if (isEdit) {
      getData();
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    if (nameRef.current.value <= 3) {
      showModal(true, "Name has to be at least 3 characters long!");
      return;
    } else if (numberRef.current.value.length != 10) {
      showModal(true, "Phone number has to be 10 digits!");
      return;
    } else if (companyNameRef.current.value === "") {
      showModal(true, "Company name cannot be empty!");
      return;
    } else if (companySizeRef.current.value === "") {
      showModal(true, "Company size field cannot be empty!");
      return;
    } else if (
      !hrMailRef.current.value.includes("@") ||
      !hrMailRef.current.value.includes(".") ||
      hrMailRef.current.value.startsWith("@") ||
      !(hrMailRef.current.value.length - hrMailRef.current.value.lastIndexOf(".") > 2)
    ) {
      showModal(true, "Invalid mail!");
      return;
    } else if (companyAddressRef.current.value === "") {
      showModal(true, "Company address cannot be empty!");
      return;
    } else if (industryRef.current.value === "") {
      showModal(true, "Select an industry type!");
      return;
    }
    pushData({
      representativeName: nameRef.current.value,
      representitveMail: emailRef.current.value,
      companyPhone: numberRef.current.value,
      companyName: companyNameRef.current.value,
      companySize: companySizeRef.current.value,
      hrMail: hrMailRef.current.value,
      companyAddress: companyAddressRef.current.value,
      industryType: industryRef.current.value,
    });
  };

  // const [repName, setRepName] = useState();
  // const [companyContact, setCompanyContact] = useState(fetchedData.companyPhone);
  // const [companyName, setCompanyName] = useState(fetchedData.companyName);
  // const [companySize, setCompanySize] = useState(fetchedData.companySize);
  // const [hrMail, setHrMail] = useState(fetchedData.hrMail);
  // const [address, setAddress] = useState(fetchedData.companyAddress);
  // const [industry, setIndustry] = useState(fetchedData?.industryType);

  const nameChange = (e) => {
    setFetchedData(prevState => {
      return { ...prevState, representativeName: e.target.value }
    });
  }
  const companyContactChange = (e) => {
    setFetchedData(prevState => {
      return { ...prevState, companyPhone: e.target.value }
    });
  }
  const companyNameChange = (e) => {
    setFetchedData(prevState => {
      return { ...prevState, companyName: e.target.value }
    });
  }
  const companySizeChange = (e) => {
    setFetchedData(prevState => {
      return { ...prevState, companySize: e.target.value }
    });
  }
  const hrMailChange = (e) => {
    setFetchedData(prevState => {
      return { ...prevState, hrMail: e.target.value }
    });
  }
  const addressChange = (e) => {
    setFetchedData(prevState => {
      return { ...prevState, companyAddress: e.target.value }
    });
  }
  const industryChange = (e) => {
    setFetchedData(prevState => {
      return { ...prevState, industryType: e.target.value }
    });
  }

  return (
    fetchedData ?
      (<div style={{paddingBottom : '100px'}} className={classes.onboarding}>
        <h1>Welcome to work place</h1>
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
                id="repName"
                type="text"
                label="Name"
                placeholder="Enter your name here"
                variant="outlined"
                required
                onChange={nameChange}
                value={fetchedData.representativeName}
                disabled={!edit}
                inputRef={nameRef}
              />
              <TextField
                helperText=""
                id="userMail"
                type="email"
                value={JSON.parse(localStorage.getItem("USERDATA")).email}
                disabled
                label="Email"
                variant="outlined"
                required
                inputRef={emailRef}
              />
              <TextField
                id="companyContact"
                type="number"
                label="Contact"
                placeholder="Enter your number here"
                variant="outlined"
                required
                onChange={companyContactChange}
                value={fetchedData.companyPhone}
                disabled={!edit}
                inputRef={numberRef}
              />
              <TextField
                id="companyName"
                type="text"
                label="Company Name"
                placeholder="Enter the company name here"
                variant="outlined"
                required
                onChange={companyNameChange}
                value={fetchedData.companyName}
                disabled={!edit}
                inputRef={companyNameRef}
              />
              <TextField
                id="companySize"
                type="number"
                label="Company Size"
                placeholder="Enter company size here"
                variant="outlined"
                required
                onChange={companySizeChange}
                value={fetchedData.companySize}
                disabled={!edit}
                inputRef={companySizeRef}
              />
              <TextField
                helperText=""
                id="hrMail"
                type="text"
                label="HR Mail"
                variant="outlined"
                required
                onChange={hrMailChange}
                value={fetchedData.hrMail}
                disabled={!edit}
                inputRef={hrMailRef}
              />
              <TextField
                id="companyAddress"
                type="text"
                label="Address"
                placeholder="Enter company address here"
                variant="outlined"
                required
                onChange={addressChange}
                value={fetchedData.companyAddress}
                disabled={!edit}
                inputRef={companyAddressRef}
              />
              <FormControl fullWidth>
                <InputLabel id="domainLabel">Domain</InputLabel>
                <Select
                  labelId="demoLabel"
                  id="industryType"
                  label="Industry"
                  value={fetchedData.industryType}
                  onChange={industryChange}
                  inputRef={industryRef}
                  required
                  disabled={!edit}
                >
                  {industries.map((item) => (
                    <MenuItem key={item.id} value={item.industry}>
                      {item.industry}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {edit && (<div style={{ margin: "auto", marginTop: "5vh" }}>
                <Button sx={{ width: "50%" }} type="submit" variant="contained">
                  Submit
                </Button>
              </div>)}
            </Box>
          </Grid>
        </Grid>
        {isEdit && !edit && <Button onClick={() => setEdit(prevState => !prevState)} sx={{ width: "100px", marginTop: "5vh" }} variant="contained">Edit</Button>}
      </div>) : <p>Loading</p>
  );
}

export default EmployerProfile;
