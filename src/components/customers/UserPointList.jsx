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
import {UserPointDetail} from './UserPointDetail'

/**
 * 用户积分列表
 */
class UserPointList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenDialog: false,
            rows: [],
            totalCount: 0,
            currentUserPoint: null,
            searchCondition: {
                userId: null,
                pageIndex: 1,
                pageSize: 10,
                startTime: '0001-01-01',
                endTime: moment().format('YYYY-MM-DD'),
            }
        };
    }

    renderTableHeader = () => <TableRow>
        <TableCell>通行证ID</TableCell>
        <TableCell>用户昵称</TableCell>
        <TableCell>当前积分</TableCell>
        <TableCell>更新时间</TableCell>
        <TableCell>操作</TableCell>
    </TableRow>


    renderTableRow = row => <TableRow key={row.userId}>
        <TableCell>{row.userId}</TableCell>
        <TableCell>{row.userNickName}</TableCell>
        <TableCell>{row.points}</TableCell>
        <TableCell>{row.updateTime}</TableCell>
        <TableCell>
            <div style={{ display: 'flex' }}>
                <Button size="small" color="primary" onClick={() => this.setState({ isOpenDialog: true, currentUserPoint: row })}>详情</Button>
            </div>
        </TableCell>
    </TableRow>

    renderSearch = () => {
        const items = [
            { name: '通行证ID',onKeyDown:()=>this.props.dispatch(customerActions.getUserPoints({ ...this.state.searchCondition })) , onChange: e =>  this.setState({ searchCondition: { ...this.state.searchCondition, userId: e.target.value } }) },          
        ]
        return <Search items={items} />
    }

    renderTitle = () => <div style={{ width: '100%', textAlign: 'left' }}>
        <TitleDiv >
            <div>{'用户积分列表'}</div>
            <div style={{ display: 'flex' }}>
                <Button color="primary" onClick={() => this.props.dispatch(customerActions.getUserPoints({ ...this.state.searchCondition }))}>查询</Button>
                {/* <Button color="primary" onClick={() => this.setState({ isOpenDialog: true, currentGift: defaultValues.gift })}>添加</Button> */}
            </div>
        </TitleDiv>
        {this.renderSearch()}
    </div>

    onCommit = value => {
        this.setState({ isOpenDialog: false, currentUserPoint: null });
    }

    onPageIndexChange = (event, idx) => {
        const { searchCondition } = this.state;
        if (searchCondition.pageIndex !== idx + 1) {
            searchCondition.pageIndex = idx + 1;
            this.setState({ searchCondition });
            this.props.dispatch(customerActions.getUserPoints({ ...searchCondition }));
        }
    };

    onPageSizeChange = event => {
        const { searchCondition } = this.state;
        searchCondition.pageIndex = 1;
        searchCondition.pageSize = event.target.value;
        this.setState({ searchCondition })
        this.props.dispatch(customerActions.getUserPoints({ ...searchCondition }));
    };

    componentDidMount() {
        const { dispatch } = this.props;
        const { searchCondition } = this.state;
        dispatch(customerActions.getUserPoints({ ...searchCondition }));
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps != null) {
            const {  alertMessage, totalCount, userPoints } = nextProps;
            this.setState({  alertMessage, totalCount, rows: userPoints });
        }
    }

    render() {
        const {  rows, searchCondition, totalCount, currentUserPoint, isOpenDialog } = this.state;
        const { pageSize, pageIndex } = searchCondition;
        return <React.Fragment>
            <ShowDialog alertMessage={this.props.alertMessage} />
            <CustomDialog
                onClose={() => this.setState({ isOpenDialog: false })}
                isOpen={isOpenDialog === true}
                title={'用户详情'} >
                <UserPointDetail userPoint={currentUserPoint} onClose={this.onCommit} />
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

const instance = withRouter(connect(mapStateToProps)(UserPointList));

export { instance as UserPointList };
