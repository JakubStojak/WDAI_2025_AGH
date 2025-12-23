import { useState } from "react";

const Licznik = () => {
	const [count, setCount] = useState<number>(0);

	return (
		<>
			<h1>2.1 Licznik</h1>
			<p>{count}</p>
			<button onClick={() => setCount((prevCount: number) => prevCount + 1)}>
				Zwiększ
			</button>
		</>
	);
};

export default Licznik;