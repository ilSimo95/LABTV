// --- interfaccia che descrive un modello Contatto del form Contatti ---
export interface Contatto {
    nome: string
    cognome: string
    email: string
    telefono: string
    messaggio: string
    condizioni: boolean
}

// --- interfaccia che definisce un modello per la risposta dei film che arrivano in blocco dal server API IMBD ---
export interface FilmContainer {
    errorMessage: string
    items: Film[]
}

// --- interfaccia che definisce un modello Film per i film in risposta dalle API IMDB ---
export interface Film {
    crew: string
    fullTitle: string
    id: string
    imDbRating: string
    imDbRatingCount: string
    image: string
    rank: string
    rankUpDown: string
    title: string
    year: string
}

// --- interfaccia che definisce un modello per i film che inviamo con una API POST a http:localhost:3000/films-acquistati/ ---
export interface BuyedFilmPost {
    userId: number
    film: Film
}

// --- interfaccia che definisce un modello per i film che arrivano in risposta da una API GET a http:localhost:3000/films-acquistati/ ---
export interface BuyedFilm {
    userId: number
    film: Film
    id: number
}

// --- interfaccia che definisce un modello che rappresenta l'utente che deve registrarsi al sito ---
export interface Register {
    username: string
    email: string
    password: string
    termini: boolean
}

// --- interfaccia che definisce un modello che rappresenta l'utente che deve loggarsi al sito ---
export interface Login {
    email: string
    password: string
}

// --- interfaccia che definisce un modello di utente ricevuto in risposta da GET a http:localhost:3000/register/ o http:localhost:3000/login/ ---
export interface User {
    id: number
    email: string
    username: string
    ripetiPassword: string
    termini: boolean
}

// --- interfaccia che definisce un modello di utente ricevuto in risposta da GET a http:localhost:3000/login/ ---
export interface LoggedUser {
    user: User
    accessToken: string
}