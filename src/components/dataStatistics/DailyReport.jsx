import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

import { connect } from 'react-redux'


class DailyReport extends Component {
    render() {
        console.log(this.props);
        return <div>
            {'数据大盘日报表-未实现'}
        </div>
    }
}


const mapStateToProps = (state) => {
    return state;
}

const instance = withRouter(connect(mapStateToProps)(DailyReport));

export { instance as DailyReport };
