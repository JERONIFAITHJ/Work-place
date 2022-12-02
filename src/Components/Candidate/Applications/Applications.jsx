import React, { useEffect, useState } from "react";
import { query, collection, onSnapshot, where } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import JobTable from "./JobTable";

function Applications() {
  const savedUserId = JSON.parse(localStorage.getItem("USERDATA")).uid;
  const [fetchedJobs, setFetchedJobs] = useState();

  const fetchAppliedJobs = async () => {
    const q = query(
      collection(db, "applications"),
      where("candidateId", "==", savedUserId)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const jobs = [];
      querySnapshot.forEach((doc) => {
        jobs.push(doc.data());
      });
      console.log(jobs);
      setFetchedJobs(jobs);
    });
  };

  const columnNames = [
    { title: "Posted By", key: "Posted By" },
    { title: "Job Title", key: "Job Title" },
    { title: "Location", key: "Location" },
    { title: "Status", key: "Status" },
  ];

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  return fetchedJobs && fetchedJobs.length > 0 ? (
    <div>
      <JobTable columnNames={columnNames} jobDetails={fetchedJobs} />
    </div>
  ) : fetchedJobs && fetchedJobs.length === 0 ? (
    <p>No jobs applied!</p>
  ) : (
    <p>Loading...</p>
  );
}

export default Applications;
