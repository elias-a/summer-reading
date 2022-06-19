import Realm from 'realm';
import { v4 as uuidv4 } from 'uuid';
import Book from './schema/book';
import Prize from './schema/prize';
import User from './schema/user';
import { prizes, user } from './data';

Realm.open({
  schema: [Book, Prize, User],
  path: 'app.realm',
}).then(realm => {
  realm.write(() => {
    for (let i = 0; i < 25; i++) {
      realm.create('Book', {
        id: uuidv4(),
        index: i,
        isCompleted: false,
      });
    }

    prizes.forEach((prize, i) => {
      realm.create('Prize', {
        id: uuidv4(),
        index: i,
        prize: prize,
      });
    });

    realm.create('User', {
      id: uuidv4(),
      name: user.name,
      password: user.password,
      session: '',
    });
  });
});
