import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as Yup from 'yup';
import { isBoolean, isDate } from 'util';
import { Formik,Form } from 'formik';
import { Grid, MenuItem, } from '@material-ui/core';
import { GridTextAreaField, GridSwitch, GridTextField, GridSelectField, GridRow, FormContainer } from '../helper'


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


class TaskTag extends Component {

    constructor(props) {
        super(props);
        const {tag,onCommit,platforms} =props;
        this.state = { tag,onCommit,platforms};
    }

    onPropertyChange = e => {
        let tag = { ...this.state.tag };
        let value = e.target.value;
        const propName = `${e.target.name}`;
        if (tag[propName] === parseInt(tag[propName])) {
            tag[propName] = parseInt(value);
        }
        else if (isBoolean(tag[propName])) {
            tag[propName] = JSON.parse(value);
        }
        else if (isDate(tag[propName])) {
            tag[propName] = new Date(value);
        }
        else {
            tag[propName] = value;
        }
        this.setState({ tag });
    }

    render() {
        const { tag, platforms,onCommit } = this.state;
        return < Formik
                initialValues={tag}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={values =>onCommit(values) }
                render={({ errors, }) => (
                    <Form style={{height:400}}>
                         
                                <GridSelectField style={{width:150}}  name="platformID" value={tag.platformID} errors={errors} label={'平台类型'} onChange={this.onChangePlatform}>
                                    {platforms && platforms.map(x => <MenuItem key={x.platformID} value={x.platformID}>{x.name}</MenuItem>)}
                                </GridSelectField>                                                 
                                                                  
                                <GridTextField style={{width:360}}   name="tagName" label="任务标签名称" value={tag.name} errors={errors} onChange={this.onPropertyChange} />
                           
                                <GridTextField  style={{marginTop:20,marginBottom:20, width:360}} name="tagSequence" label="任务标签顺序" value={tag.tagSequence} errors={errors} onChange={this.onPropertyChange}  />
                            
                                <GridTextAreaField  style={{marginTop:20,marginBottom:20,width:360}} name="remark" label="任务标签描述"  value={tag.remark} errors={errors} onChange={this.onPropertyChange}  />
                           
                                <GridSwitch name="isEnabled" label="是否有效" value={tag ? tag.isEnabled : false} onChange={this.onPropertyChange} />
                          
                    </Form>
                )}
            />  
    }
}

const mapStateToProps = (state) => {
    return { ...state.location, ...state.task };
}

const tag = withRouter(connect(mapStateToProps)( TaskTag));

export { tag as TaskTag };
