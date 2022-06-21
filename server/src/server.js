import express from 'express';
import cors from 'cors';
import { getBooks, updateBooks } from './models/tasks/book';
import { getPrizes } from './models/tasks/prize';
import {
  authenticate,
  createSession,
  getUser,
  validateSession,
} from './models/tasks/user';

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:20001',
  ],
  exposedHeaders: ['sessionid', 'content-type'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (req.headers.sessionid) {
    res.setHeader('sessionid', req.headers.sessionid);
  } else {
    res.setHeader('sessionid', '');
  }
  
  next();
});

app.use(express.static('build'));

app.post('/api/authenticate', async (req, res) => {
  const isSessionValid = await validateSession(req.headers.sessionid);
  if (isSessionValid) {
    getUser(req.headers.sessionid).then(user => {
      res.json({ user });
      return;
    });
  } else {
    const { password } = req.body;

    authenticate(password).then(user => {
      if (!user) {
        res.json({ user: null });
        return;
      }
  
      createSession(user.id).then(sessionId => {
        res.setHeader('sessionid', sessionId);
        res.json({ user });
      });
    });
  }
});

app.get('/api/get-books', async (req, res) => {
  const isSessionValid = await validateSession(req.headers.sessionid);
  if (!isSessionValid) {
    res.json(null);
    return;
  }

  Promise.all([getBooks(), getPrizes()]).then(data => {
    const [bookData, prizeData] = data;

    const isCompleted = {};
    bookData.forEach(book => {
      isCompleted[book.id] = book.isCompleted;
    });

    const rowLengths = [2, 3, 5, 5, 10];
    const indices = [];
    let previousLength = 0;
    for (let i = 0; i < rowLengths.length; i++) {
      const currentLength = rowLengths[i];

      const prizeObject = prizeData.find(p => p.index === i);
      let prize = '';
      if (prizeObject) {
        prize = prizeObject.prize;
      }

      indices.push({
        books: bookData.slice(previousLength, previousLength + currentLength),
        prize: prize,
      });
      previousLength += currentLength;
    }

    let rowIndex = 0;
    let bookIndex = 0;
    indices.forEach((row, i) => {
      row.books.forEach(book => {
        if (isCompleted[book.id]) {
          rowIndex = i;
          if ([1, 4, 9, 14, 24].includes(book.index)) {
            rowIndex = i + 1;
          }
          bookIndex = book.index + 1;
        }
      });
    });

    res.json({ books: { isCompleted, indices, row: rowIndex, book: bookIndex } });
  });
});

app.post('/api/update-is-completed', async (req, res) => {
  const { id, isCompleted } = req.body;

  const isSessionValid = await validateSession(req.headers.sessionid);
  if (!isSessionValid) {
    res.json(null);
    return;
  }

  updateBooks(id, isCompleted);
  res.json({});
});

const PORT = 20001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
