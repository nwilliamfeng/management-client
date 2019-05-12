import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { QueryTable, ShowDialog, CustomDialog } from '../../controls'
import Button from '@material-ui/core/Button'
import { customerActions } from '../../actions'
import moment from 'moment'
import { Container, TitleDiv } from '../part'
import { Search } from '../../controls'
import { UserPointDetail } from './UserPointDetail'

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

    columns = [
        { header: '通行证ID', cell: row => row.userId },
        { header: '用户昵称', cell: row => row.userNickName },
        { header: '当前积分', cell: row => row.points },
        { header: '更新时间', cell: row => row.updateTime },
        { header: '操作', cell: row => <Button size="small" color="primary" onClick={() => this.setState({ isOpenDialog: true, currentUserPoint: row })}>详情</Button> },
    ]

    renderSearch = () => {
        const items = [
            { name: '通行证ID', onKeyDown: () =>this.onSearch()  , onChange: e => this.setState({ searchCondition: { ...this.state.searchCondition, userId: e.target.value } }) },
        ]
        return <Search items={items} />
    }

    renderTitle = () => <div style={{ width: '100%', textAlign: 'left' }}>
        <TitleDiv >
            <div>{'用户积分列表'}</div>
            <div style={{ display: 'flex' }}>
                <Button color="primary" onClick={() => this.onSearch()}>查询</Button>
                {/* <Button color="primary" onClick={() => this.setState({ isOpenDialog: true, currentGift: defaultValues.gift })}>添加</Button> */}
            </div>
        </TitleDiv>
        {this.renderSearch()}
    </div>

    onCommit = value => {
        this.setState({ isOpenDialog: false, currentUserPoint: null });
    }

    onSearch = value => {
        if (value != null) {
            this.setState({ searchCondition: value });
        }
        else{
            value =this.state.searchCondition;
        }
        
        this.props.dispatch(customerActions.getUserPoints({ ...value }));
    }


    render() {
        const { searchCondition, currentUserPoint, isOpenDialog } = this.state;
        const { userPoints, totalCount } = this.props;
        return <React.Fragment>
            <ShowDialog alertMessage={this.props.alertMessage} />
            <CustomDialog
                onClose={() => this.setState({ isOpenDialog: false })}
                isOpen={isOpenDialog === true}
                title={'用户详情'} >
                <UserPointDetail userPoint={currentUserPoint} onClose={this.onCommit} />
            </CustomDialog>
            <Container title={this.renderTitle()} >
                <QueryTable columns={this.columns} rows={userPoints} onSearch={this.onSearch} totalCount={totalCount} searchCondition={searchCondition} />
            </Container>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => { return { ...state.customer }; }

const instance = withRouter(connect(mapStateToProps)(UserPointList));

export { instance as UserPointList };
