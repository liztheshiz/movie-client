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
            <Container className="movie-view">
                <Row className="justify-content-md-center mt-5">
                    <Col className="movie-poster" md={10}>
                        <img src={movie.ImagePath} />
                    </Col>
                </Row>
                <Row className="justify-content-md-center my-4">
                    <Col className="movie-title" md={10}>
                        <h2 className="value">{movie.Title}</h2>
                    </Col>
                </Row>
                <Row className="justify-content-md-center mb-3">
                    <Col className="movie-director" md={10}>
                        <span className="label">Director: </span>
                        <span className="value">{movie.Director.Name}</span>
                    </Col>
                </Row>
                <Row className="justify-content-md-center mb-4">
                    <Col className="movie-genre" md={10}>
                        <span className="label">Genre: </span>
                        <span className="value">{movie.Genre.Name}</span>
                    </Col>
                </Row>
                <Row className="justify-content-md-center mb-4">
                    <Col className="movie-description" md={10}>
                        <span className="label">Description: </span>
                        <span className="value">{movie.Description}</span>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md={10}>
                        <Button variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
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