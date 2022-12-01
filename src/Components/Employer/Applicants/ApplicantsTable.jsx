import * as React from "react";
import { useContext } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { DarkModeContext } from "../../Context/DarkModeContext";

const columnNames = [
  { title: "Applicant", key: "Applicant" },
  { title: "Job Title", key: "Job Title" },
  { title: "Applicant Mail", key: "Applicant Mail" },
  { title: "Status", key: "Status" },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const acceptApplication = async (applicant) => {
  const lastMessageId = uuidv4();
  const oneToOneId = uuidv4();
  try {
    await setDoc(
      doc(db, "applications", applicant.applicationId),
      {
        status: "approved",
      },
      {
        merge: true,
      }
    );
  } catch (e) {
    console.log(e);
  }
  try {
    await setDoc(doc(db, "last_messages", lastMessageId), {
      lastMessage: `Hey ${applicant.candidateName}, you have been shortlisted for the ${applicant.jobTitle} role`,
      creatAt: new Date().getTime(),
      employerId: applicant.employerId, //important
      candidateId: applicant.candidateId, //important
      jobId: applicant.jobId,
      applicationId: applicant.applicationId,
      lastMessageId: lastMessageId,
      candidateName: applicant.candidateName,
      employerName: applicant.employerName,
      conversationId: `${JSON.parse(localStorage.getItem("USERDATA")).uid}-${
        applicant.candidateId
      }`, //important
    });

    await setDoc(doc(db, "oneToOneMessages", oneToOneId), {
      createdAt: new Date().getTime(),
      conversationId: `${JSON.parse(localStorage.getItem("USERDATA")).uid}-${
        applicant.candidateId
      }`,
      userId: `${JSON.parse(localStorage.getItem("USERDATA")).uid}`,
      userType: "employer",
      message: `Hey ${applicant.candidateName}, you have been shortlisted for the ${applicant.jobTitle} role`,
      employerId: applicant.employerId,
      candidateId: applicant.candidateId,
      candidateName: applicant.candidateName,
      employerName: applicant.employerName,
    });
  } catch (e) {
    console.log(e);
  }
};

const rejectApplication = async (application) => {
  await deleteDoc(doc(db, "applications", application.applicationId));
};

export default function ApplicantsTable({ fetchedApplicants }) {
  const [mode, setMode] = React.useContext(DarkModeContext);
  return (
    <div style={{minHeight: '100vh', padding:'20px 0 100px 0',backgroundColor: mode.mode ? '#0d1117': 'white'}}>
      <h1 style={{marginTop: '0', color: mode.mode ? 'white' : 'black'}}>Application Details</h1>
      <TableContainer
        sx={{ marginBottom: "100px", paddingTop: "10px", backgroundColor: mode.mode ? 'black':'white' }}
        component={Paper}
      >
        <Table sx={{ minWidth: 700}} aria-label="customized table">
          <TableHead sx={{backgroundColor: mode.mode ? 'black':'white', color: mode.mode ? 'white':'black'}}>
            <TableRow>
              {columnNames.map((item) => {
                return (
                  <StyledTableCell sx={{backgroundColor: mode.mode ? 'black':'white'}} key={item.key} align="center">
                    {item.title}
                  </StyledTableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {fetchedApplicants.map((item, index) => {
              return (
                <StyledTableRow
                  sx={{
                    color: mode.mode ? 'white !important':'black !important',
                    opacity: item.status === "approved" ? "0.4" : "1",
                    pointerEvents:
                      item.status === "approved" ? "none" : "unset",
                  }}
                  key={index}
                >
                  <StyledTableCell sx={{color: mode.mode ? 'white':'black'}} align="center">
                    {item.candidateName}
                  </StyledTableCell>
                  <StyledTableCell sx={{color: mode.mode ? 'white':'black'}} align="center">
                    {item.jobTitle}
                  </StyledTableCell>
                  <StyledTableCell sx={{color: mode.mode ? 'white':'black'}} align="center">
                    {item.candidateMail}
                  </StyledTableCell>
                  <StyledTableCell  align="center">
                    <Button
                      sx={{
                        color: "green",
                        border: "green",
                        "&: hover": { color: "green", border: "green" },
                        fontWeight: '500'
                      }}
                      variant="outlined"
                      onClick={() => acceptApplication(item)}
                    >
                      {item.status === "approved" ? "Approved!" : "Accept"}
                    </Button>
                    {item.status === "applied" && (
                      <Button
                        sx={{
                          color: "red",
                          border: "red",
                          "&: hover": { color: "red", border: "red" },
                        }}
                        variant="outlined"
                        onClick={() => rejectApplication(item)}
                      >
                        Reject
                      </Button>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
