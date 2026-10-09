import { useRef } from "react";
import Pozycja from "./Pozycja";
import portale from "./wariant29";

function App() {
  const imieNazwiskoRef = useRef(null);
  const numerFilmuRef = useRef(null);

  const zatwierdz = () => {
    if (
      !imieNazwiskoRef.current ||
      !numerFilmuRef.current ||
      imieNazwiskoRef.current.value.trim() == "" ||
      Number.isNaN(numerFilmuRef.current)
    )
      return;
    const imieNazwisko = imieNazwiskoRef.current.value;
    const numerFilmu = parseInt(numerFilmuRef.current.value);
    console.log(imieNazwisko);

    if (portale[numerFilmu - 1]) console.log(portale[numerFilmu - 1]);
    else console.error("Nieprawidłowy numer portalu społecznościowego");
  };

  return (
    <>
      <h1>Liczba filmów: {portale.length}</h1>
      <ol>
        {portale.map((pozycja, index) => (
          <Pozycja key={index} nazwa={pozycja} />
        ))}
      </ol>
      <form className="">
        <div className="mb-3">
          <label>Imię i nazwisko:</label>
          <input className="form-control" type="text" ref={imieNazwiskoRef} />
        </div>
        <div className="mb-3">
          <label>Numer portalu społecznościowego:</label>
          <input className="form-control" type="number" ref={numerFilmuRef} />
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            zatwierdz();
          }}
        >
          Zatwierdź wybór
        </button>
      </form>
    </>
  );
}

export default App;
