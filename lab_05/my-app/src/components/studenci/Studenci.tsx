interface Student {
  imie: string;
  nazwisko: string;
  rok: number; 
}

const Students: Student[] = [
  { imie: "Jan", nazwisko: "Kowalski", rok: 2 },
  { imie: "Anna", nazwisko: "Nowak", rok: 3 },
  { imie: "Mateusz", nazwisko: "Kowalski", rok: 1 }
];

export default function Studenci() {
    return (
        <>
            <h1>5.1 Studenci</h1>
            <table border={1} style={{borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Rok studiów</th>
                    </tr>
                </thead>
                <tbody>
                    {Students.map((student, index) => (
                        <tr key={index}>
                            <td>{student.imie}</td>
                            <td>{student.nazwisko}</td>
                            <td>{student.rok}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}