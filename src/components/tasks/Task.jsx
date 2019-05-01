import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { ChipList, withHeader, FormSelectField, FormTextField, FormRadioGroupField, FormDatePickerField, withGridItem } from '../../controls'
import styled from 'styled-components'
import * as Yup from 'yup';
import { taskActions } from '../../actions'
import { SubmitButton, ResetButton } from '../../controls'
import { isBoolean, isDate } from 'util';


import { Formik, Field, Form } from 'formik';
import {
    Grid,
    Paper,
    InputLabel,
    FormControl,
    MenuItem,
    TextField,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    Select,
    FormHelperText,
} from '@material-ui/core';


const MyTextField=withGridItem(FormTextField)
 

/**
 * 验证模板
 */
const validationSchema = Yup.object().shape({

    platformID: Yup.string().required('平台类型不能为空。'),
    tagId: Yup.number().notOneOf([0], '请选择任务标签。'),
    name: Yup.string().required('任务名称不能为空。'),
})



const Page = withHeader(props => <React.Fragment>
    {props.children}
</React.Fragment>)

class Task extends Component {

    constructor(props) {
        super(props);
        this.state = { task: null, tagIds: [], platforms: [], taskTags: [] };

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
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps != null) {
            const { currentTask, platforms, taskTags } = nextProps;
            this.setState({ task: currentTask, platforms, taskTags });
        }
    }

    needCreate = () => this.props.location.search === ''; //  console.log(this.props); //this.props.location.search -- ?id=abc

    onPropertyChange = (e) => {
        let task = { ...this.state.task };
        let value = e.target.value;

        const propName = `${e.target.name}`;
        //这里需要加判断，如果是其他类型的话也需要转换
        if (task[propName] === parseInt(task[propName])) {
            task[propName] = parseInt(value);
        }
        else if (isBoolean(task[propName])) {
            console.log('ddd');
            task[propName] = JSON.parse(value);
        }
        else if (isDate(task[propName])) {

            task[propName] = new Date(value);
        }
        else {
            console.log(value);
            task[propName] = value;

        }
        this.setState({ task });
    }

    render() {
        const { dispatch } = this.props;
        const { task, platforms, taskTags } = this.state;
        return <Page title={this.needCreate() ? '添加任务' : this.props.location.search} {...this.props} >
            <Formik
                initialValues={task}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={values => {
                    console.log(values);
                    // dispatch(taskActions.addTask(values));
                }}
                render={({ values, errors, isSubmitting, attachMessage, touched, }) => (<div>
                    {/* <ChipList/> */}
                    <Form>
                        <Grid container spacing={12} direction="column">
                            <Grid item  >
                                <Grid container spacing={40}  >
                                    <Grid item>
                                        <FormSelectField style={{ width: 120 }}
                                            name="platformID"
                                            value={task ? task.platformID : -1}
                                            errors={errors}
                                            label={'平台类型'}
                                            onChange={this.onChangePlatform}>
                                            {platforms && platforms.map(x => <MenuItem key={x.platformID} value={x.platformID}>{x.name}</MenuItem>)}
                                        </FormSelectField>
                                    </Grid>
                                    <Grid item>
                                        <FormSelectField style={{ width: 100 }}
                                            name="tagId"
                                            value={task ? task.tagId : 0}
                                            errors={errors}
                                            label={'任务标签'}
                                            shrink={task ? task.tagId !== 0 : false}
                                            onChange={this.onPropertyChange}>
                                            {taskTags && taskTags.filter(x => x.platformID === task.platformID).sort(x => x.tagSequence).map(x => <MenuItem key={x.id} value={x.id}>{x.tagName}</MenuItem>)}
                                        </FormSelectField>
                                    </Grid>
                                    
                                        <MyTextField name="name" label="任务名称" errors={errors} onChange={this.onPropertyChange} />
                                     
                                </Grid>
                            </Grid>
                            <Grid item  >
                                <Grid container spacing={40}>
                                    <Grid item>
                                        <FormTextField name="taskIconUrl" label="任务图标URL" errors={errors} onChange={this.handlePropertyChange} />
                                    </Grid>
                                    <Grid item>
                                        <FormTextField name="taskUrl" label="任务跳转地址" errors={errors} onChange={this.handlePropertyChange} />
                                    </Grid>
                                    <Grid item>
                                        <FormTextField name="taskButtonText" label="领取后按钮文案" errors={errors} onChange={this.handlePropertyChange} />
                                    </Grid>
                                   
                                        <MyTextField name="taskSort" label="任务序号" errors={errors} onChange={this.handlePropertyChange} />
                                   

                                </Grid>
                            </Grid>

                        </Grid>






                        <FormDatePickerField onChange={this.onPropertyChange} label="任务开始时间" value={task ? task.beginDate : ''} />

                        <FormRadioGroupField name="isEnabled"
                            items={[{ name: '是', value: true }, { name: '否', value: false }]}
                            value={task ? task.isEnabled : false}
                            label="是否有效"
                            onChange={this.onPropertyChange}
                        />

                        <SubmitButton disabled={isSubmitting && attachMessage == null} />
                        <ResetButton disabled={isSubmitting && attachMessage == null} />
                    </Form>
                </div>
                )}
            />
        </Page>
    }
}


