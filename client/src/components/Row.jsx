import Book from './Book';
import Prize from './Prize';
import styles from './Row.module.css';

const Row = (props) => {
  return (
    <div class={styles.Row}>
      <For each={props.books.books}>
        {book => {
          return (
            <Book
              book={book}
              isCompleted={props.isCompleted}
              handleComplete={props.handleComplete}
              bookIndex={props.bookIndex}
              rowIndex={props.rowIndex}
            />
          );
        }}
      </For>
      <Prize
        prize={props.books.prize}
        isAwarded={props.isAwarded} 
      />
    </div>
  );
};

export default Row;
