import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthBloc from "./bloc/AuthBloc";
import {AdminRoute} from "./AdminRoute";
import LoginPage from "./components/auth/LoginPage";
import {BrowserRouter as Router, Route} from 'react-router-dom'

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
AuthBloc.instance.isLoggedIn();
AuthBloc.instance.authToken.subscribe({
    next(x) {
        ReactDOM.render(
            <Router>
                <AdminRoute path="*" exact component={App} isAuthenticated={!!x}/>
                <Route
                    path="/login"
                    exact
                    component={LoginPage}
                />
            </Router>,
            document.getElementById('root')
        );
    },
    error(err) { console.error('something wrong occurred: ' + err); },
    complete() { console.log('done'); }
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
