export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
  userType: UserType;
  accountStatus: AccountStatus;
  createdOn: string;
}

export enum AccountStatus {
  UNAPROOVED,
  ACTIVE,
  BLOCKED,
}

export enum UserType {
  ADMIN,
  STUDENT,
}

export interface BookCategory {
  id: number;
  category: string;
  subCategory: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  ordered: boolean;
  bookCategoryId: number;
  bookCategory: BookCategory;
}

export interface BooksByCategory {
  bookCategoryId: number;
  category: string;
  subCategory: string;
  books: Book[];
}

export interface Order {
  id: number;
  userId: number;
  userName: string | null;
  bookId: number;
  bookTitle: string;
  orderDate: string;
  returned: boolean;
  returnDate: string | null;
  finePaid: number;
}
