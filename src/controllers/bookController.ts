import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Book, books } from '../models/bookModel';
import fs from 'fs';

export const getBooks = (req: Request, res: Response, next: NextFunction): Response | void => {
  try {
    return res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};

export const getBookById = (req: Request, res: Response, next: NextFunction): Response | void => {
  try {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};

export const addBook = (req: Request, res: Response, next: NextFunction): Response | void => {
  try {
    const { title, author, publishedYear } = req.body;
    if (!title || !author || !publishedYear) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newBook: Book = {
      id: uuidv4(),
      title,
      author,
      publishedYear: Number(publishedYear)
    };

    books.push(newBook);
    return res.status(201).json(newBook);
  } catch (err) {
    next(err);
  }
};

export const updateBook = (req: Request, res: Response, next: NextFunction): Response | void => {
  try {
    const { title, author, publishedYear } = req.body;
    const { id } = req.params;
    const index = books.findIndex(b => b.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Book not found' });
    }

    books[index] = {
      ...books[index],
      title,
      author,
      publishedYear: Number(publishedYear)
    };

    return res.status(200).json(books[index]);
  } catch (err) {
    next(err);
  }
};

export const deleteBook = (req: Request, res: Response, next: NextFunction): Response | void => {
  try {
    const { id } = req.params;
    const index = books.findIndex(b => b.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Book not found' });
    }

    books.splice(index, 1);
    return res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export const importBooks = (req: Request, res: Response, next: NextFunction): Response | void => {
  try {
    const filePath = req.file?.path;
    if (!filePath) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const rows = content.trim().split('\n');
    const headers = rows[0].split(',');

    let addedBooksCount = 0;
    const errorRows: string[] = [];

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(',');
      const book: any = {};
      headers.forEach((key, index) => {
        book[key.trim()] = row[index]?.trim();
      });

      if (!book.title || !book.author || isNaN(Number(book.publishedYear))) {
        errorRows.push(`Row ${i + 1}: Invalid data`);
        continue;
      }

      const newBook: Book = {
        id: uuidv4(),
        title: book.title,
        author: book.author,
        publishedYear: Number(book.publishedYear)
      };

      books.push(newBook);
      addedBooksCount++;
    }

    fs.unlinkSync(filePath);

    return res.status(200).json({
      addedBooksCount,
      errorRows
    });
  } catch (err) {
    next(err);
  }
};
