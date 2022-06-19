import { v4 as uuidv4 } from 'uuid';
import { openRealm } from '../openRealm';
import { parseJson } from '../../utils/parseJson';

export const authenticate = async (password) => {
  const realm = await openRealm();

  const users = realm.objects('User');
  const authenticatedUser = parseJson(users.filtered(`password == "${password}"`));

  if (authenticatedUser.length > 0) {
    return authenticatedUser[0];
  } else {
    return null;
  }
};

export const createSession = async (id) => {
  const realm = await openRealm();
  const uuid = uuidv4();

  realm.write(() => {
    realm.create(
      'User',
      {
        id: id,
        session: uuid,
      },
      Realm.UpdateMode.Modified,
    );
  });

  return uuid;
};

export const getUser = async (session) => {
  const realm = await openRealm();

  const users = realm.objects('User');
  const user = parseJson(users.filtered(`session == "${session}"`));

  if (user.length > 0) {
    return user[0];
  } else {
    return null;
  }
};

export const validateSession = async (session) => {
  const realm = await openRealm();

  const users = realm.objects('User');
  const user = parseJson(users.filtered(`session == "${session}"`));

  if (user.length > 0) {
    return true;
  } else {
    return false;
  }
};
