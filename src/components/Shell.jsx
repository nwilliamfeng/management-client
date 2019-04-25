import React, { Component } from 'react';
import styled from 'styled-components';
//import BackgroundImg from '../assets/imgs/background.jpg';

import { connect } from 'react-redux'
//import { navigateAction } from '../actions'
//import {compositOpenCommand, compositDeleteCommand} from '../components/commands'

const ShellDiv = styled.div`
    display:flex;   
`

const TitleDiv=styled.div`
    display:flex;
    flex-direction:column;
`


const NavigateDiv = styled.div`
    
    height:100vh;
    width:275px;
    outline:0;
    background:#2A3F54;
`

const BodyDiv = styled.div`
    
   background: lightgray;
   overflow-y:auto;
   width:100%;
   height:100vh;
  
`

const ContainerDiv = styled.div`
   flex-direction:column;
   display:flex;
   background: lightgray;
    
   width:100%;
   height:100vh;
  
`

class Shell extends Component {


    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return false;
    // }

    renderChilds(){
        let a=[];
        for(let i=0;i<100;i++){
            a.push(i);
        }
        return <div>
                {a.map(x=><div>{x}</div>)}
            </div>
    }

    render() {
        return <ShellDiv>
            <NavigateDiv>{'this is main view'}</NavigateDiv>
            <ContainerDiv>
                <TitleDiv>title</TitleDiv>
                <BodyDiv>{this.renderChilds()}</BodyDiv>
            </ContainerDiv>
            
        </ShellDiv>
    }
}

const mapStateToProps = state => {
    return { ...state };
}

const shell = connect(mapStateToProps)(Shell);

export { shell as Shell };

