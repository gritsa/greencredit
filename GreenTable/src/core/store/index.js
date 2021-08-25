import {init} from '@rematch/core';
import createPersistPlugin from '@rematch/persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {authStore} from './auth';

const persistPlugin = createPersistPlugin({
  key: 'root',
  storage: AsyncStorage,
  version: 2,
  whitelist: ['auth'],
});

export const storeModels = {
  auth: authStore,
};

export const store = init({
  models: storeModels,
  plugins: [persistPlugin],
});
