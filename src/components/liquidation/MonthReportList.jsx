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
import { Search ,SearchType} from '../../controls'
 
/**
 * 月报表列表
 */
class MonthReportList extends Component {

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

    executeSearch = () => this.props.dispatch(liquidationActions.getMonthReport({ ...this.state.searchCondition }))

    renderTableHeader = () => <TableRow>
         <TableCell>报表月份</TableCell>
        <TableCell>报表类型</TableCell>
        <TableCell>总积分</TableCell>
        <TableCell>总数</TableCell>
        <TableCell>生成时间</TableCell>
        <TableCell>平台类型</TableCell>
    </TableRow>

   

    renderTableRow = row => <TableRow key={row.iD}>
        <TableCell>{row.reportMonth}</TableCell>
        <TableCell>{this.props.reportTypes.find(x=>x.value=== row.reportType).name}</TableCell>
        <TableCell><b  > {row.value}</b></TableCell>
        <TableCell><b  > {row.total}</b></TableCell>
        <TableCell>{row.createTime}</TableCell>
        <TableCell>{this.props.platforms.find(x=>x.platformID=== row.platformId).name}</TableCell>
    </TableRow>

    renderSearch = () => {
        const items = [
            {name:'平台类型',selectValue:this.state.searchCondition.platformid ,selectItems:this.props.platforms==null?[]: this.props.platforms.map(x=>{return {...x,value:x.platformID}}) 
            ,searchType:SearchType.SELECT, onChange:e=>this.setState({searchCondition:{...this.state.searchCondition,platformid:parseInt( e.target.value)}}) },

            {name:'清算日期',selectValue:this.state.searchCondition.clearDate ,searchType:SearchType.DATE
            , onChange:e=> this.setState({searchCondition:{...this.state.searchCondition, clearDate:e.target.value}}) },
            
        ]
        return <Search items={items} />
    }

    renderTitle = () => <div style={{ width: '100%', textAlign: 'left' }}>
        <TitleDiv>
            <div>{'月报表'}</div>
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
        const { monthReports, totalCount,   isOpenDialog,  } = this.props;
        const {searchCondition} =this.state;
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
                    rows={monthReports}
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

const instance = withRouter(connect(mapStateToProps)(MonthReportList));

export { instance as MonthReportList };
