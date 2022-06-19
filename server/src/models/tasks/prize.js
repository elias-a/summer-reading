import { openRealm } from '../openRealm';
import { parseJson } from '../../utils/parseJson';

export const getPrizes = async () => {
  const realm = await openRealm();
  return parseJson(realm.objects('Prize'));
};
