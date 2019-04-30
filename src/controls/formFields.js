import React from 'react'

import {
    InputLabel,
    FormControl,
    MenuItem,
    TextField,
    Select,
    FormHelperText,
    withStyles,
} from '@material-ui/core';


export const FormSelect = props =>{ 
    const {  errors,   name, label,value,onChange,style ,shrink} =props;
  console.log(name+'shrink'+shrink);
 return <FormControl error={ Boolean(errors[name])} style={style} >
    <InputLabel shrink={shrink==null?true:shrink===true}  >{label}</InputLabel>
    <Select name={name} value={value} onChange={onChange}  >
        {props.children}
    </Select>
    <FormHelperText>{errors[name] ? errors[name] : ""}</FormHelperText>
</FormControl>
}