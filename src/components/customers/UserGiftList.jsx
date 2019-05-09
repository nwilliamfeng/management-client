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
import {Gift} from '../gifts'

/**
 * 用户卡券列表
 */
class UserGiftList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenDialog: false,
            isOpenGiftDialog:false,
            rows: [],
            selectedGift:null,
            giftTypes:[],
            userGiftStates: [],
            totalCount: 0,
            currentUserGift: null,
            searchCondition: {
                userId: null,
                usergiftId: null,
                giftId: null,
                giftType: null,
                giftState: null,
                pageIndex: 1,
                pageSize: 10,
                startTime: '0001-01-01',
                endTime: moment().format('YYYY-MM-DD'),
            }
        };
    }

    executeSearch = () => this.props.dispatch(customerActions.getUserGiftList({ ...this.state.searchCondition }))

    renderTableHeader = () => <TableRow>
        <TableCell>通行证ID</TableCell>
        <TableCell>用户名称</TableCell>
        <TableCell>用户卡券编号</TableCell>
        <TableCell>卡券名称</TableCell>
        <TableCell>卡券状态</TableCell>
        <TableCell>发放时间</TableCell>
        <TableCell>激活时间</TableCell>
        <TableCell>过期时间</TableCell>
        <TableCell>操作</TableCell>
    </TableRow>

    showGift = giftInfo => {
        this.setState({selectedGift:giftInfo,isOpenGiftDialog:true});
    }

    renderTableRow = row => <TableRow key={row.userId}>
        <TableCell>{row.userId}</TableCell>
        <TableCell>{row.userNickName}</TableCell>
        <TableCell>{row.userGiftID}</TableCell>
        <TableCell>{row.giftInfo && <a href="#" style={{ color: 'green',textDecoration:'none' }} onClick={()=>this.showGift(row.giftInfo)} >{row.giftInfo.name}</a>} </TableCell>
        <TableCell>{moment(row.expireTime).isBefore(moment().format()) ? '已过期' : ''}</TableCell>
        <TableCell>{row.createTime}</TableCell>
        <TableCell>{row.activedTime}</TableCell>
        <TableCell>{row.expireTime}</TableCell>
        <TableCell>
            <div style={{ display: 'flex' }}>
                <Button size="small" color="primary" onClick={() => this.setState({ isOpenDialog: true, currentUserGift: row })}>详情</Button>
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
        <TitleDiv>
            <div>{'用户卡券列表'}</div>
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
            const { alertMessage, totalCount, userGiftStates, userGifts,giftTypes } = nextProps;
            this.setState({ alertMessage, totalCount, rows: userGifts, userGiftStates,giftTypes });
        }
    }

    render() {
        const { rows, searchCondition, totalCount, selectedGift, isOpenDialog,isOpenGiftDialog,giftTypes,currentUserGift } = this.state;
        const { pageSize, pageIndex } = searchCondition;
        return <React.Fragment>
            <ShowDialog alertMessage={this.props.alertMessage} />
            <CustomDialog
                onClose={() => this.setState({ isOpenDialog: false })}
                isOpen={isOpenDialog === true}
                title={'用户详情'} >
                {/* <Gift gift={currentGift} giftTypes={giftTypes} onCommit={this.onCommit} /> */}
            </CustomDialog>
            <CustomDialog
                onClose={() => this.setState({ isOpenGiftDialog: false })}
                isOpen={isOpenGiftDialog === true}
                title={'用户卡券详情'} >
                <Gift gift={selectedGift} giftTypes={giftTypes} onCommit={()=>this.setState({isOpenGiftDialog:false})} />
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

const instance = withRouter(connect(mapStateToProps)(UserGiftList));

export { instance as UserGiftList };
