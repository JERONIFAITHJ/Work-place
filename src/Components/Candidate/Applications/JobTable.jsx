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
import { DarkModeContext } from "../../Context/DarkModeContext";

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

export default function JobTable({ columnNames, jobDetails }) {
  const [mode] = useContext(DarkModeContext);
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
          {jobDetails.map((item, index) => {
            return (
              <StyledTableRow key={index}>
                <StyledTableCell sx={{color: mode.mode ? 'white':'black'}} align="center">
                  {item.employerName}
                </StyledTableCell>
                <StyledTableCell sx={{color: mode.mode ? 'white':'black'}} align="center">
                  {item.jobTitle}
                </StyledTableCell>
                <StyledTableCell sx={{color: mode.mode ? 'white':'black'}} align="center">
                  {item.location}
                </StyledTableCell>
                <StyledTableCell sx={{color: mode.mode ? 'white':'black'}} align="center">{item.status}</StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}