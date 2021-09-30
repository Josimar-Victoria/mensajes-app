import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Imessage from "./components/Imessage";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import Login from "./pages/Login";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch()

  useEffect(() => {
   auth.onAuthStateChanged((authUser) => {
     if(authUser){
       //el usuario ha iniciado sesión
       dispatch(
         login({
           uid: authUser.uid,
           phone: authUser.photoURL,
           email: authUser.email,
           displayName: authUser.displayName,
         })
       )
     }else{
       //El usuario está desconectado
       dispatch(logout())
     }
   })
  },[dispatch])

  return <div className="app">{user ? <Imessage /> : <Login />}</div>;
}

export default App;