// render={({ values, errors, isSubmitting, attachMessage, setFieldValue }) => (<div style={{ padding: 10 }}>
//     <Form>
//        
//         
//         <FormField fieldName="taskIconUrl" displyName="任务图标URL" errors={errors} onChange={this.handlePropertyChange} />
//         <FormField fieldName="taskUrl" displyName="任务跳转地址" errors={errors} onChange={this.handlePropertyChange} />
//         <FormField fieldName="taskButtonText" displyName="领取后按钮文案" errors={errors} onChange={this.handlePropertyChange} />
//         <FormField fieldName="taskSort" displyName="任务序号" errors={errors} onChange={this.handlePropertyChange} />
//         <RadioFormField  fieldName="isNeedGet" displyName="是否需要领取任务" errors={errors} onChange={this.handlePropertyChange} items={[{name:'是',value:true},{name:'否',value:false}]}/>
//         <RadioFormField  fieldName="isEnabled" displyName="是否有效" errors={errors} onChange={this.handlePropertyChange} items={[{name:'是',value:true},{name:'否',value:false}]}/>
//         <FormField fieldName="taskExpireDays" displyName="任务领取后有效天数" errors={errors} onChange={this.handlePropertyChange} />
//         <FormField fieldName="groupName" displyName="组群名称" errors={errors} onChange={this.handlePropertyChange} />
//         <FormField fieldName="point" displyName="发放积分" errors={errors} onChange={this.handlePropertyChange} />

//         <FormField fieldName="beginTime" type={'date'} displyName="任务开始时间" width={300} errors={errors} onChange={this.handlePropertyChange} />
//         <FormField fieldName="endTime" type={'date'} displyName="任务结束时间" width={300} errors={errors} onChange={this.handlePropertyChange} />
//         <FormField fieldName="dayTimes" displyName="单用户单日可兑换" errors={errors} onChange={this.handlePropertyChange} />
//         <FormField fieldName="totalTimes" displyName="单用户累计可兑换" errors={errors} onChange={this.handlePropertyChange} />
//         <FormField fieldName="dayLimit" displyName="每日可兑换" errors={errors} onChange={this.handlePropertyChange} />
//         <FormField fieldName="totalLimit" displyName="总发放张数" errors={errors} onChange={this.handlePropertyChange} />
//         <FormField fieldName="taskMinPoint" displyName="任务的最小积分" errors={errors} onChange={this.handlePropertyChange} />
//         <FormField fieldName="taskMaxPoint" displyName="任务的最大积分" errors={errors} onChange={this.handlePropertyChange} />
//         <FormField fieldName="description" displyName="任务描述" errors={errors} onChange={this.handlePropertyChange} />

//         {/* {attachMessage && <div style={{ color: 'red' }}>{attachMessage}</div>} */}
//         <SubmitButton disabled={isSubmitting && attachMessage == null} />
//         <ResetButton disabled={isSubmitting && attachMessage == null} />
//     </Form>
// </div>
// )}


const mapStateToProps = (state) => {
    return { ...state.location, ...state.task };
}

const task = withRouter(connect(mapStateToProps)(Task));

export { task as Task };
