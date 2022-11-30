import React, { useContext, useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { DarkModeContext } from "../Context/DarkModeContext";

export default function MessageArea({
  allConversation,
  postConversation,
  origin,
  changeView,
  hideNavbar
}) {
  const [messageHolder, setMessageHolder] = useState("");
  const [head] = allConversation || [];
  const [mode, setMode]= useContext(DarkModeContext);
  const [focus, setFocus] = useState(false);

  const messageHandler = (e) => {
    setMessageHolder(e.target.value);
    // hideNavbar(true);
  };

  useEffect(() => {
    console.log('run');
    if(!focus){
      hideNavbar(false);
      return;
    }
    else{
      hideNavbar(true);
    }
  }, [focus])

  return allConversation ? (
    <div style={{ height: "92vh" }}>
      <Grid
        sx={{
          marginTop: { lg: "10px" },
          justifyContent: "center",
          alignItem: "center",
          height: '100%'
        }} // height: "100vh"
        container
      >
        <Grid
          sx={{
            height: { xs: "80vh" },
            position: "relative",
            width: { lg: "80%", xs: "100%" },
            overflowY: "scroll",
            border: { xs: 'none' ,sm:"4px solid #112A46"},
            borderWidth: "4px 4px 4px 4px",
            borderBottom: 'none !important',
            borderRadius: {xs:'none', sm: "10px 10px 0 0"},
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            minHeight: '90% !important',
          }}
          item
        >
          <div
            style={{
              position: "sticky",
              width: "100%",
              top: "0",
              backgroundColor: "#112A46",
              color: "white",
            }}
          >
            {/* <button style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)' }}>Back</button> */}
            <ArrowBackIosNewIcon
              sx={{
                position: "absolute",
                left: "10px",
                cursor: "pointer",
                top: "50%",
                transform: "translateY(-50%)",
              }}
              onClick={() => changeView()}
            />
            <h1>
              {head[`${origin === "candidate" ? "employer" : "candidate"}Name`]}
            </h1>
          </div>
          {allConversation
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((txt, i) => (
              <div
                key={i}
                style={{
                  padding: "10px",
                  margin: "10px",
                  backgroundColor: "#112A46",
                  color: "white",
                  minWidth: "50px",
                  alignSelf:
                    origin === txt.userType ? "flex-end" : "flex-start",
                  borderRadius: "5px",
                }}
              >
                <Typography sx={{ textAlign: "left" }} variant="p">
                  {txt.message}
                </Typography>
                <p style={{ textAlign: "right" }}>{`${new Date(txt.createdAt)
                  .getHours()
                  .toString()
                  .padStart(2, "0")}:${new Date(txt.createdAt)
                  .getMinutes()
                  .toString()
                  .padStart(2, "0")}`}</p>
              </div>
            ))}
        </Grid>
        <Grid
          sx={{
            border: {xs: 'none', sm:"4px solid #112A46"},
            borderWidth: "2px 4px 4px 4px",
            borderTop: 'none !important',
            width: { lg: "80%", xs: "100%" },
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "center",
            alignItems: "center",
            minHeight: '10% !important',
            borderRadius: {xs: 'none', sm:"0 0 5px 5px"},
            padding: '0 !important',
          }}
          item
        >
          <TextField
            sx={{
              width: { xs: "82%" },
              borderRadius: "5px 0 0 5px !important",
              backgroundColor: "white",
            }}
            placeholder="Text goes here..."
            onChange={messageHandler}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            value={messageHolder}
            type="text"
          />
          <Button
            sx={{
              minWidth: {xs: "18%"},
              padding: "15px 0",
              backgroundColor: "#112A46",
              color: "white",
            }}
            onClick={() => {
              messageHolder.length > 0 && postConversation(messageHolder);
              setMessageHolder("");
              hideNavbar(false);
            }}
            variant="outlined"
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </div>
  ) : (
    <p>Select a conversation</p>
  );
}
