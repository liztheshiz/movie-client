import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import MoviesList from '../movies-list/movies-list';

import './director-view.scss';

export class DirectorView extends React.Component {
    getYear(string) {
        let date = new Date(string);
        return date.getFullYear();
    }

    render() {
        const { movie, movies, onBackClick } = this.props;

        return (
            <Container className="director-view mt-5">
                <Row className="mt-5">
                    <Col sm={10}>
                        <Row className="mb-4">
                            <Col xs={2} s={1}>
                                <Button variant="outline-dark" size="sm" onClick={() => { onBackClick(null); }}>&lt;</Button>
                            </Col>
                            <Col className="director-name" xs={9} s={10}>
                                <h2 className="value">{movie.Director.Name.toUpperCase()}</h2>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center mb-4">
                            <Col className="director-birth" lg={10}>
                                <span className="label">Born: </span>
                                <span className="value">{this.getYear(movie.Director.Birth)}</span>
                            </Col>
                        </Row>
                        {movie.Director.Death && <Row className="justify-content-md-center mb-4">
                            <Col className="director-death" lg={10}>
                                <span className="label">Died: </span>
                                <span className="value">{this.getYear(movie.Director.Death)}</span>
                            </Col>
                        </Row>}
                        <Row className="justify-content-md-center mb-4">
                            <Col className="director-bio" lg={10}>
                                <span className="value">{movie.Director.Bio}</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col><h3>Movies with this director:</h3></Col>
                </Row>
                <MoviesList movies={movies} favMovies={[]} listType={"director"} name={movie.Director.Name} />
            </Container>
        );
    }
}

DirectorView.propTypes = {
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