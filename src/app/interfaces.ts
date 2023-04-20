export interface Contatto {
    nome: string
    cognome: string
    email: string
    telefono: string
    messaggio: string
    condizioni: boolean
}

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

export interface FilmContainer {
    errorMessage: string
    items: Film[]
}

export interface Register {
    username: string
    email: string
    password: string
    ripetiPassword: string
    termini: boolean
}

export interface Login {
    email: string;
    password: string;
}

export interface User {
    email: string;
    id: number;
    nome: string;
}

export interface LoggedUser {
    user: User;
    accessToken: string;
}