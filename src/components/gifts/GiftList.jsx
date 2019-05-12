import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { QueryTable, ShowDialog, CustomDialog,Search, SearchType } from '../../controls'
import Button from '@material-ui/core/Button'
import { giftActions } from '../../actions'
import moment from 'moment'
import { defaultValues } from '../helper'
import { Container, TitleDiv } from '../part'
import { Gift } from './Gift'

/**
 * 卡券列表
 */
class GiftList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenDialog: false,
            currentGift: null,
            searchCondition: {
                giftId: null,
                activeName: null,
                giftType: -1,
                giftState: -1,
                isEnabled: true,
                isDel: false,
                pageIndex: 1,
                pageSize: 10,
                startTime: '0001-01-01',
                endTime: moment().add(1, 'days').format('YYYY-MM-DD'),
            }
        };
    }

    columns = [
        { header: '卡券编号', cell: row => row.giftId },
        { header: '卡券名称', cell: row => row.name },
        { header: '卡券简述', cell: row => row.shortDesc },
        { header: '卡券类型', cell: row => this.props.giftTypes.find(x => x.value === row.giftType).name },
        { header: '卡券面值', cell: row => row.giftValue },
        { header: '活动名称', cell: row => row.activeName },
        { header: '添加人员/时间', cell: row => `${row.operator}/${row.createTime}` },
        { header: '操作', cell: row => <Button size="small" color="primary" onClick={() => this.setState({ isOpenDialog: true, currentGift: row })}>详情</Button> },
    ]

    getGiftStates = () => { return [{ value: 0, name: '全部' }, { value: 2, name: '已上架' }, { value: 1, name: '未上架' }] }

    renderSearch = () => {
        const items = [
            { name: '卡券编号', onChange: e => this.setState({ searchCondition: { ...this.state.searchCondition, giftId: e.target.value } }) },
            { name: '活动名称', onChange: e => this.setState({ searchCondition: { ...this.state.searchCondition, activeName: e.target.value } }) },
            { name: '卡券类型', selectValue: this.state.searchCondition.giftType, selectItems: this.state.giftTypes, searchType: SearchType.SELECT, onChange: e => this.setState({ searchCondition: { ...this.state.searchCondition, giftType: e.target.value } }) },
            { name: '卡券状态', selectValue: this.state.searchCondition.giftState, selectItems: this.getGiftStates(), searchType: SearchType.SELECT, onChange: e => this.setState({ searchCondition: { ...this.state.searchCondition, giftState: e.target.value } }) },
        ]
        return <Search items={items} />
    }

    renderTitle = () => <div style={{ width: '100%', textAlign: 'left' }}>
        <TitleDiv >
            <div>{'卡券列表'}</div>
            <div style={{ display: 'flex' }}>
                <Button color="primary" onClick={()=>this.onSearch()}>查询</Button>
                <Button color="primary" onClick={() => this.setState({ isOpenDialog: true, currentGift: defaultValues.gift })}>添加</Button>
            </div>
        </TitleDiv>
        {this.renderSearch()}
    </div>

    onCommit = gift => {
        console.log(gift);
        const { platformId, startTime, endTime, pageIndex, pageSize } = this.state;
        this.setState({ isOpenDialog: false, currentGift: null });
        // this.props.dispatch(taskActions.addOrUpateTask(task, { platformId, startTime, endTime, pageIndex, pageSize }));
    }

    onSearch = value => {
        if (value != null) {
            this.setState({ searchCondition: value });
        }
        else{
            value =this.state.searchCondition;
        }
        this.props.dispatch(giftActions.getGifts({ ...value }));
    }

    render() {
        const { searchCondition, currentGift, isOpenDialog } = this.state;
        const { totalCount, gifts, giftTypes } = this.props;
        return <React.Fragment>
            <ShowDialog alertMessage={this.props.alertMessage} />
            <CustomDialog
                onClose={() => this.setState({ isOpenDialog: false })}
                isOpen={isOpenDialog === true}
                title={currentGift == null ? '' : currentGift.giftId != null ? '修改卡券' : '新建卡券'} >
                <Gift gift={currentGift} giftTypes={giftTypes} onCommit={this.onCommit} />
            </CustomDialog>
            <Container title={this.renderTitle()} >
                <QueryTable columns={this.columns} rows={gifts} onSearch={this.onSearch} totalCount={totalCount} searchCondition={searchCondition} />
            </Container>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => { return { ...state.location, ...state.gift }; }

const instance = withRouter(connect(mapStateToProps)(GiftList));

export { instance as GiftList };
