import React, { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";

export default function MessageArea({
  allConversation,
  postConversation,
  origin,
}) {
  const [messageHolder, setMessageHolder] = useState("");
  const [head] = allConversation || [];

  const messageHandler = (e) => {
    setMessageHolder(e.target.value);
  };

  return allConversation ? (
    <Grid
      sx={{ height: "100vh", justifyContent: "center", alignItem: "center" }}
      container
    >
      <Grid
        sx={{
          height: { xs: "90vh" },
          position: "relative",
          width: { lg: "80%", xs: "100%" },
          overflowY: "scroll",
          border: "4px solid lavender",
          borderRadius: "10px",
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
            backgroundColor: "lavender",
          }}
        >
          <h1>
            {head[`${origin === "candidate" ? "employer" : "candidate"}Name`]}
          </h1>
        </div>
        {allConversation.sort((a, b) => a.createdAt - b.createdAt).map((txt, i) => (
          <div
            key={i}
            style={{
              padding: "10px",
              border: "2px solid lavender",
              margin: "10px",
              backgroundColor: "lavender",
              minWidth: "50px",
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
          width: { lg: "80%", xs: "100%" },
        }}
        item
      >
        <TextField
          sx={{
            width: { xs: "80%", lg: "90%" },
            borderRadius: "5px 0 0 5px !important",
          }}
          onChange={messageHandler}
          value={messageHolder}
          type="text"
        />
        <Button
          sx={{ width: "10%", padding: "15px 0" }}
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
