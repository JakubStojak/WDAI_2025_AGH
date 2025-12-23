import { useState } from "react";

interface Student {
  imie: string;
  nazwisko: string;
  rok: number;
}

export default function StudentManager() {
  const [studenci, setStudenci] = useState<Student[]>([
    { imie: "Jan", nazwisko: "Kowalski", rok: 2 },
    { imie: "Anna", nazwisko: "Nowak", rok: 3 },
    { imie: "Mateusz", nazwisko: "Kowalski", rok: 1 }
  ]);

  const [imie, setName] = useState("");
  const [nazwisko, setSurname] = useState("");
  const [rok, setYear] = useState("");

  const dodajStudenta = () => {
    if (imie === "" || nazwisko === "" || rok === "") return;

    const nowyStudent: Student = {
      imie: imie,
      nazwisko: nazwisko,
      rok: parseInt(rok) 
    };

    setStudenci((prevState) => [...prevState, nowyStudent]);
    
    setName("");
    setSurname("");
    setYear("");
  };

  return (
    <>
    <h1>5.2 Student Manager</h1>
    <div>
      
      <div>
        <input placeholder="Imię" value={imie} onChange={(e) => setName(e.target.value)} /><br />
        <input placeholder="Nazwisko" value={nazwisko} onChange={(e) => setSurname(e.target.value)} /><br />
        <input placeholder="Rok" type="number" value={rok} onChange={(e) => setYear(e.target.value)} /><br />
        <br></br>
        <button type="button" onClick={dodajStudenta}>Dodaj Studenta</button>
      </div>
      <br></br>

      <table border={1} style={{borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Rok studiów</th>
                    </tr>
                </thead>
                <tbody>
                    {studenci.map((student, index) => (
                        <tr key={index}>
                            <td>{student.imie}</td>
                            <td>{student.nazwisko}</td>
                            <td>{student.rok}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
    </>
  );
}