import React, { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function MessageArea({
  allConversation,
  postConversation,
  origin,
  changeView
}) {
  const [messageHolder, setMessageHolder] = useState("");
  const [head] = allConversation || [];

  const messageHandler = (e) => {
    setMessageHolder(e.target.value);
  };

  return allConversation ? (
    <Grid
      sx={{
        marginTop: { lg: "10px" },
        justifyContent: "center",
        alignItem: "center",
      }} // height: "100vh"
      container
    >
      <Grid
        sx={{
          height: { xs: "80vh" },
          position: "relative",
          width: { lg: "80%", xs: "100%" },
          overflowY: "scroll",
          border: "4px solid #112A46",
          borderWidth: '4px 4px 2px 4px',
          borderRadius: "10px 10px 0 0",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
        item
      >
        <div
          style={{
            position: "sticky",
            width: "100%",
            top: "0",
            backgroundColor: "#112A46",
            color: 'white'
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
                color: 'white',
                minWidth: "50px",
                alignSelf: origin === txt.userType ? "flex-end" : "flex-start",
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
          border: "4px solid #112A46",
          borderWidth: '2px 4px 4px 4px',
          width: { lg: "80%", xs: "100%" },
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: '0 0 5px 5px'
        }}
        item
      >
        <TextField
          sx={{
            width: { xs: "90%", lg: "90%" },
            borderRadius: "5px 0 0 5px !important",
            backgroundColor: 'white'
          }}
          placeholder='Text goes here...'
          onChange={messageHandler}
          value={messageHolder}
          type="text"
        />
        <Button
          sx={{ width: "10%", padding: "15px 0", backgroundColor: '#112A46', color: 'white' }}
          onClick={() => {
            messageHolder.length > 0 && postConversation(messageHolder);
            setMessageHolder("");
          }}
          variant="outlined"
        >
          Send
        </Button>
      </Grid>
    </Grid>
  ) : (
    <p>Select a conversation</p>
  );
}
