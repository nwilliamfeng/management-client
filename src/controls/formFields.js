import React from 'react'
import styled from 'styled-components'

import {
    InputLabel,
    FormControl,
    MenuItem,
    TextField,
    Radio,
    Select,
    FormHelperText,
    withStyles,
    Grid,
} from '@material-ui/core';


const RadioDiv = styled.div`
    display:flex;
    margin-right:15px;
   
    align-items:center;
`

export const FormSelectField = props => {
    const { errors, name, label, value, onChange, style, shrink } = props;
    return <FormControl error={Boolean(errors[name])} style={style} >
        <InputLabel shrink={shrink == null ? true : shrink === true}  >{label}</InputLabel>
        <Select name={name} value={value} onChange={onChange}  >
            {props.children}
        </Select>
        <FormHelperText>{errors[name]}</FormHelperText>
    </FormControl>
}

// export const FormRadioGroupField = ({ value, items, onChange, label, name }) => <div style={{ display: 'flex' }}>
//     <div style={{ display: 'flex', marginRight: 10, fontSize: 12 }}>{label}</div>
//     {items && items.map(x => <RadioDiv key={x.value}>
//         <Radio style={{ padding: 0 }} name={name} checked={value === x.value} onChange={onChange} value={x.value} />
//         {x.name}
//     </RadioDiv>)}

// </div>

export const FormRadioGroupField = ({ value, items, onChange, label, name ,style}) => <div style={{...style,  display: 'flex', flexDirection: 'column' }}>
    <InputLabel style={{ display: 'flex',  fontSize: 12 }}>{label}</InputLabel>
    <div style={{ display: 'flex',marginTop:10,  }}>
        {items && items.map(x => <RadioDiv key={x.value}>
            <Radio style={{ padding: 0 }} name={name} checked={value === x.value} onChange={onChange} value={x.value} />
            {x.name}
        </RadioDiv>)}
    </div>


</div>

export const FormDatePickerField = ({ name, onChange, label, value, style }) => <TextField
    name={name}
    style={style}
    onChange={onChange}
    label={label}
    type="date"
    value={value}
    InputLabelProps={{ shrink: true, }}
/>

export const FormTextField = ({ name,value, label, errors, onChange, style }) => <TextField
    name={name}
    value={value!=null?value:''}
    label={label}
    error={Boolean(errors[name])}
    helperText={errors[name]}
    onChange={onChange}
    style={style}
/>

export const FormTextAreaField = ({ name,value, label, errors, onChange, style,rows }) => <TextField
    name={name}
    value={value?value:''}
    fullWidth
    multiline
    rows={rows}
    variant="outlined"
    
    InputLabelProps={{ shrink: true, }}
    label={label}
    error={Boolean(errors[name])}
    helperText={errors[name]}
    onChange={onChange}
    style={style}
/>

export const withGridItem = Component => props => <Grid item>
    <Component {...props} />
</Grid>
