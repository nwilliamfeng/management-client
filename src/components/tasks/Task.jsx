import React, { Component } from 'react';
import * as Yup from 'yup';
import { isBoolean, isDate } from 'util';
import { Formik, Form } from 'formik';
import { MenuItem, Button, } from '@material-ui/core';
import { GridSwitch, GridDatePickerField, GridTextField, GridSelectField, GridRow } from '../helper'

/**
 * 验证模板
 */
const validationSchema = Yup.object().shape({
    platformID: Yup.string().required('平台类型不能为空。'),
    tagId: Yup.number().notOneOf([0], '请选择任务标签。'),
    name: Yup.string().required('任务名称不能为空。'),
    taskSort: Yup.number().notOneOf([0], '请输入任务序号。'),
    taskExpireDays: Yup.number().notOneOf([0], '请输入领取任务有效天数。'),
})

const fieldStyles = {firstColumn: { width: 200 },}

export class Task extends Component {

    constructor(props) {
        super(props);
        const { task, onCommit, platforms,taskTags } = props;
        this.state = { 
            taskTypes: [{ name: '无限制', value: 0 }, { name: '一次任务', value: 1 }, { name: '日常任务', value: 2 }, { name: '月任务', value: 3 }, { name: '年任务', value: 4 }, { name: '活动', value: 5 }],
            taskSubTypes: [{ category: 1, name: '绑手机', value: 101 }, { category: 1, name: '首次交易', value: 102 }, { category: 2, name: '签到', value: 201 }, { category: 2, name: '每日答题任务', value: 202 }],
            task,
            onCommit,
            platforms,
            taskTags,
        };
    }

