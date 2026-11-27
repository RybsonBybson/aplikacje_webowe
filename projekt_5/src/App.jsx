import { useState } from 'react'
import { zdjeciaStartowe } from './zdjecia.js'

const NAZWY_KATEGORII = { 1: 'Kwiaty', 2: 'Zwierzęta', 3: 'Samochody' }
const KATEGORIE = [1, 2, 3]

function App() {
  const [zdjecia, setZdjecia] = useState(zdjeciaStartowe)
  const [aktywneKategorie, setAktywneKategorie] = useState(KATEGORIE)
  const [opis, setOpis] = useState('')
  const [adres, setAdres] = useState('')
  const [kategoria, setKategoria] = useState('1')

  function przelaczKategorie(kategoria) {
    setAktywneKategorie(aktywne =>
      aktywne.includes(kategoria)
        ? aktywne.filter(k => k !== kategoria)
        : [...aktywne, kategoria]
    )
  }

  function pobierz(id) {
    setZdjecia(aktualneZdjecia =>
      aktualneZdjecia.map(zdjecie =>
        zdjecie.id === id
          ? { ...zdjecie, downloads: zdjecie.downloads + 1 }
          : zdjecie
      )
    )
  }

  function dodajZdjecie(event) {
    event.preventDefault()
    setZdjecia(aktualneZdjecia => {
      const noweId = Math.max(...aktualneZdjecia.map(zdjecie => zdjecie.id)) + 1

      return [
        ...aktualneZdjecia,
        {
          id: noweId,
          alt: opis,
          filename: adres,
          category: Number(kategoria),
          downloads: 0,
        },
      ]
    })
    setOpis('')
    setAdres('')
    setKategoria('1')
  }

  const widoczne = zdjecia.filter(z => aktywneKategorie.includes(z.category))

  return (
    <div className="container mt-4">
      <h1>Kategorie zdjęć</h1>

      <div className="d-flex flex-wrap gap-3 mb-3">
        {KATEGORIE.map(kategoria => (
          <div className="form-check form-switch" key={kategoria}>
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id={`kategoria-${kategoria}`}
              checked={aktywneKategorie.includes(kategoria)}
              onChange={() => przelaczKategorie(kategoria)}
            />
            <label className="form-check-label" htmlFor={`kategoria-${kategoria}`}>
              {NAZWY_KATEGORII[kategoria]}
            </label>
          </div>
        ))}
      </div>

      <div className="row g-3">
        {widoczne.map(zdjecie => (
          <div key={zdjecie.id} className="col-12 col-sm-6 col-md-4">
            <img src={zdjecie.filename} alt={zdjecie.alt} className="img-fluid rounded" />
            <h4 className="h6 mt-2">Pobrań: {zdjecie.downloads}</h4>
            <button type="button" className="btn btn-success btn-sm" onClick={() => pobierz(zdjecie.id)}>
              Pobierz
            </button>
          </div>
        ))}
      </div>

      <hr className="my-4" />

      <h2 className="h4">Dodaj zdjęcie</h2>
      <form onSubmit={dodajZdjecie} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="alt" className="form-label">Opis zdjęcia (alt)</label>
          <input
            id="alt"
            className="form-control"
            value={opis}
            onChange={event => setOpis(event.target.value)}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="kategoria" className="form-label">Kategoria</label>
          <select
            id="kategoria"
            className="form-select"
            value={kategoria}
            onChange={event => setKategoria(event.target.value)}
          >
            <option value="1">Kwiaty</option>
            <option value="2">Zwierzęta</option>
            <option value="3">Samochody</option>
          </select>
        </div>
        <div className="col-12">
          <label htmlFor="filename" className="form-label">Adres URL zdjęcia</label>
          <input
            id="filename"
            className="form-control"
            placeholder="https://…"
            value={adres}
            onChange={event => setAdres(event.target.value)}
            required
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Zapisz</button>
        </div>
      </form>
    </div>
  )
}

export default App
