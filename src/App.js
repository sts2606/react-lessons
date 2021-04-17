import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route } from 'react-router-dom';
// import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { initializeApp } from './redux/reducers/appReducer';
import Preloader from './components/common/Preloader/Preloader';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/redux-store';
import { withSuspense } from './hoc/withSuspense';

const DialogsContainer = lazy(() =>
  import('./components/Dialogs/DialogsContainer')
);

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Route
            render={() => <ProfileContainer store={this.props.store} />}
            path="/profile/:userId?"
          />
          <Route
            render={withSuspense(DialogsContainer)}
            path="/dialogs"
            exact
          />
          <Route render={() => <UsersContainer />} path="/users" exact />
          <Route render={() => <Login />} path="/login" exact />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
  };
};

const AppContainer = connect(mapStateToProps, { initializeApp })(App);
const MainApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default MainApp;
