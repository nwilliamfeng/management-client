import React from 'react'
import styled from 'styled-components'
import { Field, ErrorMessage } from 'formik';

const FlexDiv = styled.div`
    display:flex;
    justify-content:space-between;
    margin-bottom:10px;
    align-items:center;
`

const Label = styled.label`
    width:15%;
    text-align:right;
    margin-top:5px;
`

const ContentDiv = styled.div`
    margin-left:10px;
    width:70%;
    display:flex;
    flex-direction:column;
   
    text-align:left;
`
const EmptyDiv = styled.div`
     width:15%;
`

const BootstrapField = props => {
    const { component, fieldName, height, isError, disabled, width, onChange, type } = props;

    const style = { borderRadius: 1, height: height ? height : 27, width: width ? width : '100%', padding: '1px 5px', fontSize: 13 };
    const errorStyle = {
        borderColor: 'red',
        boxShadow: '0 1px 1px rgba(229, 103, 23, 0.075) inset, 0 0 8px rgba(229, 103, 23, 0.6)',
        outline: '0 none',
        ...style,
    }
    return <Field component={component} disabled={disabled} onChange={onChange} type={type ? type : "text"} name={fieldName} className='form-control' style={isError === true ? errorStyle : style}>
        {props.children}
    </Field>
}

/**
 * 对formik的field进行封装,默认采用bootstrap样式
 * @param {*} param0 
 */
export const FormField = ({ type, component, displyName, disabled, fieldName, height, width, onChange, errors, ...props }) => {
    return <FlexDiv>
        <Label>{displyName}</Label>
        <ContentDiv>
            <BootstrapField
                type={type}
                fieldName={fieldName}
                onChange={onChange}
                disabled={disabled}
                component={component}
                height={height}
                width={width}
                isError={errors && errors[fieldName] != null} >
                {props.children}
            </BootstrapField>
            <ErrorMessage name={fieldName} component="div" style={{ color: 'red' }} />
        </ContentDiv>
        <EmptyDiv />
    </FlexDiv>
}


const RadioDiv = styled.div`
    display:flex;
   
    margin-right:10px;

`

export const RadioFormField = ({ type, displyName, disabled, items, fieldName, height, width, onChange, errors, ...props }) => {
    return <FlexDiv>
        <Label>{displyName}</Label>
        <ContentDiv>
            <div style={{ display: 'flex' }}>
                {items && items.map(x => <RadioDiv key={x.name}>
                    <Field type="radio" name={fieldName} value={x.value} onChange={onChange} checked={true}/>
                    {x.name}
                </RadioDiv>)}
            </div>
            <ErrorMessage name={fieldName} component="div" style={{ color: 'red' }} />
        </ContentDiv>
        <EmptyDiv />
    </FlexDiv>
}