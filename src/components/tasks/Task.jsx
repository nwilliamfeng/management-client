import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { withHeader } from '../../controls'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormField } from '../../controls'
import { taskActions } from '../../actions'
import {SubmitButton,ResetButton} from '../../controls'

/**
 * 验证模板
 */
const validationSchema = Yup.object().shape({

    id: Yup.string().required('Id不能为空。'),
    value: Yup.string().required('value不能为空。'),
})


const Page = withHeader(props => <React.Fragment>
    {props.children}
</React.Fragment>)

class Task extends Component {

    constructor(props) {
        super(props);
        this.state={value:{name:'abcd',platformID:0}}; 
         
    }

    componentDidMount() {
        const { dispatch } = this.props;
        if (this.needCreate()) {
            dispatch(taskActions.createTask());
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext){
        return true;
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const { currentTask } = nextProps;
        if(currentTask!=null && this.state.value==null){
            
            console.log('do set');
            this.setState({value:currentTask});
        }
        else{
            console.log(this.state.value);
        }
    }

    needCreate = () => this.props.location.search === '';

    onPlatFormTypeChange=e=>{
       // console.log(e);
     
    }

    handleChange=(e,t)=>{
        console.log(e);
    }

    render() {
        console.log(this.props); //this.props.location.search -- ?id=abc
        const {dispatch} =this.props;
        const {value} =this.state;
        console.log('do render');
        console.log(value);
        return <Page title={this.needCreate() ? '添加任务' : this.props.location.search} {...this.props} >
            <Formik
           
                initialValues={value}
               
                validationSchema={validationSchema}
                onSubmit={values => {
                    console.log(values);
                   // dispatch(dbActions.addKey(connectionName, dbIdx, dbId, values.type, values.id, values.key, values.value));
                }}
                render={({ values, errors , isSubmitting ,attachMessage}) => (<div style={{ padding: 10 }}>
                    <Form>
                        <FormField component="select" fieldName="platformID" displyName="平台类型" width={100} onChange={this.handleChange}>
                            <option value={-1}>--未选择--</option>
                            <option value={0}>全部平台</option>
                            <option value={1}>基金</option>
                            <option value={2}>证券</option>             
                        </FormField>
                        <FormField component="select" fieldName="tagId" displyName="任务标签" width={100}>
                            <option value={-1}>--未选择--</option>
                            <option value={0}>推荐任务</option>
                            <option value={1}>新手任务</option>
                            <option value={2}>日常任务</option>             
                        </FormField>
                        <FormField fieldName="name" displyName="任务名称" errors={errors} />
                        {(Number.parseInt(values.type) === 2 || Number.parseInt(values.type) === 4) && <FormField fieldName="key" displyName={Number.parseInt(values.type) === 2 ? 'Key' : 'Score'} errors={errors} />}
                        <FormField component="textarea" fieldName="value" displyName="Value" errors={errors} height={150} />
                        {attachMessage && <div style={{ color: 'red' }}>{attachMessage}</div>}
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
