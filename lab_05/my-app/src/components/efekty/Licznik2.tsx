import { useState, useEffect } from 'react';

const Licznik_2 = () => {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        console.log("Hello world");
    }, []);

    useEffect(() => {
        if (count > 0) {
            console.log(`Licznik zwiększył się do ${count}`);
        }
    }, [count]);

    return (
        <>
            <h1>6.1 Licznik</h1>
            <p>{count}</p> 
            <button onClick={() => setCount(prevCount => prevCount + 1)}>
                Zwiększ
            </button>
        </>
    );
};

export default Licznik_2;