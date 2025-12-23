import { useState, useEffect } from 'react';

export default function Tytul() {
    const [title, setTitle] = useState<string>("Tytuł początkowy");

    useEffect(() => {
        document.title = title;
        
        console.log("Tytuł strony zmieniony na:", title);
    }, [title]); 

    return (
        <div>
            <h1>6.2 Tytuł</h1>
            <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Wpisz nowy tytuł..."
            />
            <p>Aktualny wpis: {title}</p>
        </div>
    );
}