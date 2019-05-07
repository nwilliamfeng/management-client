import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {  DataTable, ShowDialog, CustomDialog } from '../../controls'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'
import { taskActions } from '../../actions'
import moment from 'moment'
import { Task } from './Task'
import { defaultValues } from '../helper'
import {Container,TitleDiv} from '../part'


class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenDialog: false,
            platformID: '0',
            startTime: '0001-01-01',
            endTime: moment().format('YYYY-MM-DD'),
            rows: [],
            pageIndex: 1,
            pageSize: 10,
            totalCount: 0,
            taskTags: [],
            currentTask: null,
        };
    }

    renderHeader = () => <TableRow>
        <TableCell>支持平台</TableCell>
        <TableCell>任务名称</TableCell>
        <TableCell>完成任务可得积分</TableCell>
        <TableCell>任务状态</TableCell>
        <TableCell>添加人员</TableCell>
        <TableCell>添加时间</TableCell>
        <TableCell>操作</TableCell>
    </TableRow>

    getTaskState = state => state === 0 ? "待审核" : state === 1 ? "已上架" : "已下架";

    renderRow = row => <TableRow key={row.taskID}>
        <TableCell>{this.state.platforms.find(x => x.platformID === row.platformID).name}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.point}</TableCell>
        <TableCell>{this.getTaskState(row.taskState)}</TableCell>
        <TableCell>{row.operator}</TableCell>
        <TableCell>{row.createTime}</TableCell>
        <TableCell>
            <div style={{ display: 'flex' }}>
                <Button size="small" color="primary" onClick={() => this.setState({ isOpenDialog: true, currentTask: row })}>详情</Button>
            </div>
        </TableCell>
    </TableRow>

    renderTitle = () => <TitleDiv>
        <div>{'任务列表'}</div>
        <div style={{ display: 'flex' }}>
            <Button color="primary" onClick={() => this.setState({ isOpenDialog: true, currentTask: defaultValues.task })}>添加</Button>
        </div>
    </TitleDiv>

    onCommit = task => {
        const { platformId, startTime, endTime, pageIndex, pageSize } =this.state;
        this.setState({ isOpenDialog: false, currentTask: null });
        this.props.dispatch(taskActions.addOrUpateTask(task,{platformId, startTime, endTime, pageIndex, pageSize}));
    }

    onPageIndexChange = (event, idx) => {
        const { platformID, pageSize, startTime, endTime, pageIndex } = this.state;
        if (pageIndex !== idx + 1) {
            this.setState({ pageIndex: idx + 1 });
            this.props.dispatch(taskActions.getTasks(platformID, startTime, endTime, idx + 1, pageSize));
        }
    };

    onPageSizeChange = event => {
        this.setState({ pageIndex: 1, pageSize: event.target.value });
        const { platformID, startTime, endTime } = this.state;
        this.props.dispatch(taskActions.getTasks(platformID, startTime, endTime, 1, event.target.value));
    };

    componentDidMount() {
        const { dispatch } = this.props;
        const { platformID, pageSize, startTime, endTime } = this.state;

        dispatch(taskActions.getTasks(platformID, startTime, endTime, 1, pageSize));
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps != null) {
            const { taskTags,  platforms, alertMessage, totalCount, tasks } = nextProps;
            this.setState({ taskTags,   platforms, alertMessage, totalCount, rows: tasks });
        }
    }

    render() {
        const { taskTags, platforms, rows, pageSize, pageIndex, totalCount, currentTask, isOpenDialog } = this.state;

        return <React.Fragment>
            <ShowDialog alertMessage={this.props.alertMessage} />
            <CustomDialog
                onClose={()=>this.setState({isOpenDialog:false})}
                isOpen={isOpenDialog === true}
                title={currentTask == null ? '' : currentTask.taskID != null ? '修改任务' : '新建任务'} >
                <Task task={currentTask} platforms={platforms} taskTags={taskTags} onCommit={this.onCommit} />
            </CustomDialog>
            <Container title={this.renderTitle()} >
                <DataTable
                    rows={rows}
                    pageSize={pageSize}
                    pageIndex={pageIndex - 1}
                    totalCount={totalCount}
                    onPageIndexChange={this.onPageIndexChange}
                    onPageSizeChange={this.onPageSizeChange}
                    renderHeader={this.renderHeader}
                    renderRow={this.renderRow}
                    needPagination={true}>
                </DataTable>
            </Container>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => { return { ...state.location, ...state.task }; }

const instance = withRouter(connect(mapStateToProps)(TaskList));

export { instance as TaskList };
