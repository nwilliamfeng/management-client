import React, { Component } from 'react';
import * as Yup from 'yup';
import { isBoolean, isDate } from 'util';
import { Formik, Form } from 'formik';
import { MenuItem, Button, } from '@material-ui/core';
import { GridTextAreaField, GridSwitch, GridTextField, GridSelectField } from '../helper'


/**
 * 验证模板
 */
const validationSchema = Yup.object().shape({
    platformID: Yup.string().required('平台类型不能为空。'),
    tagName: Yup.string().required('任务标签名称不能为空。'),
    tagSequence: Yup.number().moreThan(0, '请输入任务标签顺序。'),
})


export class TaskTag extends Component {

    constructor(props) {
        super(props);
        const { tag, onCommit, platforms } = props;
        this.state = { tag, onCommit, platforms };
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
        const { tag, platforms, onCommit } = this.state;
        return < Formik
            initialValues={tag}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={values => onCommit(values)}
            render={({ errors, }) => (
                <Form style={{ minHeight: 360 }}>

                    <GridSelectField style={{ width: 350 }} name="platformID" value={tag.platformID} errors={errors} label={'平台类型'} onChange={this.onPropertyChange}>
                        {platforms && platforms.map(x => <MenuItem key={x.platformID} value={x.platformID}>{x.name}</MenuItem>)}
                    </GridSelectField>

                    <GridTextField style={{ width: 360 }} name="tagName" label="任务标签名称" value={tag.tagName} errors={errors} onChange={this.onPropertyChange} />

                    <GridTextField style={{ marginTop: 20, marginBottom: 20, width: 360 }} name="tagSequence" label="任务标签顺序" value={tag.tagSequence} errors={errors} onChange={this.onPropertyChange} />

                    <GridTextAreaField style={{ marginBottom: 20, width: 360 }} name="remark" label="任务标签描述" value={tag.remark} errors={errors} onChange={this.onPropertyChange} />

                    <GridSwitch name="isEnabled" label="是否有效" value={tag ? tag.isEnabled : false} onChange={this.onPropertyChange} />

                    <hr style={{border:'none',borderBottom: 'solid 1px lightgray',marginLeft:-15,marginRight:-15, }} />


                    <Button variant="contained" color="primary" style={{marginTop:5}}  type="commit">保存</Button>
                </Form>
            )}
        />
    }
}
