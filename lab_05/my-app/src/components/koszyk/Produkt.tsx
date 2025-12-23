interface ProduktProps {
  nazwa: string;
}

const Produkt = ({ nazwa }: ProduktProps) => (
  <div>{nazwa}</div>
);

export default Produkt;