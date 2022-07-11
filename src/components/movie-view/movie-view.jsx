import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {

    // Adds given movie to given user's favorites list
    addToFavorites(movie) {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');

        axios.post(`https://cinemadatabase.herokuapp.com/users/${user}/FavoriteMovies/${movie._id}`, {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                alert('Movie added to list!');
                this.setState({
                    favorite: !this.state.favorite
                });
                // window.open(`/movies/titles/${movie._id}`, '_self');
                // window.location.reload();
            }).catch(err => console.log(err));
    }

    // Checks if movieid is already present in user's favorites list
    isFavorite(list, movie) {
        return list.includes(movie._id);
    }


    // LIFECYCLE METHODS

    constructor(props) {
        super(props);
        this.state = {
            favorite: this.isFavorite(this.props.userMovies, this.props.movie)
        };
    }

    /*componentDidUpdate() {
        this.state = {
            favorite: this.isFavorite(this.props.userMovies, this.props.movie)
        };
    }*/

    render() {
        const { movie, userMovies, onBackClick } = this.props;
        const { favorite } = this.state;

        return (
            <Container className="movie-view make-it-work mt-5">
                <Row className="justify-content-md-center mt-5">
                    <Col sm={9} lg={7}>
                        <Row className="mb-4">
                            <Col xs={2} s={1}>
                                <Button variant="outline-dark" size="sm" onClick={() => { onBackClick(null); }}>&lt;</Button>
                            </Col>
                            <Col className="movie-title" xs={8} s={10}>
                                <h2 className="value">{movie.Title.toUpperCase()}</h2>
                            </Col>
                            {!favorite && <Col xs={1}>
                                <Button className="fav-button" variant="outline-dark" type="submit" size="sm" onClick={() => { this.addToFavorites(movie); }}>&#9734;</Button>
                            </Col>}
                        </Row>
                        <Row className="justify-content-md-center mb-3">
                            <Col className="movie-director" lg={10}>
                                <span className="label">Director: </span>
                                <Link to={`/directors/${movie.Director.Name}`}>
                                    <Button variant="link">{movie.Director.Name}</Button>
                                </Link>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center mb-4">
                            <Col className="movie-genre" lg={10}>
                                <span className="label">Genre: </span>
                                <Link to={`/genres/${movie.Genre.Name}`}>
                                    <Button variant="link">{movie.Genre.Name}</Button>
                                </Link>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center mb-4">
                            <Col className="movie-description" lg={10}>
                                <span className="value">{movie.Description}</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="mb-4" sm={3}>
                        <img className="movie-poster" crossOrigin="anonymous" src={movie.ImagePath} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
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
    }).isRequired,
    userMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
    /*user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string
    }).isRequired,*/
    onBackClick: PropTypes.func.isRequired
}