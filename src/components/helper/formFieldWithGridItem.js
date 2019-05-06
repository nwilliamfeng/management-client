import { FormTextAreaField,  FormSelectField ,FormSwitch, FormTextField, FormRadioGroupField, FormDatePickerField, withGridItem, } from '../../controls'
import {Grid,Switch} from '@material-ui/core'
import React from 'react'
import {withForm} from '../../controls'

export const GridTextField=withGridItem(FormTextField);

export const GridSelectField=withGridItem(FormSelectField);

export const GridDatePickerField=withGridItem(FormDatePickerField);

export const GridRadioGroupField=withGridItem(FormRadioGroupField);

export const GridTextAreaField=withGridItem(FormTextAreaField);

export const GridSwitch =withGridItem(FormSwitch);



export const GridRow = props => <Grid item style={props.style} >
    <Grid container spacing={40}  >
        {props.children}
    </Grid>
</Grid>

export const FormContainer = withForm(props => <React.Fragment>
    {props.children}
</React.Fragment>)
