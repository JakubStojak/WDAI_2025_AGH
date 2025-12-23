import { useState } from "react";

const handleLogin = (pass1: string, pass2: string) => {
  if (pass1 === pass2) {
    alert("Zalogowano poprawnie");
  } else {
    alert("Hasła nie są zgodne");
  }
};

export default function Logowanie() {
  const [username, setUsername] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  const isFormEmpty = username === "" || pass1 === "" || pass2 === "";

  return (
    <>
    <h1>3.3 Logowanie</h1>
    <div>
      <input 
        placeholder="Użytkownik" 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <br></br>
      <input 
        type="password" 
        placeholder="Hasło" 
        onChange={(e) => setPass1(e.target.value)} 
      />
      <br></br>
      <input 
        type="password" 
        placeholder="Powtórz hasło" 
        onChange={(e) => setPass2(e.target.value)} 
      />
      <br></br>
      <button 
        type="button" 
        disabled={isFormEmpty}
        onClick={() => handleLogin(pass1, pass2)}
      >
        Zaloguj
      </button>
    </div>
    </>
  );
}