    onChangePlatform = (e) => {
        const ptmid = parseInt(e.target.value);
        this.setState({ task: { ...this.state.task, platformID: ptmid, tagId: 0 } });
    }

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
        const { task, platforms, taskTags, taskTypes, taskSubTypes,onCommit } = this.state;
        return < Formik
            initialValues={task}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={values =>onCommit(values)}
            render={({ errors, }) => (
                   <Form >
                       <div style={{padding:10}}>
                       <GridRow>
                            <GridSelectField style={fieldStyles.firstColumn} name="platformID" value={task.platformID} errors={errors} label={'平台类型'} onChange={this.onChangePlatform}>
                                {platforms && platforms.map(x => <MenuItem key={x.platformID} value={x.platformID}>{x.name}</MenuItem>)}
                            </GridSelectField>
                            <GridSelectField style={{ width: 180 }} name="tagId" value={task.tagId} errors={errors} label={'任务标签'} shrink={task.tagId !== 0} onChange={this.onPropertyChange}>
                                {taskTags && taskTags.filter(x => x.platformID === task.platformID).sort(x => x.tagSequence).map(x => <MenuItem key={x.id} value={x.id}>{x.tagName}</MenuItem>)}
                            </GridSelectField>
                            <GridSelectField style={{ width: 192 }} name="taskType" value={task.taskType} errors={errors} label={'任务类型'} shrink={true} onChange={this.onPropertyChange}>
                                {taskTypes.map(x => <MenuItem key={x.value} value={x.value}>{x.name}</MenuItem>)}
                            </GridSelectField>
                            <GridSelectField style={{ width: 192 }} name="taskSubType" value={task.taskSubType} errors={errors} label={'任务子类型'} shrink={taskSubTypes.findIndex(x => x.category === task.taskType) > -1} onChange={this.onPropertyChange}>
                                {taskSubTypes.filter(x => x.category === task.taskType).map(x => <MenuItem key={x.value} value={x.value}>{x.name}</MenuItem>)}
                            </GridSelectField>
                        </GridRow>
                        <GridRow >
                            <GridTextField name="name" label="任务名称" style={fieldStyles.firstColumn} value={task.name} errors={errors} onChange={this.onPropertyChange} />
                            <GridTextField name="description" value={task.description} label="任务描述" style={{ width: 690 }} errors={errors} onChange={this.onPropertyChange} />
                        </GridRow>
                        <GridRow style={{ marginTop: 35, marginBottom: 35 }}>
                            <GridTextField name="taskSort" label="任务序号" style={fieldStyles.firstColumn} value={task.taskSort} errors={errors} onChange={this.onPropertyChange} />
                            <GridTextField name="taskIconUrl" label="任务图标URL" value={task.taskIconUrl} errors={errors} onChange={this.onPropertyChange} />
                            <GridTextField name="taskUrl" label="任务跳转地址" style={{ width: 220 }} value={task.taskUrl} errors={errors} onChange={this.onPropertyChange} />
                            <GridTextField name="taskButtonText" label="领取后按钮文案" value={task.taskButtonText} errors={errors} onChange={this.onPropertyChange} />
                        </GridRow>
                        <GridRow>
                            <div style={{ width: 245, display: 'flex', justifyContent: 'left', alignItems: 'center', paddingLeft: 20 }}>
                                <GridSwitch name="isEnabled" value={task ? task.isEnabled : false} label="是否有效" onChange={this.onPropertyChange} />
                            </div>
                            <div style={{ width: 210, display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                <GridSwitch name="isNeedGet" label="是否需要领取任务" value={task ? task.isNeedGet : false} onChange={this.onPropertyChange} />
                            </div>
                            {/* <GridRadioGroupField name="isEnabled" style={fieldStyles.firstColumn}  items={optionalData.defaultBooleans} value={task ? task.isEnabled : false} label="是否有效" onChange={this.onPropertyChange} /> */}
                            <GridTextField name="taskExpireDays" value={task.taskExpireDays} label="任务领取后有效天数" style={{ width: 220 }} errors={errors} onChange={this.onPropertyChange} />
                            <GridTextField name="groupName" value={task.groupName} label="组群名称" errors={errors} onChange={this.onPropertyChange} />
                            <GridTextField name="point" value={task.point} label="兑换所需的积分" errors={errors} onChange={this.onPropertyChange} />
                        </GridRow>
                        <GridRow style={{ marginTop: 35, marginBottom: 35 }}>
                            <GridTextField name="dayTimes" value={task.dayTimes} style={fieldStyles.firstColumn} label="单用户每天可完成任务次数" errors={errors} onChange={this.onPropertyChange} />
                            <GridTextField name="totalTimes" value={task.totalTimes} label="单用户可完成任务总次数" errors={errors} onChange={this.onPropertyChange} />
                            <GridTextField name="dayLimit" value={task.dayLimit} style={{ width: 220 }} label="所有用户每天可完成任务次数" errors={errors} onChange={this.onPropertyChange} />                           
                        </GridRow>
                        <GridRow style={{  marginBottom: 35 }}>
                            <GridTextField name="dayTimes" value={task.dayTimes} style={fieldStyles.firstColumn} label="单用户每天可完成任务次数" errors={errors} onChange={this.onPropertyChange} />
                            <GridTextField name="totalTimes" value={task.totalTimes} label="单用户可完成任务总次数" errors={errors} onChange={this.onPropertyChange} />
                            <GridTextField name="dayLimit" value={task.dayLimit} style={{ width: 220 }} label="所有用户每天可完成任务次数" errors={errors} onChange={this.onPropertyChange} />
                            <GridTextField name="totalLimit" value={task.totalLimit} label="所有用户可完成任务总次数" errors={errors} onChange={this.onPropertyChange} />
                            <GridDatePickerField name="beginTime" onChange={this.onPropertyChange} label="任务开始时间" value={task.beginTime} />
                            <GridDatePickerField name="endTime" value={task.endTime} label="任务结束时间" errors={errors} onChange={this.onPropertyChange} />
                        </GridRow>
                        <GridRow>
                            <GridTextField name="taskMinPoint" value={task.taskMinPoint} style={fieldStyles.firstColumn} label="任务的最小积分" errors={errors} onChange={this.onPropertyChange} />
                            <GridTextField name="taskMaxPoint" value={task.taskMaxPoint} style={fieldStyles.firstColumn} label="任务的最大积分" errors={errors} onChange={this.onPropertyChange} />
                        </GridRow>
                       </div>                                     
                    <hr style={{ border: 'none', borderBottom: 'solid 1px lightgray', marginLeft: -15, marginRight: -15, marginTop:10 }} />
                    <Button variant="contained" color="primary" style={{ marginTop: 5 }} type="commit">保存</Button>
                </Form>
            )}
        />
    }
}

