import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { MovieCard } from '../movie-card/movie-card';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export function MoviesList(props) {
    return (
        <Row>
            {movies.map(m =>
                <Col sm={6} md={4} lg={3} key={m._id}>
                    <MovieCard movie={m} />
                    {isProfile && <Button>Delte</Button>}
                </Col>
            )}
        </Row>
    );
}

MoviesList.propTypes = {
    movies: PropTypes.arrayOf(React.PropTypes.shape({
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
    isProfile: PropTypes.bool.isRequired
}