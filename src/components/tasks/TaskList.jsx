import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { withHeader, DataTable, ShowDialog } from '../../controls'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'
import { taskActions } from '../../actions'
import { routeUrls } from '../../constants'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Container = withHeader(props => <div {...props}>
    {props.children}
</div>)


class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            platformID: '0',
            startTime: '0001-01-01',
            endTime: result.beginDate = moment().format('YYYY-MM-DD'),
            rows: [],
            pageIndex: 0,
            pageSize: 10,
            totalCount: 0
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

    renderRow = row => <TableRow key={row.taskID}>
        <TableCell>{row.platformID}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.point}</TableCell>
        <TableCell>{row.taskState}</TableCell>
        <TableCell>{row.operator}</TableCell>
        <TableCell>{row.createTime2}</TableCell>
        <TableCell>
            <div style={{ display: 'flex' }}>
                <Button size="small" color="primary" component={Link} to={`${routeUrls.TASK_ADD_UPDATE}?taskId=${row.taskID}`}>详情</Button>
                <Button size="small" color="primary" onClick={() => this.onModifyClick(row)}>修改</Button>
            </div>
        </TableCell>
    </TableRow>


    onPageIndexChange = (event, pageIndex) => {
        this.setState({ pageIndex: pageIndex });
        this.props.dispatch(taskActions.getTasks(pageIndex + 1, this.state.pageSize));
    };

    onPageSizeChange = event => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(taskActions.getTasks());
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps != null) {
            const { currentTask, platforms, taskTags, alertMessage, totalCount, tasks } = nextProps;
            this.setState({ task: currentTask, platforms, taskTags, alertMessage, totalCount, rows: tasks });
        }
    }

    render() {
        const { rows, pageSize, pageIndex, totalCount } = this.state;
        return <React.Fragment>
            <ShowDialog alertMessage={this.props.alertMessage} />
            <Container title={'任务列表'} >
                <DataTable
                    rows={rows}
                    pageSize={pageSize}
                    pageIndex={pageIndex}
                    totalCount={totalCount}
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

const instance = withRouter(connect(mapStateToProps)(TaskList));

export { instance as TaskList };
