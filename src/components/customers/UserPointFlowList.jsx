import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { QueryTable, ShowDialog, CustomDialog } from '../../controls'
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

    columns = [
        { header: '通行证ID', cell: row => row.userId },
        { header: '用户名称', cell: row => row.userNickName },
        { header: '变动方向', cell: row => row.flowType === '1' ? '流入' : '流出' },
        { header: '变动类型', cell: row => <div> {this.props.pointReferTypes.find(x => x.value === row.referType).name}</div> },
        { header: '关联任务或关联卡券', cell: row => row.referID },
        { header: '变动时间', cell: row => row.flowTime },
        { header: '创建时间', cell: row => row.createTime },
        { header: '变动积分值', cell: row => row.flowValue },
        { header: '操作', cell: row => <Button size="small" color="primary" onClick={() => this.setState({ isOpenDialog: true, currentUserPoint: row })}>详情</Button> },
    ]

    renderSearch = () => {
        const items = [
            { name: '通行证ID', onKeyDown: () => this.onSearch(), onChange: e => this.setState({ searchCondition: { ...this.state.searchCondition, userId: e.target.value } }) },
        ]
        return <Search items={items} />
    }

    renderTitle = () => <div style={{ width: '100%', textAlign: 'left' }}>
        <TitleDiv >
            <div>{'用户积分变动'}</div>
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
        this.props.dispatch(customerActions.getUserPointFlowsFromDayReport({ ...value }))
    }

    render() {
        const { searchCondition, currentUserPointFlow, isOpenDialog } = this.state;
        const { userPointFlows, totalCount } = this.props;
        return <React.Fragment>
            <ShowDialog alertMessage={this.props.alertMessage} />
            <CustomDialog
                onClose={() => this.setState({ isOpenDialog: false })}
                isOpen={isOpenDialog === true}
                title={'用户详情'} >
                {/* <Gift gift={currentGift} giftTypes={giftTypes} onCommit={this.onCommit} /> */}
            </CustomDialog>
            <Container title={this.renderTitle()} >
                <QueryTable columns={this.columns} rows={userPointFlows} onSearch={this.onSearch} totalCount={totalCount} searchCondition={searchCondition} />
            </Container>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => { return { ...state.location, ...state.customer }; }

const instance = withRouter(connect(mapStateToProps)(UserPointFlowList));

export { instance as UserPointFlowList };
