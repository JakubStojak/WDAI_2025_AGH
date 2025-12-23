import { useState } from 'react';

const Licznik = () => {

    const [count, setCount] = useState<number>(() => {
        const saved = localStorage.getItem("clickcount");
        return saved ? Number(saved) : 0;
    });

    const clickCounter = () => {
        const nextCount = count + 1;
        setCount(nextCount); 
        localStorage.setItem("clickcount", nextCount.toString()); 
    };

    return (
        <>
            <h1>Licznik</h1>
            <button onClick={clickCounter}>
                Zwiększ
            </button>
            <p>Wartość: {count}</p>
        </>
    );
};

export default Licznik;