import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

import { connect } from 'react-redux'


class MonthlyReport extends Component {
    render() {
        console.log(this.props);
        return <div>
            {'月报表-未实现'}
        </div>
    }
}


const mapStateToProps = (state) => {
    return state;
}

const instance = withRouter(connect(mapStateToProps)(MonthlyReport));

export { instance as MonthlyReport };
