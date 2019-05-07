import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {  DataTable, ShowDialog, CustomDialog } from '../../controls'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'
import { taskActions } from '../../actions'
import { TaskTag } from './TaskTag'
import {Container,TitleDiv} from '../part'

class TaskTagList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            currentTag: null,
            isOpenDialog: false,
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
        <TableCell>{this.state.platforms.find(x => x.platformID === row.platformID).name}</TableCell>
        <TableCell>{row.tagName}</TableCell>
        <TableCell>{row.tagSequence}</TableCell>
        <TableCell>{row.remark}</TableCell>
        <TableCell>{row.isEnabled === true ? '是' : '否'}</TableCell>
        <TableCell>{row.operator}</TableCell>
        <TableCell>{row.createTime}</TableCell>
        <TableCell>
            <div style={{ display: 'flex' }}>
                <Button size="small" color="primary" onClick={() => this.setState({ isOpenDialog: true, currentTag: row })}>详情</Button>
            </div>
        </TableCell>
    </TableRow>

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

    openNewDialog = () => {
        this.setState({ isOpenDialog: true, currentTag: this.createNewTag() });
    }

    renderTitle = () => <TitleDiv>
        <div>{'任务标签列表'}</div>
        <div style={{ display: 'flex' }}>
            <Button color="primary" onClick={this.openNewDialog}>添加</Button>
        </div>
    </TitleDiv>

    createNewTag = () => { return { tagSequence: 0, tagName: '', isEnabled: false, platformID: 0, remark: null } };

    onCommit = tag => {
        this.setState({ isOpenDialog: false, currentTag: null });
        this.props.dispatch(taskActions.addOrUpateTaskTag(tag));
    }

    render() {
        const { rows, currentTag, isOpenDialog } = this.state;
        return <React.Fragment>
            <ShowDialog alertMessage={this.props.alertMessage} />
            <CustomDialog
                onClose={()=>this.setState({isOpenDialog:false})}
                isOpen={isOpenDialog === true}
                title={currentTag == null ? '' : currentTag.id > 0 ? '修改任务标签' : '新建任务标签'} >
                <TaskTag tag={currentTag} onCommit={this.onCommit} />
            </CustomDialog>
            <Container title={this.renderTitle()} >
                <DataTable
                    rows={rows}
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
