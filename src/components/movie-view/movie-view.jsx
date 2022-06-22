import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component {
    /*escapeToHome(e) {
        if (e.key === 'Escape') {
            console.log('Returning home');
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.escapeToHome);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.escapeToHome);
    }*/

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Container className="movie-view border-dark border-3 mt-5">
                <Row className="mt-5">
                    <Col sm={10}>
                        <Row className="mb-4">
                            <Col xs={1}>
                                <Button variant="outline-dark" size="sm" onClick={() => { onBackClick(null); }}>&lt;</Button>
                            </Col>
                            <Col className="movie-title" xs={11}>
                                <h2 className="value">{movie.Title}</h2>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center mb-3">
                            <Col className="movie-director" lg={10}>
                                <span className="label">Director: </span>
                                <span className="value">{movie.Director.Name}</span>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center mb-4">
                            <Col className="movie-genre" lg={10}>
                                <span className="label">Genre: </span>
                                <span className="value">{movie.Genre.Name}</span>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center mb-4">
                            <Col className="movie-description" lg={10}>
                                <span className="label">Description: </span>
                                <span className="value">{movie.Description}</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="movie-poster" sm={2}>
                        <img src={movie.ImagePath} />
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
    onBackClick: PropTypes.func.isRequired
}