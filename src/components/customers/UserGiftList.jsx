import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { QueryTable, ShowDialog, CustomDialog } from '../../controls'
import Button from '@material-ui/core/Button'
import { customerActions } from '../../actions'
import moment from 'moment'
import { Container, TitleDiv } from '../part'
import { Search } from '../../controls'
import { Gift } from '../gifts'

/**
 * 用户卡券列表
 */
class UserGiftList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenDialog: false,
            isOpenGiftDialog: false,
            selectedGift: null,
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

    columns = [
        { header: '通行证ID', cell: row => row.userId },
        { header: '用户名称', cell: row => row.userNickName },
        { header: '用户卡券编号', cell: row => row.shortDesc },
        { header: '卡券名称', cell: row => row.userGiftID },
        { header: '卡券状态', cell: row => <a href="#" style={{ color: 'green', textDecoration: 'none' }} onClick={() => this.showGift(row.giftInfo)} >{row.giftInfo.name}</a> },
        { header: '发放时间', cell: row => row.createTime },
        { header: '激活时间', cell: row => row.activedTime },
        { header: '过期时间', cell: row => row.expireTime },
        { header: '操作', cell: row => <Button size="small" color="primary" onClick={() => this.setState({ isOpenDialog: true, currentUserGift: row })}>详情</Button> },
    ]

    showGift = giftInfo => this.setState({ selectedGift: giftInfo, isOpenGiftDialog: true });

    renderSearch = () => {
        const items = [
            { name: '通行证ID', onKeyDown: () => this.onSearch(), onChange: e => this.setState({ searchCondition: { ...this.state.searchCondition, userId: e.target.value } }) },
        ]
        return <Search items={items} />
    }

    renderTitle = () => <div style={{ width: '100%', textAlign: 'left' }}>
        <TitleDiv>
            <div>{'用户卡券列表'}</div>
            <div style={{ display: 'flex' }}>
                <Button color="primary" onClick={() => this.onSearch()}>查询</Button>
            </div>
        </TitleDiv>
        {this.renderSearch()}
    </div>

    onCommit = value => {
        console.log(value);
    }

    onSearch = value => {
        if (value != null) {
            this.setState({ searchCondition: value });
        }
        else{
            value =this.state.searchCondition;
        }
        this.props.dispatch(customerActions.getUserGiftList({ ...value }));
    }

    render() {
        const { searchCondition, selectedGift, isOpenDialog, isOpenGiftDialog, currentUserGift } = this.state;
        const { userGifts, totalCount, giftTypes } = this.props;
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
                <Gift gift={selectedGift} giftTypes={giftTypes} onCommit={() => this.setState({ isOpenGiftDialog: false })} />
            </CustomDialog>
            <Container title={this.renderTitle()} >
                <QueryTable columns={this.columns} rows={userGifts} onSearch={this.onSearch} totalCount={totalCount} searchCondition={searchCondition} />
            </Container>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => { return { ...state.customer }; }

const instance = withRouter(connect(mapStateToProps)(UserGiftList));

export { instance as UserGiftList };
