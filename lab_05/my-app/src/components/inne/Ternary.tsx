let a = true 
let b = false 

export default function Ternary() {
    return (
        <>
        <h1>4.1 Ternary</h1>
        <div>
            {a ? <p>"Stwierdzenie a jest prawdziwe"</p> : <p>"Stwierdzenie a jest fałszywe"</p>}
        </div>
        <div>
            {b ? <p>"Stwierdzenie b jest prawdziwe"</p> : <p>"Stwierdzenie b jest fałszywe"</p>}
        </div>
        </>
    )
}