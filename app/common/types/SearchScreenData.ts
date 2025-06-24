import { Classrooms } from "./Classrooms"
import { Professor } from "./Professor"

export type SearchScreenData = {
    query: string,
}

export type SearchResultType = {
    professors: Professor[],
    classrooms: Classrooms[]
}