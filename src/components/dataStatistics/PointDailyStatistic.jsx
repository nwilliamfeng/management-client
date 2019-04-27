import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

import { connect } from 'react-redux'


class PointDailyStatistic extends Component {
    render() {
        console.log(this.props);
        return <div>
            {'积分卡券每日统计-未实现'}
        </div>
    }
}


const mapStateToProps = (state) => {
    return state;
}

const instance = withRouter(connect(mapStateToProps)(PointDailyStatistic));

export { instance as PointDailyStatistic };
