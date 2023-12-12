import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Book, BookCategory } from '../../models/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../shared/services/api.service';

export interface CategoryOption {
  displayValue: string;
  value: number;
}

@Component({
  selector: 'maintenance',
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.scss',
})
export class MaintenanceComponent {
  newCategory: FormGroup;
  newBook: FormGroup;
  deleteBook: FormControl;
  categoryOptions: CategoryOption[] = [];

  constructor(
    fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.newCategory = fb.group({
      category: fb.control('', [Validators.required]),
      subCategory: fb.control('', [Validators.required]),
    });

    this.newBook = fb.group({
      title: fb.control('', [Validators.required]),
      author: fb.control('', [Validators.required]),
      price: fb.control(0, [Validators.required]),
      category: fb.control(-1, [Validators.required]),
    });

    apiService.getCategories().subscribe({
      next: (res: BookCategory[]) => {
        res.forEach((c) => {
          this.categoryOptions.push({
            value: c.id,
            displayValue: `${c.category} / ${c.subCategory}`,
          });
        });
      },
    });

    this.deleteBook = fb.control('', [Validators.required]);
  }

  addNewCategory() {
    let bookCategory: BookCategory = {
      id: 0,
      category: this.newCategory.get('category')?.value,
      subCategory: this.newCategory.get('subCategory')?.value,
    };
    this.apiService.addNewCategory(bookCategory).subscribe({
      next: (res) => {
        if (res === 'cannot insert') {
          this.snackBar.open('Already Exists!', 'OK');
        } else {
          this.snackBar.open('INSERTED', 'OK');
        }
      },
    });
  }

  addNewBook() {
    let book: Book = {
      id: 0,
      title: this.newBook.get('title')?.value,
      author: this.newBook.get('author')?.value,
      bookCategoryId: this.newBook.get('category')?.value,
      price: this.newBook.get('price')?.value,
      bookCategory: { id: 0, category: '', subCategory: '' },
      ordered: false,
    };

    this.apiService.addBook(book).subscribe({
      next: (res) => {
        if (res === 'inserted') this.snackBar.open('Book Added', 'OK');
      },
    });
  }

  deleteExistingBook() {
    let id = this.deleteBook.value;
    this.apiService.deleteBook(id).subscribe({
      next: (res) => {
        if (res === 'deleted')
          this.snackBar.open('Book has been Deleted!', 'OK');
      },
      error: (err) => this.snackBar.open('Book does not Exist!', 'OK'),
    });
  }
}
