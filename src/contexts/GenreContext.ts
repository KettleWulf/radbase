import { createContext } from "react";
import type { Genre } from "../services/tmdb.types";


export const GenreContext = createContext<Genre[] | undefined>(undefined);