import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Book } from "../app-store";

@Injectable({ providedIn: 'root' })
export class BooksService {
    constructor(private http: HttpClient) { }

    getBooks(): Observable<Array<Book>> {
        console.log('get books')
        return this.http
            .get<{ items: Book[] }>(
                'https://www.googleapis.com/books/v1/volumes?maxResults=5&orderBy=relevance&q=oliver%20sacks'
            )
            .pipe(map((books) => {
                console.log(books)
                return books.items || []
            }));
    }
}