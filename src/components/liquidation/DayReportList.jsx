import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { QueryTable, ShowDialog, Search, SearchType } from '../../controls'
import Button from '@material-ui/core/Button'
import { liquidationActions } from '../../actions'
import moment from 'moment'
import { Container, TitleDiv } from '../part'

/**
 * 日报表列表
 */
class DayReportList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchCondition: { platformid: -1, pageIndex: 1,pageSize: 10, clearDate: moment().format('YYYY-MM-DD')}
        };
    }

    onSearch = value => {
        if (value != null) {
            this.setState({ searchCondition: value });
        }
        else {
            value = this.state.searchCondition;
        }
        this.props.dispatch(liquidationActions.getDayReport({ ...value }));
    }

    columns = [
        { header: '报表日期', cell: row => row.reportDate },
        { header: '报表类型', cell: row => this.props.reportTypes.find(x => x.value === row.reportType).name },
        { header: '总积分', cell: row => <b> {row.value}</b> },
        { header: '总数', cell: row => <b> {row.total}</b> },
        { header: '生成时间', cell: row => row.createTime },
        { header: '平台类型', cell: row => this.props.platforms.find(x => x.platformID === row.platformId).name },
    ]

    renderSearch = () => {
        const items = [
            {
                name: '平台类型', selectValue: this.state.searchCondition.platformid, selectItems: this.props.platforms == null ? [] : this.props.platforms.map(x => { return { ...x, value: x.platformID } })
                , searchType: SearchType.SELECT, onChange: e => this.setState({ searchCondition: { ...this.state.searchCondition, platformid: parseInt(e.target.value) } })
            },
            {
                name: '清算日期', selectValue: this.state.searchCondition.clearDate, searchType: SearchType.DATE
                , onChange: e => this.setState({ searchCondition: { ...this.state.searchCondition, clearDate: e.target.value } })
            },
        ]
        return <Search items={items} />
    }

    renderTitle = () => <div style={{ width: '100%', textAlign: 'left' }}>
        <TitleDiv>
            <div>{'日报表'}</div>
            <div style={{ display: 'flex' }}>
                <Button color="primary" onClick={() => this.onSearch()}>查询</Button>
            </div>
        </TitleDiv>
        {this.renderSearch()}
    </div>

    onCommit = value => {
        console.log(value);
    }

    render() {
        const { dayReports, totalCount, } = this.props;
        const { searchCondition } = this.state;
        return <React.Fragment>
            <ShowDialog alertMessage={this.props.alertMessage} />
            <Container title={this.renderTitle()} >
                <QueryTable columns={this.columns} rows={dayReports} onSearch={this.onSearch} totalCount={totalCount} searchCondition={searchCondition} />
            </Container>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => { return { ...state.location, ...state.liquidation }; }

const instance = withRouter(connect(mapStateToProps)(DayReportList));

export { instance as DayReportList };
