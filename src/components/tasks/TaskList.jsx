import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { ShowDialog, CustomDialog ,QueryTable} from '../../controls'
import Button from '@material-ui/core/Button'
import { taskActions } from '../../actions'
import moment from 'moment'
import { Task } from './Task'
import { defaultValues } from '../helper'
import { Container, TitleDiv } from '../part'

class TaskList extends Component {

    columns = [
        { header: '支持平台', cell: row => this.props.platforms.find(x => x.platformID === row.platformID).name },
        { header: '任务名称', cell: row => row.name },
        { header: '完成任务可得积分', cell: row => row.point },
        { header: '任务状态', cell: row => this.getTaskState(row.taskState) },
        { header: '添加人员', cell: row => row.operator },
        { header: '添加时间', cell: row => row.createTime },
        { header: '操作', cell: row => <Button size="small" color="primary" onClick={() => this.setState({ isOpenDialog: true, currentTask: row })}>详情</Button>},
    ]

    constructor(props) {
        super(props); 
        this.state = {
            isOpenDialog: false,                 
            currentTask: null,
            searchCondition: {
                platformID: '0',
                startTime: '0001-01-01',
                endTime: moment().format('YYYY-MM-DD'),
                pageIndex: 1,
                pageSize: 10,
            }
        };
    }

    getTaskState = state => state === 0 ? "待审核" : state === 1 ? "已上架" : "已下架";
    
    renderTitle = () => <TitleDiv>
        <div>{'任务列表'}</div>
        <div style={{ display: 'flex' }}>
            <Button color="primary" onClick={() => this.setState({ isOpenDialog: true, currentTask: defaultValues.task })}>添加</Button>
        </div>
    </TitleDiv>

    onCommit = task => {
        const { platformId, startTime, endTime, pageIndex, pageSize } = this.state;
        this.setState({ isOpenDialog: false, currentTask: null });
        this.props.dispatch(taskActions.addOrUpateTask(task, { platformId, startTime, endTime, pageIndex, pageSize }));
    }

    onSearch = value => {
        this.setState({searchCondition:value});
        this.props.dispatch(taskActions.getTasks({ ...value }));
    }

    render() {
        const { taskTags, platforms, tasks,totalCount } = this.props;
        const {isOpenDialog,currentTask,searchCondition} =this.state;
        return <React.Fragment>
            <ShowDialog alertMessage={this.props.alertMessage} />
            <CustomDialog
                onClose={() => this.setState({ isOpenDialog: false })}
                isOpen={isOpenDialog === true}
                title={currentTask == null ? '' : currentTask.taskID != null ? '修改任务' : '新建任务'} >
                <Task task={currentTask} platforms={platforms} taskTags={taskTags} onCommit={this.onCommit} />
            </CustomDialog>
            <Container title={this.renderTitle()} >
            <QueryTable  searchCondition={ searchCondition} onSearch={this.onSearch} columns={this.columns} rows={tasks} totalCount={ totalCount} />          
            </Container>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => { return { ...state.location, ...state.task }; }

const instance = withRouter(connect(mapStateToProps)(TaskList));

export { instance as TaskList };
