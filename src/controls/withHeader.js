import React from 'react'
import styled from 'styled-components'
import Card from '@material-ui/core/Paper';

const Container = styled.div`
    padding:15px 15px;
    padding-top:10px;
    display:flex;
    flex-direction:column;
    flex:0 100%;
   
  
`
const HeaderDiv = styled.div`
    display:flex;
    font-size:24px;
    margin-bottom:10px;
`

// const BodyDiv = styled.div`
// display:flex;
// overflow-y:auto;
   
//     height:100vh;
//     background:white;
   
//     margin-top:15px;
//     height:100%;
//      padding:15px;
//     border-width:1px;
//     border-color:lightgray;
//     border-style:solid;
// `


export const withHeader = Component => props => <Container>
    <HeaderDiv>
        {props.title}
    </HeaderDiv>
    {/* <BodyDiv>
        <Component {...props} />
    </BodyDiv> */}
     <Card style={{padding:15,overflowY:'auto',height:'100%',overflowX:'hidden'  }} >
        <Component {...props} />
    </Card>

</Container> 