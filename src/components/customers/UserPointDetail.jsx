import React, { Component } from 'react';
import styled from 'styled-components'
import { Formik, Form } from 'formik';
import { MenuItem, Button, } from '@material-ui/core';
import { GridTextAreaField, GridSwitch, GridTextField, GridSelectField } from '../helper'

const Container =styled.div`
    border:1px solid gray;
    
`



export class UserPointDetail extends Component {

    constructor(props) {
        super(props);
        const { tag, onCommit, platforms } = props;
        this.state = { tag, onCommit, platforms };
    }

   
    render() {
        const { tag, platforms, onCommit } = this.state;
        return  <React.Fragment>

        </React.Fragment>
         
    }
}
