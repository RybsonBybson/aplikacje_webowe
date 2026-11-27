import { useState } from 'react'
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import './App.css'
import { wydarzenia } from './wydarzenia.js'

const MIASTA = [...new Set(wydarzenia.map(w => w.miasto))]

function ListaWydarzenPage() {
  const [aktywneMiasta, setAktywneMiasta] = useState(MIASTA)

  function przelaczMiasto(miasto) {
    setAktywneMiasta(aktywne =>
      aktywne.includes(miasto)
        ? aktywne.filter(m => m !== miasto)
        : [...aktywne, miasto]
    )
  }

  const widoczne = wydarzenia.filter(wydarzenie =>
    aktywneMiasta.includes(wydarzenie.miasto)
  )

  return (
    <div className="container mt-4">
      <h1>Wydarzenia i Koncerty</h1>

      <div className='d-flex flex-wrap gap-3 mb-3'>
        {MIASTA.map(miasto => (
          <div className='form-check form-switch' key={miasto}>
            <input
              className="form-check-input"
              role='switch'
              id={`miasto-${miasto}`}
              checked={aktywneMiasta.includes(miasto)}
              onChange={() => przelaczMiasto(miasto)}
              type="checkbox" />
            <label className="form-check-label" htmlFor={`miasto-${miasto}`}>{miasto}</label>
          </div>
        ))}
      </div>

      <div className="row g-3">
        {widoczne.map(wydarzenie => (
          <div key={wydarzenie.id} className='col-12 col-md-4'>
            <div className='card h-100'>
              <div className="card-body">
                <h3 className='card-title h5'>{wydarzenie.nazwa}</h3>
                <p className='text-body-secondary mb-2'>{wydarzenie.miasto} - {wydarzenie.data}</p>
                <Link to={`/wydarzenie/${wydarzenie.id}`} 
                className='btn btn-outline-primary btn-sm'>Szczegóły</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SzczegolyWydarzeniaPage() {
  const { id } = useParams()
  const wydarzenie = wydarzenia.find(w => w.id === Number(id))
  const navigate = useNavigate()

  if(!wydarzenie){
    return(
      <div className='container mt-4'>
        <div className='alert alert-warning'>
          Nie znaleziono wydarzenia o numerze {id}
        </div>
        <button className='btn btn-outline-secondary' onClick={() => navigate(-1)}>Wstecz</button>
      </div>
    )
  }

  return (
    <div className='container mt-4'>
      <h1>{wydarzenie.nazwa}</h1>
      <p>Miasto: {wydarzenie.miasto}</p>
      <p>Data: {wydarzenie.data}</p>
      <p>Cena: {wydarzenie.cena === 0 ? 'wstęp wolny' : `${wydarzenie.cena} zł`}</p>
      <button className='btn btn-outline-secondary' onClick={() => navigate(-1)}>Wstecz</button>
    </div>
  )
}

function NotFoundPage(){
  return(
    <div className='container mt-1'>
      <h1>Nie ma takiej strony</h1>
      <Link to="/">Wróc do listy</Link>
    </div>
  )
}

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ListaWydarzenPage />} />
        <Route path='/wydarzenie/:id' element={<SzczegolyWydarzeniaPage />}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </>
  )
}

export default App
