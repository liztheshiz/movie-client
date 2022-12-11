import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { connect } from 'react-redux';
import { setMovies, setUser } from '../../actions/actions';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import MoviesList from '../movies-list/movies-list';
import MovieView from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { AboutView } from '../about-view/about-view';
import { MyNavbar } from '../navbar/navbar';

import './main-view.scss';

class MainView extends React.Component {
    // CUSTOM METHODS

    // Gets movie list from database and adds list to 'movies' var in store
    getMovies(token) {
        axios.get('http://ec2-35-172-250-209.compute-1.amazonaws.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            this.props.setMovies(res.data);
        }).catch(err => console.log(err));
    }

    // Gets user from database using username from local storage (put there after login) and adds user to 'user' var in store
    getUser(token) {
        axios.get(`http://ec2-35-172-250-209.compute-1.amazonaws.com/users/${localStorage.getItem('user')}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            this.props.setUser(res.data)
        }).catch(err => console.log(err));
    }

    // When user successfully logs in, saves user and movies in the store, and user + JWT in local storage
    onLoggedIn(authData) {
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
        this.getUser(authData.token);
    }


    // LIFECYCLE METHODS

    render() {
        const { movies, user } = this.props;

        return (
            <Router>
                <MyNavbar />
                <Container>
                    <Row className="justify-content-md-center main-view">
                        <Switch>
                            <Route exact path="/" render={() => {
                                // If no user is present, displays LoginView. When user logs in, user is passed as a prop to LoginView
                                if (!localStorage.getItem('user')) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                if (movies.length === 0) return <div className="main-view loading">Loading...</div>

                                return (
                                    <div>
                                        <Row className="mt-5 mb-4">
                                            <h1>WELCOME, {user.Username}!</h1>
                                        </Row>
                                        <MoviesList movies={movies} listType="main" />
                                    </div>
                                )
                            }} />
                            <Route exact path="/about" render={() => {
                                return (
                                    <AboutView />
                                )
                            }} />
                            <Route exact path="/register" render={() => {
                                if (localStorage.getItem('user')) return <Redirect to="/" />
                                return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} />
                            }} />
                            <Route path="/movies/titles/:movieid" render={({ match, history }) => {
                                if (!localStorage.getItem('user')) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                if (movies.length === 0) return <div className="main-view loading">Loading...</div>

                                return (
                                    <Col sm={10}>
                                        <MovieView movie={movies.find(m => m._id === match.params.movieid)} userMovies={user.FavoriteMovies} getUser={this.getUser} onBackClick={() => history.goBack()} />
                                    </Col>
                                )
                            }} />
                            <Route path="/directors/:director" render={({ match, history }) => {
                                if (!localStorage.getItem('user')) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                if (movies.length === 0) return <div className="main-view loading">Loading...</div>

                                return (
                                    <Col sm={10}>
                                        <DirectorView movie={movies.find(m => m.Director.Name === match.params.director)} movies={movies} onBackClick={() => history.goBack()} />
                                    </Col>
                                )
                            }} />
                            <Route path="/genres/:genre" render={({ match, history }) => {
                                if (!localStorage.getItem('user')) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                if (movies.length === 0) return <div className="main-view loading">Loading...</div>

                                return (
                                    <Col sm={10}>
                                        <GenreView movie={movies.find(m => m.Genre.Name === match.params.genre)} movies={movies} onBackClick={() => history.goBack()} />
                                    </Col>
                                )
                            }} />
                            <Route path={`/users/${user.Username}`} render={() => {
                                if (!localStorage.getItem('user')) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                return (
                                    <Col sm={12}>
                                        <ProfileView user={user} movies={movies} />
                                    </Col>
                                )
                            }} />
                        </Switch>
                    </Row>
                </Container>
            </Router>
        );
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken) {
            this.getMovies(accessToken);
            this.getUser(accessToken);
        }
    }
}

// Connects component to store
let mapStateToProps = state => {
    return { movies: state.movies, user: state.user }
}

// Export component with store props connected
export default connect(mapStateToProps, { setMovies, setUser })(MainView);

MainView.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string
        }),
        ImagePath: PropTypes.string.isRequired
    })).isRequired,
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string
    }).isRequired
}