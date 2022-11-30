import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import LastMessage from "./LastMessage";
import MessageArea from "./MessageArea";
import {
  collection,
  query,
  where,
  onSnapshot,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { v4 as uuidv4 } from "uuid";

function Conversation({ origin }) {
  console.log("From conversation: ", origin);
  const [mobileView, setMobileView] = useState(true);
  const [allLastMessages, setAllLastMessages] = useState([]);
  const [allConversation, setAllConversation] = useState(null);
  const [ongoingConversation, setOngoingConversation] = useState("");

  //Fetching last messages on load and sending them to the last message component
  const fetchLastMessages = async () => {
    const q = query(
      collection(db, "last_messages"),
      where(
        `${origin}Id`,
        "==",
        JSON.parse(localStorage.getItem("USERDATA")).uid
      )
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const lastMessagesCollection = [];
      querySnapshot.forEach((doc) => {
        lastMessagesCollection.push(doc.data());
      });
      setAllLastMessages(lastMessagesCollection);
    });
  };

  useEffect(() => {
    fetchLastMessages();
  }, []);

  //selectedConversation function receives the selected conversation data and sets it to a state
  const selectedConversation = async (convo) => {
    setOngoingConversation(convo);
    setMobileView(false);
    const q = query(
      collection(db, "oneToOneMessages"),
      where("conversationId", "==", convo.conversationId)
    );
    onSnapshot(q, (querySnapshot) => {
      const allConvo = [];
      querySnapshot.forEach((val) => {
        allConvo.push(val.data());
      });
      setAllConversation(allConvo);
    });
  };

  //postConversation posts the messages to the firestore db (oneToOneMessages and last_messages)
  const postConversation = async (text) => {
    console.log(ongoingConversation);
    const oneToOne = uuidv4();
    try {
      await setDoc(
        doc(db, "last_messages", ongoingConversation.lastMessageId),
        {
          lastMessage: text,
          creatAt: new Date().getTime(),
        },
        {
          merge: true,
        }
      );
      await setDoc(doc(db, "oneToOneMessages", oneToOne), {
        createdAt: new Date().getTime(),
        conversationId: ongoingConversation.conversationId,
        message: text,
        userId: JSON.parse(localStorage.getItem("USERDATA")).uid,
        userType: `${origin}`,
        employerId: ongoingConversation.employerId,
        candidateId: ongoingConversation.candidateId,
        candidateName: ongoingConversation.candidateName,
        employerName: ongoingConversation.employerName,
      });
    } catch (e) {
      console.log(e);
    }
  };

  //Set mobile view
  const changeView = () => {
    setMobileView(prevState => !prevState);
  }

  return (
    <Grid sx={{marginTop: '0 !important', backgroundImage: 'linear-gradient(to right, #ACC8E5, #ACC8E5)',}} container>
      <Grid
        md={4}
        xs={12}
        sx={{ display: { xs: mobileView ? "block" : "none", md: "block" } }}
        item
      >
        <LastMessage
          messages={allLastMessages}
          selectedConversation={selectedConversation}
          origin={`${origin}`}
        />
      </Grid>
      <Grid
        lg={8}
        md={8}
        xs={12}
        sx={{ display: { xs: mobileView ? "none" : "block", md: "block" }, margin: 'auto' }}
        item
      >
        <MessageArea
          allConversation={allConversation}
          postConversation={postConversation}
          origin={`${origin}`}
          changeView={changeView}
        />
      </Grid>
    </Grid>
  );
}

export default Conversation;
