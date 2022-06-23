import { createSignal } from 'solid-js';
import { BsArrowRightCircle } from 'solid-icons/bs';
import { authenticate } from '../api/users';
import styles from './AuthScreen.module.css';

const AuthScreen = (props) => {
  const [password, setPassword] = createSignal('');
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [error, setError] = createSignal(false);

  const updatePassword = (event) => {
    setPassword(event.currentTarget.value);
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    setIsSubmitting(true);
    authenticate(password()).then(user => {
      if (user) {
        props.setUser(user);
      } else {
        setError(true);
      }

      setIsSubmitting(false);
    });
  };

  return (
    <div class={styles.AuthScreen}>
      <div class={styles.modal}>
        <form class={styles.form} onSubmit={handleSubmit}>
          <div class={styles.labelSection}>
            <label for="password" class={styles.label}>Enter Password:</label>
          </div>
          <div class={styles.inputSection}>
            <div>
              <input
                id="password"
                class={`${error() ? styles.error : ''}`}
                type="password"
                autoComplete="password"
                value={password()}
                onInput={e => updatePassword(e)}
              />
              <Show when={error()}>
                <p class={styles.errorMessage}>Incorrect password</p>
              </Show>
            </div>
          </div>
          <div class={styles.submitSection}>
            <Show
              when={!isSubmitting()}
              fallback={<div class={styles.loader} />}
            >
              <BsArrowRightCircle
                size={32}
                color="#000"
                onClick={handleSubmit}
                class={styles.submitButton}
              />
            </Show>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthScreen;
