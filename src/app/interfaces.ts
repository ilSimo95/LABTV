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

export interface FilmDetail {
    actorList: Array<any> | null
    awards: string | null
    boxOffice: Array<any> | null
    companies: string  | null
    companyList: Array<any> | null
    contentRating: string | null
    countries: string | null
    countryList: Array<any> | null
    directorList: Array<any> | null
    directors: string | null
    errorMessage: string | null
    fullCast: null|string
    fullTitle: string | null
    genreList: Array<any> | null
    genres: string | null
    id: string | null
    imDbRating: string | null
    imDbRatingVotes: string | null
    image: string | null 
    images: null|Array<any>|string
    keywordList: Array<any> | null
    keywords: string | null
    languageList: Array<any> | null
    languages: string | null
    metacriticRating: string | null
    originalTitle: string | null
    plot: string | null
    plotLocal: string | null
    plotLocalIsRtl: boolean | null
    posters: null | string
    ratings: null | string
    releaseDate: string | null
    runtimeMins: string | null
    runtimeStr: string | null
    similars: Array<any> | null
    starList: Array<any> | null
    stars: string | null
    tagline: null | string
    title: string | null
    trailer: null | string
    tvEpisodeInfo: null | string
    tvSeriesInfo: null | string
    type: string | null
    wikipedia: string | null 
    writerList: Array<any> | null
    writers: string | null
    year: string | null
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