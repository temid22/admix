import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";

import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { ContextProvider } from "./SideBarContextProvider";

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ContextProvider>
            <App />
          </ContextProvider>
        </PersistGate>
      </Provider>
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
