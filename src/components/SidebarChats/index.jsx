import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setChat } from "../../features/chatSlice";
import db from "../../firebase";
import * as timeago from 'timeago.js'
import style from "./styles.module.css";
export default function SidebarChats({ id, chatName }) {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([]);
  useEffect(() => {
    db.collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatInfo(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);
  return (
    <div
      onClick={() =>
        dispatch(
          setChat({
            chatId: id,
            chatName: chatName,
          })
        )
      }
      className={style.sidebarChats}
    >
      <Avatar src={chatInfo[0]?.photo} />
      <div className={style.sidebarChats__info}>
        <h4>{chatName}</h4>
        <p>{chatInfo[0]?.message}</p>
        <small>
          { new Date(chatInfo[0]?.timestamp?.toDate()).toLocaleString()}
        </small>
      </div>
    </div>
  );
}
