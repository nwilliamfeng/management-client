import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { withHeader } from '../../controls'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormField,RadioFormField } from '../../controls'
import { taskActions } from '../../actions'
import { SubmitButton, ResetButton } from '../../controls'
import { isBoolean, isDate } from 'util';

/**
 * 验证模板
 */
const validationSchema = Yup.object().shape({

    platformID: Yup.string().required('平台类型不能为空。'),
    tagId: Yup.number().notOneOf([0],'任务标签不能为空。'),
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

    handlePropertyChange = (e) => {
        let task = { ...this.state.task };
        let value = e.target.value;     
      const s=new Date('2017-12-13');
      console.log(s);
        const propName = `${e.target.name}`;
        console.log(task[propName]);
        //这里需要加判断，如果是其他类型的话也需要转换
        if (task[propName] === parseInt(task[propName])) {
            task[propName] = parseInt(value);
        }
        else if (isBoolean(task[propName])) {
            task[propName] =JSON.parse(value);
        }
        else if (isDate(task[propName])) {
            console.log('sdf');
            task[propName] =new Date(value);
        }
        else {
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
                     dispatch(taskActions.addTask(values));
                }}
                render={({ values, errors, isSubmitting, attachMessage, setFieldValue }) => (<div style={{ padding: 10 }}>
                    <Form>
                        <FormField component="select" fieldName="platformID" displyName="平台类型" width={100} onChange={this.onChangePlatform}>
                            <option value={-1}>--未选择--</option>
                            {platforms && platforms.map(x => <option key={x.platformID} value={x.platformID}>{x.name}</option>)}
                        </FormField>
                        <FormField component="select" fieldName="tagId" displyName="任务标签" width={100} onChange={this.handlePropertyChange}>
                            <option value={0}>--未选择--</option>
                            {taskTags && taskTags.filter(x => x.platformID === task.platformID).sort(x => x.tagSequence).map(x => <option key={x.id} value={x.id}>{x.tagName}</option>)}
                        </FormField>
                        <FormField fieldName="name" displyName="任务名称" errors={errors} onChange={this.handlePropertyChange} />
                        <FormField fieldName="taskIconUrl" displyName="任务图标URL" errors={errors} onChange={this.handlePropertyChange} />
                        <FormField fieldName="taskUrl" displyName="任务跳转地址" errors={errors} onChange={this.handlePropertyChange} />
                        <FormField fieldName="taskButtonText" displyName="领取后按钮文案" errors={errors} onChange={this.handlePropertyChange} />
                        <FormField fieldName="taskSort" displyName="任务序号" errors={errors} onChange={this.handlePropertyChange} />
                        <RadioFormField  fieldName="isNeedGet" displyName="是否需要领取任务" errors={errors} onChange={this.handlePropertyChange} items={[{name:'是',value:true},{name:'否',value:false}]}/>
                        <RadioFormField  fieldName="isEnabled" displyName="是否有效" errors={errors} onChange={this.handlePropertyChange} items={[{name:'是',value:true},{name:'否',value:false}]}/>
                        <FormField fieldName="taskExpireDays" displyName="任务领取后有效天数" errors={errors} onChange={this.handlePropertyChange} />
                        <FormField fieldName="groupName" displyName="组群名称" errors={errors} onChange={this.handlePropertyChange} />
                        <FormField fieldName="point" displyName="发放积分" errors={errors} onChange={this.handlePropertyChange} />
                        
                        <FormField fieldName="beginTime" type={'date'} displyName="任务开始时间" width={300} errors={errors} onChange={this.handlePropertyChange} />
                        <FormField fieldName="endTime" type={'date'} displyName="任务结束时间" width={300} errors={errors} onChange={this.handlePropertyChange} />
                        <FormField fieldName="dayTimes" displyName="单用户单日可兑换" errors={errors} onChange={this.handlePropertyChange} />
                        <FormField fieldName="totalTimes" displyName="单用户累计可兑换" errors={errors} onChange={this.handlePropertyChange} />
                        <FormField fieldName="dayLimit" displyName="每日可兑换" errors={errors} onChange={this.handlePropertyChange} />
                        <FormField fieldName="totalLimit" displyName="总发放张数" errors={errors} onChange={this.handlePropertyChange} />
                        <FormField fieldName="taskMinPoint" displyName="任务的最小积分" errors={errors} onChange={this.handlePropertyChange} />
                        <FormField fieldName="taskMaxPoint" displyName="任务的最大积分" errors={errors} onChange={this.handlePropertyChange} />
                        <FormField fieldName="description" displyName="任务描述" errors={errors} onChange={this.handlePropertyChange} />
                        
                        {/* {attachMessage && <div style={{ color: 'red' }}>{attachMessage}</div>} */}
                        <SubmitButton disabled={isSubmitting && attachMessage == null} />
                        <ResetButton disabled={isSubmitting && attachMessage == null} />
                    </Form>
                </div>
                )}
            />
        </Page>
    }
}


const mapStateToProps = (state) => {
    return { ...state.location, ...state.task };
}

const task = withRouter(connect(mapStateToProps)(Task));

export { task as Task };
