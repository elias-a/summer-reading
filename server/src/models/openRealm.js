import Realm from "realm";
import Book from './schema/book';
import Prize from './schema/prize';
import User from './schema/user';

export const openRealm = async () => {
  const realm = await Realm.open({
    schema: [Book, Prize, User],
    path: 'app.realm',
  });

  return realm;
};
