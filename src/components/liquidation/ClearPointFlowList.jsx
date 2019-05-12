import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { QueryTable, ShowDialog, Search, SearchType } from '../../controls'
import Button from '@material-ui/core/Button'
import { liquidationActions } from '../../actions'
import moment from 'moment'
import { Container, TitleDiv } from '../part'

/**
 * 清算异常数据
 */
class ClearPointFlowList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchCondition: {
                platformid: -1,
                pageIndex: 1,
                pageSize: 10,
                clearDate: moment().format('YYYY-MM-DD'),
            }
        };
    }

    onSearch = value => {
        if (value != null) {
            this.setState({ searchCondition: value });
        }
        else {
            value = this.state.searchCondition;
        }
        this.props.dispatch(liquidationActions.getErrorClearPointFlow({ ...value }));
    }

    columns = [
        { header: '时间', cell: row => row.updateTime },
        { header: '类别', cell: row => this.props.referTypes.find(x => x.value === row.referType).name },      
        { header: '积分流向', cell: row => row.flowType === '1' ? '流入' : row.flowType === '2' ? '流出' : '流入，流出' },
        { header: '积分值', cell: row => row.flowvalue },
        { header: '用户编号', cell: row => <b> {row.userid}</b> },
        { header: '流水号', cell: row => <b> {row.flowid}</b> },
        { header: '清算状态', cell: row => row.clearCode },
        { header: '清算信息', cell: row => row.clearMessage },
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
            <div>{'清算异常数据'}</div>
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
        const { clearPointFlows, totalCount, } = this.props;
        const { searchCondition } = this.state;
        return <React.Fragment>
            <ShowDialog alertMessage={this.props.alertMessage} />
            <Container title={this.renderTitle()} >
                <QueryTable columns={this.columns} rows={clearPointFlows} onSearch={this.onSearch} totalCount={totalCount} searchCondition={searchCondition} />
            </Container>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => { return { ...state.location, ...state.liquidation }; }

const instance = withRouter(connect(mapStateToProps)(ClearPointFlowList));

export { instance as ClearPointFlowList };
