import { Book } from './types';

export const INITIAL_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Art of Racing in the Rain',
    author: 'Garth Stein',
    category: 'Fiction',
    isbn: '978-0061537967',
    status: 'Available',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1074&auto=format&fit=crop',
    year: 2008,
  },
  {
    id: '2',
    title: 'Adrian Newey: How to Build a Car',
    author: 'Adrian Newey',
    category: 'Biography',
    isbn: '978-0008196806',
    status: 'Borrowed',
    coverUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000&auto=format&fit=crop',
    year: 2017,
  },
  {
    id: '3',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Technology',
    isbn: '978-0132350884',
    status: 'Available',
    coverUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1000&auto=format&fit=crop',
    year: 2008,
  },
  {
    id: '4',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Classic',
    isbn: '978-0743273565',
    status: 'Reserved',
    coverUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1000&auto=format&fit=crop',
    year: 1925,
  }
];

export const CATEGORIES = ['Fiction', 'Non-Fiction', 'Technology', 'Biography', 'Science', 'Classic'];
