import { createSignal, createResource } from 'solid-js';
import { authenticate } from '../api/users';
import AuthScreen from './AuthScreen';
import Header from './Header';
import Library from './Library';
import styles from './App.module.css';

const App = () => {
  const [password, setPassword] = createSignal('');
  const [user] = createResource(password, authenticate);

  return (
    <div class={styles.App}>
      <Show when={user()} fallback={<AuthScreen setPassword={setPassword} />}>
        <>
          <Header user={user()} />
          <Library />
        </>
      </Show>
    </div>
  );
};

export default App;
