import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createAction, createReducer, createSelector, on, props } from "@ngrx/store";
import { mergeMap, map, catchError, EMPTY } from "rxjs";
import { BooksService } from "./book/book.service";

////////////////////////////////////////entity///////////////////////////////////////////
export interface Book {
    id: string;
    volumeInfo: {
        title: string;
        authors: Array<string>;
    };
    isAdded: boolean;
}

export interface BookState extends EntityState<Book[]> { id: string }

export const bookAdapter: EntityAdapter<Book> = createEntityAdapter<Book>()

export const initialState = bookAdapter.getInitialState()

////////////////////////////////////////action////////////////////////////////////////////

export const addBook = createAction(
    '[Book] Add Book',
    props<{ bookId: string }>()
);

export const removeBook = createAction(
    '[Book] Remove Book',
    props<{ bookId: string }>()
);

export const loadBooks = createAction('[Book] load books');


export const getBookSuccess = createAction(
    '[Book] Retrieve Books Success',
    props<{ books: Book[] }>()
);

////////////////////////////////////////////////reducer//////////////////////////////////////

export const bookReducer = createReducer(
    initialState,
    on(getBookSuccess, (state, { books }) => {
        console.log(books)
        return bookAdapter.setAll(books, state)
    }),

    on(addBook, (state, { bookId }) => bookAdapter.updateOne(
        {
            id: bookId,
            changes: {
                isAdded: true
            }
        },
        state
    )),

    on(removeBook,(state,{bookId})=>bookAdapter.updateOne(
        {
            id: bookId,
            changes: {
                isAdded: false
            }
        },
        state
    ))

)
// //////////////////////////////////////////effects//////////////////////////////////////////////

@Injectable()
export class BookEffects {
    constructor(
        private actions$: Actions,
        private bookService: BooksService
    ) { }
    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType('[Book] load books'),
        mergeMap(() => this.bookService.getBooks()
            .pipe(
                map(books => getBookSuccess({ books })),
                catchError(() => EMPTY)
            ))
    ));
}

//////////////////////////////////////////////selector//////////////////////////////////////

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = bookAdapter.getSelectors((s:any)=>s.books);

// select the array of book ids
export const selectBookIds = selectIds;
 
// select the dictionary of book entities
export const selectBookEntities = selectEntities;
 
// select the array of books
export const selectAllBooks = selectAll;
 
// select the total book count
export const selectBookTotal = selectTotal;

export const selectAddedBooks = createSelector(
    selectAllBooks,
    books=>{
        console.log('books',books)
        return books.filter(book=>book.isAdded)
    }
)

