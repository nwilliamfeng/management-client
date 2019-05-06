import React, { Component } from 'react';
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { withHeader, DataTable, ShowDialog,CustomDialog } from '../../controls'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'
import { taskActions } from '../../actions'
import { routeUrls } from '../../constants'
import { Link } from 'react-router-dom'
import {TaskTag} from './TaskTag'
  

const Container = withHeader(props => <div {...props} title="">
    {props.children}
</div>)

const TitleDiv=styled.div`
    display:flex;
    width:100%;
    justify-content:space-between;
`


class TaskTagList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            newTag:null,
            pageIndex: 1,
            pageSize: 50,
            isOpenDialog:false,
        };
    }

    renderHeader = () => <TableRow>
        <TableCell>支持平台</TableCell>
        <TableCell>任务标签名称</TableCell>
        <TableCell>任务标签顺序</TableCell>
        <TableCell>任务标签描述</TableCell>
        <TableCell>是否有效</TableCell>
        <TableCell>添加人员</TableCell>
        <TableCell>添加时间</TableCell>
        <TableCell>操作</TableCell>
    </TableRow>

    renderRow = row => <TableRow key={row.id}>
        <TableCell>{row.platformID}</TableCell>
        <TableCell>{row.tagName}</TableCell>
        <TableCell>{row.tagSequence}</TableCell>
        <TableCell>{row.remark}</TableCell>
        <TableCell>{row.isEnabled===true?'是':'否'}</TableCell>
        <TableCell>{row.operator}</TableCell>
        <TableCell>{row.createTime}</TableCell>
        <TableCell>
            <div style={{ display: 'flex' }}>
                <Button size="small" color="primary" component={Link} to={`${routeUrls.TASK_TAG_ADD_UPDATE}?tagId=${row.id}`}>详情</Button>
            </div>
        </TableCell>
    </TableRow>


    onPageIndexChange = (event, pageIndex) => {
        // this.setState({ pageIndex: pageIndex });
        // this.props.dispatch(taskActions.get(pageIndex + 1, this.state.pageSize));
    };

    onPageSizeChange = event => {
        // this.setState({ page: 0, rowsPerPage: event.target.value });
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(taskActions.getTaskTags());
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps != null) {
            const { platforms, taskTags, alertMessage, } = nextProps;
            this.setState({ platforms, alertMessage, rows: taskTags });
        }
    }

    openDialog=()=>{
        this.setState({isOpenDialog:true})
    }

    renderTitle=()=><TitleDiv>
        <div>{'任务标签列表'}</div>
        <div style={{display:'flex'}}>
            <Button color="primary" onClick={this.openDialog}>添加</Button>
        </div>
    </TitleDiv>

    onExecuteConfirm=()=>{

    }

    render() {
        const { rows, pageSize, pageIndex ,isOpenDialog} = this.state;
        return <React.Fragment>
            <ShowDialog alertMessage={this.props.alertMessage} />
            <CustomDialog isOpen={isOpenDialog===true} title={'新建任务标签'} executeConfirm={this.onExecuteConfirm}>
                <TaskTag tag={{}}/>
            </CustomDialog>
            <Container title={this.renderTitle()} >
                <DataTable
                    rows={rows}
                    pageSize={pageSize}
                    pageIndex={pageIndex-1}
                    totalCount={rows.length}
                    onPageIndexChange={this.onPageIndexChange}
                    onPageSizeChange={this.onPageSizeChange}
                    renderHeader={this.renderHeader}
                    renderRow={this.renderRow}>
                </DataTable>
            </Container>
        </React.Fragment>

    }
}


const mapStateToProps = (state) => {
    return { ...state.location, ...state.task };
}

const instance = withRouter(connect(mapStateToProps)(TaskTagList));

export { instance as TaskTagList };
