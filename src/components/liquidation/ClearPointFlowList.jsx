import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { DataTable, ShowDialog, CustomDialog } from '../../controls'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'
import { liquidationActions } from '../../actions'
import moment from 'moment'
import { Container, TitleDiv } from '../part'
import { Search, SearchType } from '../../controls'

/**
 * 清算异常数据
 */
class ClearPointFlowList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenDialog: false,

            totalCount: 0,

            searchCondition: {
                platformid: -1,
                pageIndex: 1,
                pageSize: 10,
                clearDate: moment().format('YYYY-MM-DD'),
            }
        };
    }

    executeSearch = () => this.props.dispatch(liquidationActions.getErrorClearPointFlow({ ...this.state.searchCondition }))

    renderTableHeader = () => <TableRow>
        <TableCell>时间</TableCell>
        <TableCell>类别</TableCell>
        <TableCell>积分流向</TableCell>
        <TableCell>积分值</TableCell>
        <TableCell>用户编号</TableCell>
        <TableCell>流水号</TableCell>
        <TableCell>清算状态</TableCell>
        <TableCell>清算信息</TableCell>
    </TableRow>



    renderTableRow = row => <TableRow key={row.flowid}>
        <TableCell>{row.updateTime}</TableCell>
        <TableCell>{this.props.referTypes.find(x => x.value === row.referType).name}</TableCell>
        <TableCell>{row.flowType==='1'?'流入':row.flowType==='2'?'流出':'流入，流出'} </TableCell>
        <TableCell> {row.flowvalue} </TableCell>
        <TableCell>{row.userid}</TableCell>
        <TableCell>{row.flowid}</TableCell>
        <TableCell>{row.clearCode}</TableCell>
        <TableCell>{row.clearMessage}</TableCell>   

    </TableRow>

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
                <Button color="primary" onClick={() => this.executeSearch()}>查询</Button>
            </div>
        </TitleDiv>
        {this.renderSearch()}
    </div>

    onCommit = value => {
        console.log(value);
    }



    onPageIndexChange = (event, idx) => {
        const { searchCondition } = this.state;
        if (searchCondition.pageIndex !== idx + 1) {
            searchCondition.pageIndex = idx + 1;
            this.setState({ searchCondition });
            this.executeSearch();
        }
    };

    onPageSizeChange = event => {
        const { searchCondition } = this.state;
        searchCondition.pageIndex = 1;
        searchCondition.pageSize = event.target.value;
        this.setState({ searchCondition })
        this.executeSearch();
    };

    componentDidMount() {
        this.executeSearch();
    }

    render() {
        const { clearPointFlows, totalCount, isOpenDialog, } = this.props;
        const { searchCondition } = this.state;
        const { pageSize, pageIndex } = searchCondition;
        return <React.Fragment>
            <ShowDialog alertMessage={this.props.alertMessage} />
            {/* <CustomDialog
                onClose={() => this.setState({ isOpenDialog: false })}
                isOpen={isOpenDialog === true}
                title={'用户详情'} >           
            </CustomDialog> */}
            <Container title={this.renderTitle()} >
                <DataTable
                    rows={clearPointFlows}
                    pageSize={pageSize}
                    pageIndex={pageIndex - 1}
                    totalCount={totalCount}
                    onPageIndexChange={this.onPageIndexChange}
                    onPageSizeChange={this.onPageSizeChange}
                    renderHeader={this.renderTableHeader}
                    renderRow={this.renderTableRow}
                    needPagination={true}>
                </DataTable>
            </Container>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => { return { ...state.location, ...state.liquidation }; }

const instance = withRouter(connect(mapStateToProps)(ClearPointFlowList));

export { instance as ClearPointFlowList };
