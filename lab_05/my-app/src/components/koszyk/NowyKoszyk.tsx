import Produkt from "./Produkt";

const Produkty = ["Jabłko", "Gruszka", "Czekolada", "Sok", "Woda"]

const NowyKoszyk = () => (
  <>
  <h1>1.2 Nowy Koszyk</h1>
    <div>
        {Produkty.map((prod) => <Produkt nazwa={prod} />)}
      </div>
    
  </>
)

export default NowyKoszyk;