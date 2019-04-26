import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

import { connect } from 'react-redux'


class Task extends Component {
    render() {
        console.log(this.props);
        return <div>
            {'task'}
        </div>
    }
}


const mapStateToProps = (state) => {
    return state;
}

const task = withRouter(connect(mapStateToProps)(Task));

export { task as Task };
