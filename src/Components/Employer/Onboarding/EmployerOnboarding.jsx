import React, { useContext, useRef, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import classes from "./EmployerOnboarding.module.css";
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
import { UserInfoContext } from "../../Context/UserInfoContext";

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

function EmployerOnboarding() {
  const navigate = useNavigate();
  const [userContext, setUserContext] = useContext(UserInfoContext);
  const [industry, setIndustry] = useState("");
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
    console.log(JSON.parse(localStorage.getItem("USERDATA")).uid);
    const push = { ...data, userType: "employer" };
    try {
      await setDoc(
        doc(
          db,
          "userData",
          `${
            JSON.parse(localStorage.getItem("USERDATA"))?.uid
              ? JSON.parse(localStorage.getItem("USERDATA")).uid
              : "null check"
          }`
        ),
        {
          ...push,
        }
      );
      const docRef = doc(db, "userData", userContext.userData.uid);
      const docSnap = await getDoc(docRef);
      if(!docSnap.exists()){
        throw new Error('Docsnap doesnt exist!');
      }
      setUserContext({ type: "SET_DBDATA", payload: docSnap.data() });
      alert("Data submitted successfully!");
      navigate("/employer/profile");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

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
      !(
        hrMailRef.current.value.length -
          hrMailRef.current.value.lastIndexOf(".") >
        2
      )
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
              id="repName"
              type="text"
              label="Name"
              placeholder="Enter your name here"
              variant="outlined"
              required
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
              inputRef={numberRef}
            />
            <TextField
              id="companyName"
              type="text"
              label="Company Name"
              placeholder="Enter the company name here"
              variant="outlined"
              required
              inputRef={companyNameRef}
            />
            <TextField
              id="companySize"
              type="number"
              label="Company Size"
              placeholder="Enter company size here"
              variant="outlined"
              required
              inputRef={companySizeRef}
            />
            <TextField
              helperText=""
              id="hrMail"
              type="text"
              label="HR Mail"
              variant="outlined"
              required
              inputRef={hrMailRef}
            />
            <TextField
              id="companyAddress"
              type="text"
              label="Address"
              placeholder="Enter company address here"
              variant="outlined"
              required
              inputRef={companyAddressRef}
            />
            <FormControl fullWidth>
              <InputLabel id="domainLabel">Domain</InputLabel>
              <Select
                labelId="demoLabel"
                id="industryType"
                label="Industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                inputRef={industryRef}
                required
              >
                {industries.map((item) => (
                  <MenuItem key={item.id} value={item.industry}>
                    {item.industry}
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

export default EmployerOnboarding;
