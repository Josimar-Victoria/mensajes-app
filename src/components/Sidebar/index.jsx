import { Avatar, IconButton } from "@material-ui/core";
import { RateReviewOutlined, Search } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import db, { auth } from "../../firebase";
import SidebarChats from "../SidebarChats";
import style from "./styles.module.css";
export default function Sidebar() {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  const addChat = () => {
    const chatName = prompt("por favor ingrese un nombre de usuario");
    if(chatName){
      db.collection("chats").add({
        chatName: chatName,
      })
    }
  }

  return (
    <div className={style.sidebar}>
      <div className={style.sidebar__header}>
        <Avatar
          onClick={() => auth.signOut()}
          src={user?.phone}
          className={style.sidebar__avatar}
        />
        <div className={style.sidebar__input}>
          <Search />
          <input type="text" placeholder="Search" />
        </div>
        <IconButton variant="outlined" className={style.sidebar__inputButton}>
          <RateReviewOutlined onClick={addChat} />
        </IconButton>
      </div>
      <div className={style.sidebar__chats}>
        {chats.map(({ id, data: { chatName } }) => (
          <SidebarChats key={id} id={id} chatName={chatName} />
        ))}
      </div>
    </div>
  );
}
