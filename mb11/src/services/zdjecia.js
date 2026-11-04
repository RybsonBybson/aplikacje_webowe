/**
 * Obiekt przechowujący informacje o zdjęciu.
 * @typedef {Object} Zdjecie
 * @property {number} id - numer zdjęcia
 * @property {string} title - tytuł zdjęcia
 * @property {string} description - opis zdjęcia
 * @property {string} category - kategoria zdjęcia
 * @property {string} image - ścieżka do miniaturki
 * @property {string} imageLarge - ścieżka do większego zdjęcia
 * @property {string} alt - tekst alternatywny
 * @property {boolean} favorite - czy zdjęcie jest ulubione
 */

// Tutaj przechowujemy pobrane zdjęcia, żeby nie pobierać ich za każdym razem
let zdjecia = null;

/**
 * Pobiera zdjęcia z pliku photos.json.
 * Jeśli zdjęcia zostały już wcześniej pobrane, zwraca je bez ponownego pobierania.
 * @returns {Promise<Array<Zdjecie>>}
 */
export async function pobierzZdjecia() {
  if (zdjecia) return zdjecia;

  const odpowiedz = await fetch("/photos.json");

  if (!odpowiedz.ok) throw new Error("Błąd serwera: " + odpowiedz.status);

  zdjecia = await odpowiedz.json();
  return zdjecia;
}

/**
 * Wyszukuje zdjęcie po jego ID.
 * Jeśli nie znajdzie takiego zdjęcia, zwraca null.
 * @param {string|number} id
 * @returns {Promise<Zdjecie|null>}
 */
export async function pobierzZdjecie(id) {
  const lista = await pobierzZdjecia();
  return lista.find((z) => z.id === Number(id)) ?? null;
}

// Poniższe funkcje służą do zmieniania listy zdjęć.
// Każda z nich zwraca nową tablicę.

// Usuwa zdjęcie z listy na podstawie jego ID.
export function usunZdjecie(id) {
  zdjecia = zdjecia.filter((z) => z.id !== id);
  return zdjecia;
}

// Zmienia status ulubionego zdjęcia (true na false lub odwrotnie).
export function przelaczUlubione(id) {
  zdjecia = zdjecia.map((z) => (z.id === id ? { ...z, favorite: !z.favorite } : z));
  return zdjecia;
}

// Dodaje nowe zdjęcie na koniec listy i automatycznie nadaje mu ID.
export function dodajZdjecie(nowe) {
  const noweId = Math.max(...zdjecia.map((z) => z.id)) + 1;

  zdjecia = [...zdjecia, { ...nowe, id: noweId, favorite: false }];
  return zdjecia;
}
