import React, { Component } from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux'
import { customerActions } from '../../actions'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {  Button, } from '@material-ui/core';

import { DataTable } from '../../controls'

const Container = styled.div`
    border:1px solid lightgray;
    padding:20px;
    margin-bottom:10px;
`

const TitleDiv = styled.div`
    display:flex;
    justify-content:space-between;
`

const SplitLine = () => <hr style={{ border: 'none', borderBottom: 'solid 1px lightgray', marginBottom: 10, marginTop: 10 }} />


class UserPointDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pointFlowSearchCondition: {
                pageIndex: 1,
                pageSize: 10,
                userId: props.userPoint.userId,
            },

            giftSearchCondition: {
                userId: props.userPoint.userId,
                pageIndex: 1,
                pageSize: 10,
            }

        };
    }

    renderGiftTableHeader = () => <TableRow>
        <TableCell>卡券名称</TableCell>
        <TableCell>卡券状态</TableCell>
        <TableCell>卡券类型</TableCell>
        <TableCell>卡券简述</TableCell>
        <TableCell>卡券面值</TableCell>
        <TableCell>卡券来源</TableCell>
        <TableCell>发放时间</TableCell>
        <TableCell>操作</TableCell>
    </TableRow>

    renderGiftTableRow = row => <TableRow key={row.userGiftID}>
        <TableCell>{row.giftInfo.name}</TableCell>
        <TableCell>{this.props.giftStates.find(x => x.value === row.giftInfo.giftState).name}</TableCell>
        <TableCell>{this.props.giftTypes.find(x => x.value === row.giftInfo.giftType).name}</TableCell>
        <TableCell>{row.giftInfo.shortDesc}</TableCell>
        <TableCell>{row.giftInfo.giftValue}</TableCell>
        <TableCell>{row.giftInfo.giftReference}</TableCell>
        <TableCell>{row.giftInfo.createTime}</TableCell>
        <TableCell>
            <div style={{ display: 'flex' }}>
                <Button size="small" color="primary" onClick={() => this.setState({ isOpenDialog: true, currentUserGift: row })}>详情</Button>
            </div>
        </TableCell>
    </TableRow>

    renderPointFlowTableHeader = () => <TableRow>
        <TableCell>变动方向</TableCell>
        <TableCell>变动类型</TableCell>
        <TableCell>变动积分</TableCell>
        <TableCell>变动备注</TableCell>
        <TableCell>变动时间</TableCell>
    </TableRow>

    renderPointFlowTableRow = row => <TableRow key={row.flowID}>
        <TableCell>{row.flowType==="1"?'流入':'流出'}</TableCell>
        <TableCell>{this.props.pointReferTypes.find(x => x.value === row.referType).name}</TableCell>
        <TableCell>{row.flowValue}</TableCell>
        <TableCell>{row.flowRemark}</TableCell>
        <TableCell>{row.flowTime}</TableCell>
        
      
    </TableRow>

    executeGiftSearch = () => this.props.dispatch(customerActions.getUserGiftListByUserId({ ...this.state.giftSearchCondition }));

    executePointFlowSearch = () => this.props.dispatch(customerActions.getUserPointFlowListByUserId({ ...this.state.pointFlowSearchCondition }));


    componentDidMount() {
        this.executeGiftSearch();
        this.executePointFlowSearch();
    }

    onGiftPageIndexChange = (event, idx) => {
        const { giftSearchCondition } = this.state;
        if (giftSearchCondition.pageIndex !== idx + 1) {
            giftSearchCondition.pageIndex = idx + 1;
            this.setState({ giftSearchCondition });
            this.executeGiftSearch();
        }
    };

    onGiftPageSizeChange = event => {
        const { giftSearchCondition } = this.state;
        giftSearchCondition.pageIndex = 1;
        giftSearchCondition.pageSize = event.target.value;
        this.setState({ giftSearchCondition })
        this.executeGiftSearch();
    };


    onPointFlowPageIndexChange = (event, idx) => {
        const { pointFlowSearchCondition } = this.state;
        if (pointFlowSearchCondition.pageIndex !== idx + 1) {
            pointFlowSearchCondition.pageIndex = idx + 1;
            this.setState({ pointFlowSearchCondition });
            this.executePointFlowSearch();
        }
    };

    onPointFlowPageSizeChange = event => {
        const { pointFlowSearchCondition } = this.state;
        pointFlowSearchCondition.pageIndex = 1;
        pointFlowSearchCondition.pageSize = event.target.value;
        this.setState({ pointFlowSearchCondition })
        this.executePointFlowSearch();
    };

    render() {
        const { userPoint, giftDetail, pointFlowDetail } = this.props;
        return <React.Fragment>
            <Container>
                {'用户积分信息'}
                <SplitLine />
                <TitleDiv>
                    <div>{`通行证ID：${userPoint.userId}`}</div>
                    <div>{`昵称：${userPoint.userNickName}`}</div>
                    <div>{`积分：${userPoint.points}`}</div>
                </TitleDiv>
            </Container>

            <Container>
                {'用户积分流水'}
                <SplitLine />
                <DataTable
                    rows={pointFlowDetail != null ? pointFlowDetail.data : []}
                    pageSize={this.state.pointFlowSearchCondition.pageSize}
                    pageIndex={this.state.pointFlowSearchCondition.pageIndex - 1}
                    totalCount={pointFlowDetail != null ? pointFlowDetail.count : 0}
                    onPageIndexChange={this.onPointFlowPageIndexChange}
                    onPageSizeChange={this.onPointFlowPageSizeChange}
                    renderHeader={this.renderPointFlowTableHeader}
                    renderRow={this.renderPointFlowTableRow}
                    needPagination={true}>
                </DataTable>
            </Container>

            <Container>
                {'用户卡券列表'}
                <SplitLine />
                <DataTable
                    rows={giftDetail != null ? giftDetail.data : []}
                    pageSize={this.state.giftSearchCondition.pageSize}
                    pageIndex={this.state.giftSearchCondition.pageIndex - 1}
                    totalCount={giftDetail != null ? giftDetail.count : 0}
                    onPageIndexChange={this.onGiftPageIndexChange}
                    onPageSizeChange={this.onGiftPageSizeChange}
                    renderHeader={this.renderGiftTableHeader}
                    renderRow={this.renderGiftTableRow}
                    needPagination={true}>
                </DataTable>
            </Container>
        </React.Fragment>

    }
}

const mapStateToProps = (state) => { return { ...state.location, ...state.customerDetail }; }

const instance = connect(mapStateToProps)(UserPointDetail);

export { instance as UserPointDetail };
