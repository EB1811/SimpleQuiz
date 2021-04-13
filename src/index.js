import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";

// Redux
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./Store/Reducers/rootReducer";
import { Provider } from "react-redux";

// Thunk
import thunk from "redux-thunk";

// Firebase
import fbConfig from "./config/fbConfig";
import {
    reduxFirestore,
    getFirestore,
    createFirestoreInstance,
} from "redux-firestore";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import firebase from "firebase/app";

const reduxStore = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
        reduxFirestore(firebase, fbConfig)
    )
);

// Regarding firestore packages.
const profileSpecificProps = {
    userProfile: "users",
    useFirestoreForProfile: true,
};

const rrfProps = {
    firebase,
    config: fbConfig,
    // eslint-disable-next-line
    config: profileSpecificProps,
    dispatch: reduxStore.dispatch,
    createFirestoreInstance,
};

ReactDOM.render(
    <Provider store={reduxStore}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <Router>
                <App />
            </Router>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
