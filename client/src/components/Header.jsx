import styles from './Header.module.css';

const Header = (props) => {
  return (
    <div class={styles.Header}>
      <h1>Summer Reading Challenge for {props.user.name}</h1>
    </div>
  );
};

export default Header;
