import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './Components/Layout';
import { AuthContextComponent } from './AuthContext';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import MyBookmarks from './Pages/MyBookmarks';
import PrivateRoute from './PrivateRoute';
import Home from './Pages/Home';
import Logout from './Pages/Logout';
import AddBookmark from './Pages/AddBookmark';

export default class App extends Component {
    render() {
        return (
            <AuthContextComponent>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/logout' component={Logout} />
                    <PrivateRoute exact path='/my-bookmarks' component={MyBookmarks} />
                    <PrivateRoute exact path='/add-bookmark' component={AddBookmark} />
                </Layout>
            </AuthContextComponent>
        )
    }
}