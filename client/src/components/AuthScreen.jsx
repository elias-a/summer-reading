import { createSignal } from 'solid-js';
import { BsArrowRightCircle } from 'solid-icons/bs';
import styles from './AuthScreen.module.css';

const AuthScreen = (props) => {
  const [password, setPassword] = createSignal('');
  
  return (
    <div class={styles.AuthScreen}>
      <div class={styles.modal}>
        <div class={styles.labelSection}>
          <label for="password" class={styles.label}>Enter Password:</label>
        </div>
        <div class={styles.inputSection}>
          <input
            id="password"
            class={styles.input}
            type="password"
            tabIndex="1"
            value={password()}
            onInput={e => setPassword(e.currentTarget.value)}
          />
        </div>
        <div class={styles.submitSection}>
          <BsArrowRightCircle
            size={32}
            color="#000000"
            onClick={() => props.setPassword(password())}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
