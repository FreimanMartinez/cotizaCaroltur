import React, { useState } from "react";
import firebase from "../firebaseConfig/firebase";


function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loguear = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    // Inicio de sesión con Google
    firebase.auth().signInWithPopup(provider).then(result => {
      // Actualización del estado de login
      setIsLoggedIn(true);

      // Redireccionamiento a la página principal
      window.location.href = "/";
    });
  };
  console.log(isLoggedIn)
  return (
    <div>
        <h1>Despues a llorar {isLoggedIn}</h1>
        
      <button onClick={loguear}>iniciar</button>
      
    </div>
  );
}

export default Login;