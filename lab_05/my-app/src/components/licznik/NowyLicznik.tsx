import { useState } from "react";
import Przycisk from "./Przycisk";

const Licznik = () => {
    const [count, setCount] = useState<number>(0);

    const increment = () => {
        setCount((prevCount) => prevCount + 1);
    };

    return (
        <>
            <h1>2.2 Nowy Licznik</h1>
            <p>{count}</p>
            <Przycisk onClickAction={increment} />
        </>
    );
};

export default Licznik;