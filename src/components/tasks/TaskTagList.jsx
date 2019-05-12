import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {   ShowDialog, CustomDialog,QueryTable } from '../../controls'
import Button from '@material-ui/core/Button'
import { taskActions } from '../../actions'
import { TaskTag } from './TaskTag'
import {Container,TitleDiv} from '../part'

class TaskTagList extends Component {

    constructor(props) {
        super(props);
        this.state = {        
            currentTag: null,
            isOpenDialog: false,
        };
    }

    onSearch=()=>this.props.dispatch(taskActions.getTaskTags());
  
    columns = [
        { header: '支持平台', cell: row => this.props.platforms.find(x => x.platformID === row.platformID).name },
        { header: '任务标签名称', cell: row => row.tagName },
        { header: '任务标签顺序', cell: row => row.tagSequence },
        { header: '任务标签描述', cell: row => row.remark },
        { header: '是否有效', cell: row => row.isEnabled === true ? '是' : '否' },
        { header: '添加人员', cell: row => row.operator },
        { header: '添加时间', cell: row => row.createTime },
        { header: '操作', cell: row => <Button size="small" color="primary" onClick={() => this.setState({ isOpenDialog: true, currentTag: row })}>详情</Button>},    
    ]

    openNewDialog = () =>  this.setState({ isOpenDialog: true, currentTag: this.createNewTag() });

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
        const {  currentTag, isOpenDialog } = this.state;
        const {taskTags,totalCount} =this.props;
        return <React.Fragment>
            <ShowDialog alertMessage={this.props.alertMessage} />
            <CustomDialog
                onClose={()=>this.setState({isOpenDialog:false})}
                isOpen={isOpenDialog === true}
                title={currentTag == null ? '' : currentTag.id > 0 ? '修改任务标签' : '新建任务标签'} >
                <TaskTag tag={currentTag} onCommit={this.onCommit} />
            </CustomDialog>
            <Container title={this.renderTitle()} >
                <QueryTable  columns={this.columns} rows={taskTags} totalCount={ totalCount} onSearch={this.onSearch}/>      
            </Container>
        </React.Fragment>
    }
}

const mapStateToProps = (state) =>{ return {  ...state.task }};

const instance = withRouter(connect(mapStateToProps)(TaskTagList));

export { instance as TaskTagList };
