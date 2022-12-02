import { Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../Context/DarkModeContext";

export default function LastMessage({
  messages,
  selectedConversation,
  origin,
})
{
  const [mode] = useContext(DarkModeContext);
  // const [allInteractions, setAllInteractions] = useState([...new Set (messages.map(item => item[`${origin}Id`]))]);
  // console.log([...new Set (messages.map(item => item))]);
  // useEffect(() => {
  //   setAllInteractions(messages);
  // }, [messages]);
  return messages && messages.length > 0 ? (
    <Grid
      sx={{
        width: "100%",
        padding: "10px",
        flexDirection: "column",
        justifyContent: "center",
        gap: "20px",
        color: '#112A46'
      }}
      container
    >
      <h1 style={{color: mode.mode ? 'white' : 'black'}}>Your conversations</h1>
      {messages.map((item, index) => {
        return (
          <Grid
            sx={{
              border: mode.mode ? '3px solid black' :  "3px solid #112A46",
              borderRadius: "10px",
              padding: "10px",
              cursor: "pointer",
            }}
            key={index}
            onClick={() => selectedConversation(item)}
            item
          >
            <h3 style={{ margin: "0", marginBottom: "15px", color: mode.mode ? 'white' : 'black' }}>
              {origin === "candidate" ? item.employerName : item.candidateName}
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 10px",
                color: mode.mode ? 'white' : 'black'
              }}
            >
              <p style={{ textLign: "left" }}>
                {item.lastMessage.length > 15
                  ? `${item.lastMessage.slice(0, 25)}...`
                  : item.lastMessage}
              </p>
              <p>{`${new Date(item.creatAt)
                .getHours()
                .toString()
                .padStart(2, "0")}:${new Date(item.creatAt)
                .getMinutes()
                .toString()
                .padStart(2, "0")}`}</p>
            </div>
          </Grid>
        );
      })}
    </Grid>
  ) : messages && messages.length === 0 ? (
    <p>Start a conversation with someone!</p>
  ) : (
    <p>Loading...</p>
  );
}
