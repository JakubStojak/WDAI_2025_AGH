import { useState } from "react";

function Message({ pass1, pass2 }: { pass1: string; pass2: string }) {
  if (pass1 === "" && pass2 === "") {
    return <p>Proszę wprowadzić hasło</p>;
  }
  if (pass1 !== pass2) {
    return <p>Hasła nie są zgodne</p>;
  }
  return null;
}

const Haslo = () => {
  const [haslo1, setHaslo1] = useState<string>("");
  const [haslo2, setHaslo2] = useState<string>("");

  return (
    <>
      <h1>3.2 Hasło</h1>
      
      <input
        placeholder="Hasło"
        type="password"
        value={haslo1}
        onChange={(e) => setHaslo1(e.target.value)}
      />
      <br />

      <input
        placeholder="Powtórz Hasło"
        type="password"
        value={haslo2}
        onChange={(e) => setHaslo2(e.target.value)}
      />

      <div>
        <Message pass1={haslo1} pass2={haslo2} />
      </div>
    </>
  );
};

export default Haslo;