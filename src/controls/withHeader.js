import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import { Form } from 'formik'
import { Button } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'

// const Container = styled.div`

//     align-items: center;
//     margin-left:20px;
//     display:flex;
//     flex-direction:column;
//     flex:0 100%;
//     width:100%;

//     overflow-x:hidden;
//     justify-content:center;
// `

const Container = styled.div`

    
    display:flex;
    flex-direction:column;
   
    width:100%;
    
 
    overflow-y:auto;
   
`

const HeaderDiv = styled.div`
     display:flex;
    padding-bottom:10px;
    font-size:24px;
    justify-content: space-between; 
`




export const withHeader = Component => props => <Container>
    <HeaderDiv>
        {props.title}
    </HeaderDiv>
    <Paper style={{ padding: 15 }} >
        <Component {...props} />
    </Paper>

</Container>




export const withForm = Component => props =>

    <Form >
        <HeaderDiv>
            {props.title}
            <Button variant="contained" size="small" type="submit" disabled={props.isSaving}>
                <SaveIcon />
                保存
            </Button>
        </HeaderDiv>

        <Paper style={{ padding: 15, }}>
            <Component  {...props} />
        </Paper>
    </Form>

