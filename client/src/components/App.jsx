import { createSignal, createResource } from 'solid-js';
import { getUser } from '../api/users';
import AuthScreen from './AuthScreen';
import Header from './Header';
import Library from './Library';
import styles from './App.module.css';

const App = () => {
  const [session, setSession] = createSignal('');
  const [user] = createResource(session, getUser);

  setSession(sessionStorage.getItem('sessionid'));

  return (
    <div class={styles.App}>
      <Show when={user()} fallback={<AuthScreen setSession={setSession} />}>
        <>
          <Header user={user()} />
          <Library />
        </>
      </Show>
    </div>
  );
};

export default App;
