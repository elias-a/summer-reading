import { createResource, createSignal } from 'solid-js';
import { getBooks, updateIsCompleted } from '../api/books';
import Row from './Row';
import styles from './Library.module.css';

const Library = () => {
  const [books, { mutate }] = createResource(getBooks);

  const handleComplete = (id, isCompleted, row, book) => {
    updateIsCompleted({ id, isCompleted });

    const newIsCompleted = { ...books().isCompleted };
    newIsCompleted[id] = isCompleted;

    let newRow = row;
    if ([1, 4, 9, 14, 24].includes(book) && isCompleted) {
      newRow++;
    }
    if ([1, 4, 9, 14, 24].includes(book - 1) && !isCompleted) {
      newRow = Math.max(0, newRow - 1);
    }

    mutate({
      ...books(),
      isCompleted: newIsCompleted,
      row: newRow,
      book: isCompleted ? book + 1 : Math.max(0, book - 1),
    });
  };

  return (
    <div class={styles.Library}>
      <Show when={!books.loading}>
        <Index each={books().indices}>
          {(book, index) => {
            return (
              <Row
                books={book()}
                isCompleted={books().isCompleted}
                handleComplete={handleComplete}
                bookIndex={books().book}
                rowIndex={books().row}
                isAwarded={books().row > index}
              />
            );
          }}
        </Index>
      </Show>
    </div>
  );
};

export default Library;
