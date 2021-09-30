import { IconButton } from "@material-ui/core";
import { MicNone } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectchatId, selectchatName } from "../../features/chatSlice";
import db from "../../firebase";
import Message from "../Message";
import style from "./styles.module.css";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import { selectUser } from "../../features/userSlice";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessage] = useState([]);
  const user = useSelector(selectUser);
  const chatName = useSelector(selectchatName);
  const chatId = useSelector(selectchatId);

  useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessage(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("chats").doc(chatId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      phone: user.phone,
      email: user.email,
      displayName: user.displayName,
    });
    setInput("");
  };

  return (
    <div className={style.chat}>
      <div className={style.Chat__header}>
        <h4>
          To:<span className={style.Chat__name}> {chatName}</span>
        </h4>
        <strong>Detalles</strong>
      </div>
      <div className={style.chat__mesages}>
        {messages.map(({ id, data }) => (
          <Message key={id} contents={data} />
        ))}
      </div>

      <div className={style.chat__input}>
        <form className={style.text}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Menssajes"
          />
          <button onClick={sendMessage} type="submit">
            Enviar
          </button>
        </form>
        <IconButton>
          <MicNone className={style.chat__mic} />
        </IconButton>
      </div>
    </div>
  );
}
