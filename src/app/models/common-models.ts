export type TYPES_OF_ROUTES = 'tv' | 'movie' | 'person';

export type ROUTE_LIST = 'top-rated' | 'popular' | 'latest' | 'now-playing' | 'upcoming';

export enum Types_of_Routes {
    TV = 'tv',
    MOVIE = 'movie',
    PERSON = 'person'
}

export interface Response_Data {
    page: number;
    results: any[];
    total_pages: number;
    total_results: number;
}

export type UrlQueryParam = {
    with_original_language?: string;
    language?: string;
    page?: number;
};