import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book, addBook, removeBook, selectAllBooks, selectAddedBooks } from '../app-store';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: Observable<Book[]> = this.store.select(selectAllBooks)

  addedBooks: Observable<Book[]> = this.store.select(selectAddedBooks)

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  onAddBook(bookId) {
    console.log(bookId)
    this.store.dispatch(addBook({ bookId }));
  }

  onRemoveBook(bookId) {
    this.store.dispatch(removeBook({ bookId }));
  }
}
