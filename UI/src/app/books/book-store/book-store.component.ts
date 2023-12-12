import { Component } from '@angular/core';
import { Book, BooksByCategory } from '../../models/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'book-store',
  templateUrl: './book-store.component.html',
  styleUrl: './book-store.component.scss',
})
export class BookStoreComponent {
  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'price',
    'available',
    'order',
  ];
  books: Book[] = [];
  booksToDisplay: BooksByCategory[] = [
    {
      bookCategoryId: 1,
      category: 'C',
      subCategory: 'S',
      books: [
        {
          id: 1,
          title: 'T',
          author: 'A',
          price: 100,
          ordered: false,
          bookCategoryId: 1,
          bookCategory: { id: 1, category: '', subCategory: '' },
        },
      ],
    },
  ];

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {
    apiService.getBooks().subscribe({
      next: (res: Book[]) => {
        this.books = [];
        res.forEach((b) => this.books.push(b));

        this.updateList();
      },
    });
  }

  updateList() {
    this.booksToDisplay = [];
    for (let book of this.books) {
      let categoryExists = false;
      let categoryBook: BooksByCategory | null;
      for (let bookToDisplay of this.booksToDisplay) {
        if (bookToDisplay.bookCategoryId == book.bookCategoryId) {
          categoryExists = true;
          categoryBook = bookToDisplay;
        }
      }

      if (categoryExists) {
        categoryBook!.books.push(book);
      } else {
        this.booksToDisplay.push({
          bookCategoryId: book.bookCategoryId,
          category: book.bookCategory.category,
          subCategory: book.bookCategory.subCategory,
          books: [book],
        });
      }
    }
  }

  searchBooks(value: string) {
    this.updateList();
    value = value.toLowerCase();
    this.booksToDisplay = this.booksToDisplay.filter((bookToDisplay) => {
      bookToDisplay.books = bookToDisplay.books.filter((book) => {
        return book.title.toLowerCase().includes(value);
      });
      return bookToDisplay.books.length > 0;
    });
  }

  getBookCount() {
    let count = 0;
    this.booksToDisplay.forEach((b) => (count += b.books.length));
    return count;
  }

  orderBook(book: Book) {
    this.apiService.orderBook(book).subscribe({
      next: (res) => {
        if (res === 'ordered') {
          book.ordered = true;
          let today = new Date();
          let returnDate = new Date();
          returnDate.setDate(today.getDate() + 10);

          this.snackBar.open(
            book.title +
              ' has been ordered! You will have to return on ' +
              returnDate.toDateString(),
            'OK'
          );
        } else {
          this.snackBar.open(
            'You already have 3 orders pending to return.',
            'OK'
          );
        }
      },
    });
  }
}
