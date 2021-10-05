import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
// import {PersistGate} from 'redux-persist/es/integration/react';
// import {getPersistor} from '@rematch/persist';

// load store
import {store} from './src/core/store';
// load routes
import AppNavigator from './src/core/navigators';

// load app configurations
import './src/shared/utils/assets-pack';
import './src/shared/utils/colors-pack';
import './src/shared/utils/typography-pack';

export default function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={getPersistor()}> */}
        <AppNavigator />
      {/* </PersistGate> */}
    </Provider>
  );
}
