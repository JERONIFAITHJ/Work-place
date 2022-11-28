import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import React, { useEffect, useState } from "react";
import ApplicantsTable from "./ApplicantsTable";

function Applicants() {
  const savedUserId = JSON.parse(localStorage.getItem("USERDATA")).uid;
  const [applicants, setApplicants] = useState();

  const fetchAllApplicants = async () => {
    const q = query(
      collection(db, "applications"),
      where("employerId", "==", savedUserId)
    );
    onSnapshot(q, (querySnapshot) => {
      const applications = [];
      querySnapshot.forEach((item) => applications.push(item.data()));
      console.log(applications);
      setApplicants(applications);
    });
  };

  useEffect(() => {
    fetchAllApplicants();
  }, []);

  return applicants && applicants.length > 0 ? (
    <ApplicantsTable fetchedApplicants={applicants}  /> 
  ) : applicants && applicants.length === 0 ? (
    <p>No Applicants</p>
  ) : (
    <p>Loading...</p>
  );
}

export default Applicants;