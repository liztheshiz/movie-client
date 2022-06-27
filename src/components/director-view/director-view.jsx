import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export class DirectorView extends React.Component {
    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Container className="director-view border-dark border-3 mt-5">
                <Row className="mt-5">
                    <Col sm={10}>
                        <Row className="mb-4">
                            <Col xs={1}>
                                <Button variant="outline-dark" size="sm" onClick={() => { onBackClick(null); }}>&lt;</Button>
                            </Col>
                            <Col className="director-name" xs={11}>
                                <h2 className="value">{movie.Director.Name}</h2>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center mb-4">
                            <Col className="director-bio" lg={10}>
                                <span className="label">Bio: </span>
                                <span className="value">{movie.Director.Bio}</span>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center mb-4">
                            <Col className="director-birth" lg={10}>
                                <span className="label">Born: </span>
                                <span className="value">{movie.Director.Birth}</span>
                            </Col>
                        </Row>
                        {movie.Director.Death && <Row className="justify-content-md-center mb-4">
                            <Col className="director-death" lg={10}>
                                <span className="label">Died: </span>
                                <span className="value">{movie.Director.Death}</span>
                            </Col>
                        </Row>}
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