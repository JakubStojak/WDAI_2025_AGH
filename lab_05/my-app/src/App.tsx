import React from 'react';
import './App.css';
import Koszyk from './components/koszyk/Koszyk';
import NowyKoszyk from './components/koszyk/NowyKoszyk';
import Licznik from './components/licznik/Licznik';
import NowyLicznik from './components/licznik/NowyLicznik';
import Formularz from './components/formularze/Formularz'
import Haslo from './components/formularze/Hasło';
import Logowanie from './components/formularze/Logowanie';
import Ternary from './components/inne/Ternary';
import Aktualizacja from './components/inne/Aktualizacja';
import Studenci from './components/studenci/Studenci';
import StudentManager from './components/studenci/StudentManager';
import Licznik2 from './components/efekty/Licznik2';
import Tytul from './components/efekty/Tytuł';
import Odliczanie from './components/efekty/Odliczanie';
import Komentarze from './components/komentarze/Komentarze'

function App() {
  return (
    <>
      <Koszyk />
      <br></br>
      <NowyKoszyk />
      <br></br>
      <Licznik />
      <br></br>
      <NowyLicznik />
      <br></br> 
      <Formularz />
      <br></br>
      <Haslo />
      <br></br>
      <Logowanie />
      <br></br>
      <Ternary />
      <br></br>
      <Aktualizacja />
      <br></br>
      <Studenci />
      <br></br>
      <StudentManager />
      <br></br>
      <Licznik2 />
      <br></br>
      <Tytul />
      <br></br>
      <Odliczanie />
      <br></br>
      <Komentarze />
      </>
  );
}

export default App;