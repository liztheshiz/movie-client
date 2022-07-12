import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

function MoviesList(props) {
    const { movies, user, visibilityFilter, listType, removeFromFavorites, name } = props;

    let filteredMovies = movies;

    // Filter movies list depending on what view user is currently in
    filteredMovies = movies.filter(m => {
        if (listType === "main") return m.Title.toLowerCase().includes(visibilityFilter.toLowerCase());
        if (listType === "profile") return user.FavoriteMovies.includes(m._id);
        if (listType === "genre") return m.Genre.Name === name;
        if (listType === "director") return m.Director.Name === name;
    })

    return (
        <Row className="justify-content-center">
            {listType === 'main' && <Col xs={12}>
                <VisibilityFilterInput visibilityFilter={visibilityFilter} />
            </Col>}
            {filteredMovies.map(m =>
                <Col xs={11} sm={6} lg={4} xl={3} key={m._id}>
                    <MovieCard movie={m} listType={listType} removeFromFavorites={removeFromFavorites} />
                </Col>
            )}
        </Row>
    )
}

// Connects component to store
const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

// Export component with store props connected
export default connect(mapStateToProps)(MoviesList);

MoviesList.propTypes = {
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
    visibilityFilter: PropTypes.string.isRequired,
    listType: PropTypes.string.isRequired,
    removeFromFavorites: PropTypes.func,
    name: PropTypes.string
}