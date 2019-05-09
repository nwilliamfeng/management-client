import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { DataTable, ShowDialog, CustomDialog } from '../../controls'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'
import { customerActions } from '../../actions'
import moment from 'moment'
import { Container, TitleDiv } from '../part'
import { Search } from '../../controls'

/**
 * 用户积分流水列表
 */
class UserPointFlowList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenDialog: false,
            rows: [],
            pointReferTypes: [],
            totalCount: 0,
            currentUserPointFlow: null,
            searchCondition: {
                userId: null,
                pageIndex: 1,
                pageSize: 10,
                startTime: '0001-01-01',
                endTime: moment().format('YYYY-MM-DD'),
            }
        };
    }

    executeSearch = () => this.props.dispatch(customerActions.getUserPointFlowsFromDayReport({ ...this.state.searchCondition }))

    renderTableHeader = () => <TableRow>
        <TableCell>通行证ID</TableCell>
        <TableCell>用户名称</TableCell>
        <TableCell>变动方向</TableCell>
        <TableCell>变动类型</TableCell>
        <TableCell>关联任务或关联卡券</TableCell>
        <TableCell>变动时间</TableCell>
        <TableCell>创建时间</TableCell>
        <TableCell>变动积分值</TableCell>
        <TableCell>操作</TableCell>
    </TableRow>

    renderTableRow = row => <TableRow key={row.userId}>
        <TableCell>{row.userId}</TableCell>
        <TableCell>{row.userNickName}</TableCell>
        <TableCell>{row.flowType === '1' ? '流入' : '流出'}</TableCell>
        <TableCell>{this.state.pointReferTypes && <div> {this.state.pointReferTypes.find(x => x.value === row.referType).name}</div>} </TableCell>
        <TableCell>{row.referID}</TableCell>
        <TableCell>{row.flowTime}</TableCell>
        <TableCell>{row.createTime}</TableCell>
        <TableCell>{row.flowValue}</TableCell>
        <TableCell>
            <div style={{ display: 'flex' }}>
                <Button size="small" color="primary" onClick={() => this.setState({ isOpenDialog: true, currentUserPoint: row })}>详情</Button>
            </div>
        </TableCell>
    </TableRow>

    renderSearch = () => {
        const items = [
            { name: '通行证ID', onKeyDown: () => this.executeSearch(), onChange: e => this.setState({ searchCondition: { ...this.state.searchCondition, userId: e.target.value } }) },
        ]
        return <Search items={items} />
    }

    renderTitle = () => <div style={{ width: '100%', textAlign: 'left' }}>
        <TitleDiv >
            <div>{'用户积分变动'}</div>
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

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps != null) {
            const { alertMessage, totalCount, userPointFlows, pointReferTypes } = nextProps;
            this.setState({ alertMessage, totalCount, rows: userPointFlows, pointReferTypes });
        }
    }

    render() {
        const { rows, searchCondition, totalCount, currentUserPointFlow, isOpenDialog } = this.state;
        const { pageSize, pageIndex } = searchCondition;
        return <React.Fragment>
            <ShowDialog alertMessage={this.props.alertMessage} />
            <CustomDialog
                onClose={() => this.setState({ isOpenDialog: false })}
                isOpen={isOpenDialog === true}
                title={'用户详情'} >
                {/* <Gift gift={currentGift} giftTypes={giftTypes} onCommit={this.onCommit} /> */}
            </CustomDialog>
            <Container title={this.renderTitle()} >
                <DataTable
                    rows={rows}
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

const mapStateToProps = (state) => { return { ...state.location, ...state.customer }; }

const instance = withRouter(connect(mapStateToProps)(UserPointFlowList));

export { instance as UserPointFlowList };
