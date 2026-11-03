/**
 * @typedef {Object} Zdjecie
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {string} image
 * @property {string} imageLarge
 * @property {string} alt
 * @property {boolean} favorite
 */

let zdjecia = null;

/**
 * Pobiera zdjęcia z pliku photos.json.
 * Jeśli zdjęcia zostały już wcześniej pobrane, nie pobiera ich ponownie.
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
 * Pobiera zdjęcie o podanym id.
 * Jeśli nie znajdzie takiego zdjęcia, zwraca null.
 * @param {string|number} id
 * @returns {Promise<Zdjecie|null>}
 */
export async function pobierzZdjecie(id) {
  const lista = await pobierzZdjecia();
  return lista.find((z) => z.id === Number(id)) ?? null;
}

/**
 * Usuwa zdjęcie o podanym id z listy.
 * Zwraca nową listę zdjęć.
 * @param {number} id
 * @returns {Array<Zdjecie>}
 */
export function usunZdjecie(id) {
  zdjecia = zdjecia.filter((z) => z.id !== id);
  return zdjecia;
}

/**
 * Zmienia status ulubionego zdjęcia.
 * Jeśli było ulubione, przestaje nim być i odwrotnie.
 * @param {number} id
 * @returns {Array<Zdjecie>}
 */
export function przelaczUlubione(id) {
  zdjecia = zdjecia.map((z) => (z.id === id ? { ...z, favorite: !z.favorite } : z));
  return zdjecia;
}

/**
 * Dodaje nowe zdjęcie do listy.
 * Automatycznie nadaje mu kolejne id.
 * @param {{title: string, description: string, category: string, image: string, imageLarge: string, alt: string}} nowe
 * @returns {Array<Zdjecie>}
 */
export function dodajZdjecie(nowe) {
  const noweId = Math.max(...zdjecia.map((z) => z.id)) + 1;
  zdjecia = [...zdjecia, { ...nowe, id: noweId, favorite: false }];
  return zdjecia;
}
