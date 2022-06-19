import { openRealm } from '../openRealm';
import { parseJson } from '../../utils/parseJson';

export const getBooks = async () => {
  const realm = await openRealm();
  return parseJson(realm.objects('Book'));
};

export const updateBooks = async (id, isCompleted) => {
  const realm = await openRealm();

  realm.write(() => {
    realm.create(
      'Book',
      {
        id: id,
        isCompleted: isCompleted,
      },
      Realm.UpdateMode.Modified,
    );
  });
};
