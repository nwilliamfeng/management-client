import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { DataTable, ShowDialog, CustomDialog } from '../../controls'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'
import { giftActions } from '../../actions'
import moment from 'moment'
import { defaultValues } from '../helper'
import { Container, TitleDiv } from '../part'
import { Search ,SearchType} from '../../controls'
import {Gift} from './Gift'

/**
 * 卡券列表
 */
class GiftList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenDialog: false,
            rows: [],
            totalCount: 0,
            giftTypes: [],
            currentGift: null,
            searchCondition: {
                giftId: null,
                activeName: null,
                giftType: 0,
                giftState: 0,
                isEnabled: true,
                isDel: false,
                pageIndex: 1,
                pageSize: 10,
                startTime:'0001-01-01',
                endTime: moment().format('YYYY-MM-DD'),
            }
        };
    }

    renderTableHeader = () => <TableRow>
        <TableCell>卡券编号</TableCell>
        <TableCell>卡券名称</TableCell>
        <TableCell>卡券简述</TableCell>
        <TableCell>卡券类型</TableCell>
        <TableCell>卡券面值</TableCell>
        <TableCell>活动名称</TableCell>
        <TableCell>添加人员/时间</TableCell>  
        <TableCell>操作</TableCell>
    </TableRow>

    getGiftStates =()=>{return [{value:0,name:'全部'},{value:2,name:'已上架'},{value:1,name:'未上架'}] }

    renderTableRow = row => <TableRow key={row.giftId}>
        <TableCell>{row.giftId}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.shortDesc}</TableCell>
        <TableCell>{this.state.giftTypes.find(x => x.value === row.giftType).name}</TableCell>
        <TableCell>{row.giftValue}</TableCell>
        <TableCell>{row.activeName}</TableCell>
        <TableCell>{`${row.operator}/${row.createTime}`}</TableCell>
        <TableCell>
            <div style={{ display: 'flex' }}>
                <Button size="small" color="primary" onClick={() => this.setState({ isOpenDialog: true, currentGift: row })}>详情</Button>
            </div>
        </TableCell>
    </TableRow>

    renderSearch=()=>{
        const items=[
            {name:'卡券编号',  onChange:e=>this.setState({searchCondition:{...this.state.searchCondition,giftId:e.target.value}}) },
            {name:'活动名称', onChange:e=>this.setState({searchCondition:{...this.state.searchCondition,activeName:e.target.value}}) },
            {name:'卡券类型',selectValue:this.state.searchCondition.giftType ,selectItems:this.state.giftTypes ,searchType:SearchType.SELECT, onChange:e=>this.setState({searchCondition:{...this.state.searchCondition,giftType:e.target.value}}) },
            {name:'卡券状态',selectValue:this.state.searchCondition.giftState ,selectItems:this.getGiftStates() ,searchType:SearchType.SELECT, onChange:e=>this.setState({searchCondition:{...this.state.searchCondition,giftState:e.target.value}}) },
            // {name:'开始日期',selectValue:this.state.searchCondition.startTime  ,searchType:SearchType.DATE, onChange:e=>this.setState({searchCondition:{...this.state.searchCondition,startTime:e.target.value}}) },
            // {name:'结束日期',selectValue:this.state.searchCondition.endTime  ,searchType:SearchType.DATE, onChange:e=>this.setState({searchCondition:{...this.state.searchCondition,endTime:e.target.value}}) },          
        ]
        return <Search items={items}/>
    }

    renderTitle = () => <div style={{ width: '100%', textAlign: 'left'  }}>
        <TitleDiv >
            <div>{'卡券列表'}</div>
            <div style={{ display: 'flex' }}>
                <Button color="primary" onClick={() => this.props.dispatch(giftActions.getGifts({ ...this.state.searchCondition }))}>查询</Button>
                <Button color="primary" onClick={() => this.setState({ isOpenDialog: true, currentGift: defaultValues.gift })}>添加</Button>
            </div>
        </TitleDiv>
        {this.renderSearch()}
    </div>

    onCommit = task => {
        const { platformId, startTime, endTime, pageIndex, pageSize } = this.state;
        this.setState({ isOpenDialog: false, currentGift: null });
        // this.props.dispatch(taskActions.addOrUpateTask(task, { platformId, startTime, endTime, pageIndex, pageSize }));
    }

    onPageIndexChange = (event, idx) => {
        const { searchCondition } = this.state;
        if (searchCondition.pageIndex !== idx + 1) {
            searchCondition.pageIndex = idx + 1;
            this.setState({ searchCondition });
            this.props.dispatch(giftActions.getGifts({ ...searchCondition }));
        }
    };

    onPageSizeChange = event => {
        const { searchCondition } = this.state;
        searchCondition.pageIndex = 1;
        searchCondition.pageSize = event.target.value;
        this.setState({ searchCondition })
        this.props.dispatch(giftActions.getGifts({ ...searchCondition }));
    };

    componentDidMount() {
        const { dispatch } = this.props;
        const { searchCondition } = this.state;
        dispatch(giftActions.getGifts({ ...searchCondition }));
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps != null) {
            const { giftTypes, alertMessage, totalCount, gifts } = nextProps;
            this.setState({ giftTypes, alertMessage, totalCount, rows: gifts });
        }
    }

    render() {       
        const { giftTypes, rows, searchCondition, totalCount, currentGift, isOpenDialog } = this.state;
        const { pageSize, pageIndex } = searchCondition;
        return <React.Fragment>
            <ShowDialog alertMessage={this.props.alertMessage} />
            <CustomDialog
                onClose={() => this.setState({ isOpenDialog: false })}
                isOpen={isOpenDialog === true}
                title={currentGift == null ? '' : currentGift.giftId != null ? '修改卡券' : '新建卡券'} >
                <Gift gift={currentGift} giftTypes={giftTypes}   onCommit={this.onCommit} />           
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

const mapStateToProps = (state) => { return { ...state.location, ...state.gift }; }

const instance = withRouter(connect(mapStateToProps)(GiftList));

export { instance as GiftList };
