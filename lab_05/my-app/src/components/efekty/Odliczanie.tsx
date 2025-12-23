import React, { useState, useEffect } from "react";

export default function Odliczanie() {
  const [licznik, setLicznik] = useState<number>(15.0);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;

    if (isActive && licznik > 0) {
      interval = setInterval(() => {
        setLicznik((prevTime) => {
          const nextTime = prevTime - 0.1;
          return nextTime > 0 ? nextTime : 0;
        });
      }, 100); 
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, licznik]);

  const getButtonText = () => {
    if (licznik <= 0) return "Odliczanie zakończone";
    return isActive ? "STOP" : "START";
  };

  return (
    <div>
      <h1>6.3 Odliczanie</h1>
      
      <div style={{ fontSize: "2rem", marginBottom: "20px" }}>
        Pozostało: {licznik.toFixed(1)} sek
      </div>

      <button
        onClick={() => setIsActive(!isActive)}
        disabled={licznik <= 0} 
      >
        {getButtonText()}
      </button>
    </div>
  );
}