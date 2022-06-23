import { createSignal } from 'solid-js';
import AuthScreen from './AuthScreen';
import Header from './Header';
import Library from './Library';
import styles from './App.module.css';

const App = () => {
  const [user, setUser] = createSignal(null);

  return (
    <div class={styles.App}>
      <Show when={user()} fallback={<AuthScreen setUser={setUser} />}>
        <>
          <Header user={user()} />
          <Library />
        </>
      </Show>
    </div>
  );
};

export default App;
