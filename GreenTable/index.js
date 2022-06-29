/**
 * @format
 */
 import React from 'react';
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import App from './App';
import { name as appName } from './app.json';
import { persistor, Store } from "./src/core/Redux/store";
import { PersistGate } from "redux-persist/integration/react";

const RNRedux = () => (
    <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
         </PersistGate>
 </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
