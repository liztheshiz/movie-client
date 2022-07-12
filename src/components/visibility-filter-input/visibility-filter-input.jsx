import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setFilter } from '../../actions/actions';

import Form from 'react-bootstrap/Form';

import './visibility-filter-input.scss';

function VisibilityFilterInput(props) {
    return <Form.Control
        className="filter"
        onChange={e => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder="Type movie title here"
    />;
}

export default connect(
    null,
    { setFilter }
)(VisibilityFilterInput);

VisibilityFilterInput.propTypes = {
    visibilityFilter: PropTypes.string.isRequired
}