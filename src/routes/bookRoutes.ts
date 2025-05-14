import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  importBooks
} from '../controllers/bookController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', (req: Request, res: Response, next: NextFunction) => getBooks(req, res, next));
router.get('/:id', (req: Request, res: Response, next: NextFunction) => getBookById(req, res, next));
router.post('/', (req: Request, res: Response, next: NextFunction) => addBook(req, res, next));
router.put('/:id', (req: Request, res: Response, next: NextFunction) => updateBook(req, res, next));
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => deleteBook(req, res, next));
router.post('/import', upload.single('file'), (req: Request, res: Response, next: NextFunction) => importBooks(req, res, next));

export default router;
