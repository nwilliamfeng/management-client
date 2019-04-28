import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

import { connect } from 'react-redux'


class TaskList extends Component {
    render() {
        
        return <div>
            {'tasklist'}
        </div>
    }
}


const mapStateToProps = (state) => {
    return state;
}

const instance = withRouter(connect(mapStateToProps)(TaskList));

export { instance as TaskList };
