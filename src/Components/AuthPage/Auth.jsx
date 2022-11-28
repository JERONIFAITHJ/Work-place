import React, { useContext } from "react";
import classes from "./AuthPage.module.css";
import {
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { UserInfoContext } from "../Context/UserInfoContext";

export default function Auth(props) {
  const navigate = useNavigate();
  const [userContext, setUserContext] = useContext(UserInfoContext);
  const signIn = (e) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log("Fetching...");
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // localStorage.setItem("USERDATA", JSON.stringify(user));
        setUserContext({type: 'SET_USERDATA', payload: user});
        const docRef = doc(db, "userData", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log(docSnap.data());
          const userInfo = docSnap.data();
          const userType = userInfo.userType;
          // localStorage.setItem('DBDATA', JSON.stringify((docSnap.data())));
          setUserContext({type: 'SET_DBDATA', payload: userInfo});
          if (props.user === "candidate") {
            if (userType === "candidate") {
              navigate("/candidate/profile");
            } else {
              alert("Your account is already registered as an employer!");
              return;
            }
          } 
          else {
            if (userType === "employer") {
              navigate("/employer/profile");
            } else {
              alert("Your account is already registered as a candidate!");
              return;
            }
          }
        } 
        else {
          if (props.user === "candidate") {
            navigate("/candidate/onboarding");
          } else {
            console.log('RUN FROM ONBOARDING...');
            navigate("/employer/onboarding");
          }
        }
        // if (props.user === "candidate") {
        //   if (!true) {
        //     navigate(`/${props.user}/profile`);
        //   }
        //   else {
        //     navigate(`/${props.user}/onboarding`);
        //   }
        // } else if (props.user === "employer") {
        //   if (!true) {
        //     navigate(`/${props.user}/profile`);
        //   }
        //   else {
        //     navigate(`/${props.user}/onboarding`);
        //   }
        // }
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
        // ...
      });
  };

  return (
    <div className={classes.authPage}>
      <h1>Welcome {props.user.toLowerCase()}, please sign in to continue </h1>
      <Button
        sx={{
          backgroundColor: "lightskyblue",
          color: "black",
          "&: hover": {
            color: "white",
            backgroundColor: "",
          },
        }}
        variant="contained"
        onClick={signIn}
      >
        Sign in with google
      </Button>
      {/* <button onClick={signIn}>Sign in with google</button> */}
    </div>
  );
}
