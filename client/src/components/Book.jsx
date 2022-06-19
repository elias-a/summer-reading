import { VscBook } from 'solid-icons/vsc';
import styles from './Book.module.css';

const Book = (props) => {
  const handleClick = () => {
    if (props.book.index === props.bookIndex || props.bookIndex === props.book.index + 1) {
      props.handleComplete(
        props.book.id,
        !props.isCompleted[props.book.id],
        props.rowIndex,
        props.bookIndex,
      );
    }
  };

  return (
    <div class={styles.Book} onClick={handleClick}>
      <VscBook
        size={60}
        color={props.isCompleted[props.book.id] ? "green" : "#000"}
        class={styles.bookIcon}
      />
    </div>
  );
};

export default Book;
