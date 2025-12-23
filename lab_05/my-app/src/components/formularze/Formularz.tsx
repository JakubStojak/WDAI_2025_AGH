import { useState } from "react";

const Formularz = () => {

    const [text, setText] = useState<string>("");

    return (
        <>
        <h1>3.1 Formularz</h1>
        <input 
            type="text"
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setText(e.target.value);}}
        />
        <div>
            <h1>{text}</h1>
        </div>
        </>
    )
}

export default Formularz;