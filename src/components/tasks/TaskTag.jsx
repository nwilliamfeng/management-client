import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as Yup from 'yup';
import { taskActions } from '../../actions'
import { isBoolean, isDate } from 'util';
import { Formik } from 'formik';
import { Grid, MenuItem, } from '@material-ui/core';
import { GridTextAreaField, GridDatePickerField, GridRadioGroupField, GridTextField, GridSelectField, GridRow, FormContainer } from '../helper'
import {ShowDialog } from '../../controls'

/**
 * 验证模板
 */
const validationSchema = Yup.object().shape({
    platformID: Yup.string().required('平台类型不能为空。'),
    // tagId: Yup.number().notOneOf([0], '请选择任务标签。'),
    // name: Yup.string().required('任务名称不能为空。'),
    // taskSort: Yup.number().notOneOf([0], '请输入任务序号。'),
    // taskExpireDays: Yup.number().notOneOf([0], '请输入领取任务有效天数。'),
})

const optionalData = {
    defaultBooleans: [{ name: '是', value: true }, { name: '否', value: false }],
}

class TaskTag extends Component {

    constructor(props) {
        super(props);
        this.state = { task: null, tagIds: [], platforms: [], taskTags: []};
    }

    onChangePlatform = (e) => {
        const ptmid = parseInt(e.target.value);
        this.setState({ task: { ...this.state.task, platformID: ptmid, tagId: 0 } });
    }

    componentDidMount() {
        const { dispatch } = this.props;
        if (this.needCreate()) {
            dispatch(taskActions.createTask());
        }
        else {
            const taskId =this.props.location.search.replace('?taskId=','');
            dispatch(taskActions.getTaskInLocal(taskId));
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps != null) {
            const { currentTask, platforms, taskTags,alertMessage } = nextProps;
            this.setState({ task: currentTask, platforms, taskTags,alertMessage });
        }
    }

    needCreate = () => this.props.location.search === ''; //  console.log(this.props); //this.props.location.search -- ?id=abc

    onPropertyChange = e => {
        let task = { ...this.state.task };
        let value = e.target.value;
        const propName = `${e.target.name}`;
        //这里需要加判断，如果是其他类型的话也需要转换
        if (task[propName] === parseInt(task[propName])) {
            task[propName] = parseInt(value);
        }
        else if (isBoolean(task[propName])) {
            task[propName] = JSON.parse(value);
        }
        else if (isDate(task[propName])) {
            task[propName] = new Date(value);
        }
        else {
            task[propName] = value;
        }
        this.setState({ task });
    }

    render() {
        const { dispatch } = this.props;
        const { task, platforms, taskTags } = this.state;
        return <React.Fragment>      
            <ShowDialog alertMessage={this.props.alertMessage}/> 
            {task && < Formik
                initialValues={task}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={values => {
                    dispatch(taskActions.addOrUpateTask(values));
                }}
                render={({ errors, }) => (
                    <FormContainer title={this.needCreate() ? '添加任务' : `修改任务：${task.name}`}>
                        <Grid container spacing={24} direction="column"   >
                            <GridRow>
                                <GridSelectField style={{ width: 120 }} name="platformID" value={task.platformID} errors={errors} label={'平台类型'} onChange={this.onChangePlatform}>
                                    {platforms && platforms.map(x => <MenuItem key={x.platformID} value={x.platformID}>{x.name}</MenuItem>)}
                                </GridSelectField>
                                <GridSelectField style={{ width: 192 }} name="tagId" value={task.tagId} errors={errors} label={'任务标签'} shrink={task.tagId !== 0} onChange={this.onPropertyChange}>
                                    {taskTags && taskTags.filter(x => x.platformID === task.platformID).sort(x => x.tagSequence).map(x => <MenuItem key={x.id} value={x.id}>{x.tagName}</MenuItem>)}
                                </GridSelectField>
                                <GridTextField name="name" label="任务名称" value={task.name} errors={errors} onChange={this.onPropertyChange} />
                            </GridRow>
                            <GridRow>
                                <GridTextField name="taskSort" label="任务序号" value={task.taskSort} errors={errors} onChange={this.onPropertyChange} style={{ width: 120 }} />
                                <GridTextField name="taskIconUrl" label="任务图标URL" value={task.taskIconUrl} errors={errors} onChange={this.onPropertyChange} />
                                <GridTextField name="taskUrl" label="任务跳转地址" value={task.taskUrl} errors={errors} onChange={this.onPropertyChange} />
                                <GridTextField name="taskButtonText" label="领取后按钮文案" value={task.taskButtonText} errors={errors} onChange={this.onPropertyChange} />
                            </GridRow>
                            <GridRow style={{ marginTop: 35, marginBottom: 35 }}>
                                <GridRadioGroupField name="isEnabled" style={{ width: 120 }} items={optionalData.defaultBooleans} value={task ? task.isEnabled : false} label="是否有效" onChange={this.onPropertyChange} />
                                <GridRadioGroupField name="isNeedGet" style={{ width: 192 }} label="是否需要领取任务" items={optionalData.defaultBooleans} value={task ? task.isNeedGet : false} onChange={this.onPropertyChange} />
                                <GridTextField name="taskExpireDays" value={task.taskExpireDays} label="任务领取后有效天数" errors={errors} onChange={this.onPropertyChange} />
                                <GridTextField name="groupName" value={task.groupName} label="组群名称" errors={errors} onChange={this.onPropertyChange} />
                                <GridTextField name="point" value={task.point} label="发放积分" errors={errors} onChange={this.onPropertyChange} />
                            </GridRow>
                            <GridRow style={{  marginBottom: 35 }}>
                                <GridTextField name="dayLimit" value={task.dayLimit} style={{ width: 120 }} label="每日可兑换" errors={errors} onChange={this.onPropertyChange} />
                                <GridTextField name="dayTimes" value={task.dayTimes} label="单用户单日可兑换" errors={errors} onChange={this.onPropertyChange} />
                                <GridTextField name="totalTimes" value={task.totalTimes} label="单用户累计可兑换" errors={errors} onChange={this.onPropertyChange} />
                                <GridTextField name="totalLimit" value={task.totalLimit} label="总发放张数" errors={errors} onChange={this.onPropertyChange} />
                                <GridDatePickerField name="beginTime" onChange={this.onPropertyChange} label="任务开始时间" value={task.beginTime} />
                                <GridDatePickerField name="endTime" value={task.endTime} label="任务结束时间" errors={errors} onChange={this.onPropertyChange} />
                            </GridRow>
                            <GridRow>
                                <GridTextField name="taskMinPoint" value={task.taskMinPoint} style={{ width: 120 }} label="任务的最小积分" errors={errors} onChange={this.onPropertyChange} />
                                <GridTextField name="taskMaxPoint" value={task.taskMaxPoint} style={{ width: 120 }} label="任务的最大积分" errors={errors} onChange={this.onPropertyChange} />
                            </GridRow>
                             <div style={{ padding: '60px 30px 30px 10px' }} >
                                <GridTextAreaField name="description" rows={3} value={task.description} label="任务描述" errors={errors} onChange={this.onPropertyChange} />
                            </div>  
                        </Grid>
                    </FormContainer>
                )}
            />}
        </React.Fragment>
    }
}

const mapStateToProps = (state) => {
    return { ...state.location, ...state.task };
}

const tag = withRouter(connect(mapStateToProps)( TaskTag));

export { tag as TaskTag };
