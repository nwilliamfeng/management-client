import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { withHeader, DataTable } from '../../controls'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { taskActions } from '../../actions'

const Container = withHeader(props => <div {...props}>
    {props.children}
</div>)

class TaskList extends Component {

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
        <TableCell>{row.createTime}</TableCell>
        <TableCell>
            <div style={{ display: 'flex' }}>
                <button>abc</button>
                <button>def</button>
            </div>
        </TableCell>
    </TableRow>

    constructor(props) {
        super(props);     
        this.state = { rows: [], pageIndex: 0, pageSize: 10, totalCount: 0 };
    }

    handleChangePage = (event, pageIndex) => {
        this.setState({ pageIndex:pageIndex});
        this.props.dispatch(taskActions.getTasks(pageIndex+1,this.state.pageSize));
    };

    handleChangeRowsPerPage = event => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(taskActions.getTasks());
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps != null) {
            const { currentTask, platforms, taskTags, alertMessage,totalCount,tasks } = nextProps;
            this.setState({ task: currentTask, platforms, taskTags, alertMessage,totalCount,rows:tasks });
        }
    }

    render() {
        const { rows, pageSize, pageIndex ,totalCount} = this.state;
        return <Container title={'任务列表'} >
            <DataTable
                rows={rows}
                pageSize={pageSize}
                pageIndex={pageIndex}
                totalCount={totalCount}
                onPageIndexChange={this.handleChangePage}
                onPageSizeChange={this.handleChangeRowsPerPage}
                renderHeader={this.renderHeader}
                renderRow={this.renderRow}>
            </DataTable>
        </Container>
    }
}


const mapStateToProps = (state) => {
    return { ...state.location, ...state.task };
}

const instance = withRouter(connect(mapStateToProps)(TaskList));

export { instance as TaskList };
