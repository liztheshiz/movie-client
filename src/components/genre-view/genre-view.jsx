import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import MoviesList from '../movies-list/movies-list';

import './genre-view.scss';

export class GenreView extends React.Component {
    render() {
        const { movie, movies, onBackClick } = this.props;

        return (
            <Container className="genre-view mt-5">
                <Row className="my-5">
                    <Col className="mb-4" xs={2} s={1}>
                        <Button variant="outline-dark" size="sm" onClick={() => { onBackClick(null); }}>&lt;</Button>
                    </Col>
                    <Col className="genre-info" sm={10} md={9} xl={8}>
                        <Row className="justify-content-sm-center mb-4">
                            <Col className="genre-name" xs={10}>
                                <h2 className="value">{movie.Genre.Name.toUpperCase()}</h2>
                            </Col>
                        </Row>
                        <Row className="justify-content-sm-center mb-4">
                            <Col className="genre-description" xs={11} sm={10}>
                                <span className="value">{movie.Genre.Description}</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="mt-5 mb-3">
                    <Col><h3>Movies with this genre:</h3></Col>
                </Row>
                <MoviesList movies={movies} favMovies={[]} listType={"genre"} name={movie.Genre.Name} />
            </Container>
        );
    }
}

GenreView.propTypes = {
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
    onBackClick: PropTypes.func.isRequired
}