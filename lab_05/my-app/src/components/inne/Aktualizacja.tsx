import { useState } from "react";

export default function Aktualizacja() {
  const [produkt, setState] = useState({ nazwa: "Pomidor", cena: 50 });

  const zaktualizujCene = () => {
    setState((prevState) => ({ ...prevState, cena: 100 }));
  };

  return (
    <>
    <h1>4.2 Aktualizacja</h1>
      <div>Aktualnie {produkt.nazwa} kosztuje {produkt.cena} zł</div>
      <button 
        type="button" 
        onClick={zaktualizujCene}
      >
        Zmień cenę na 100
      </button>
    </>
  );
}