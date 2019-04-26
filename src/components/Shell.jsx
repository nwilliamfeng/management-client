import React, { Component } from 'react';
import styled from 'styled-components';
//import BackgroundImg from '../assets/imgs/background.jpg';
import MyAppBar from './AppBar'
import { connect } from 'react-redux'
//import { navigateAction } from '../actions'
//import {compositOpenCommand, compositDeleteCommand} from '../components/commands'
import {TitleBar} from './TitleBar'
import {UserPanel} from './UserPanel'

const ShellDiv = styled.div`
    display:flex;   
`

const TitleDiv=styled.div`
    height:70px;
    width:100%;
   
    display:flex;
    justify-content:center;
    flex-direction:column;
`


const NavigateDiv = styled.div`
    overflow-y:auto;
    height:100vh;
    width:100%;
    outline:0;
    margin-top:40px;
    background:#2A3F54;
`

const BodyDiv = styled.div`
    
   background: #F7F7F7;
   overflow-y:auto;
   width:100%;
   height:100vh;
  
`

const LeftDiv=styled.div`
    display:flex;
    flex-direction:column;
    height:100vh;
    width:275px;
    outline:0;
    background:#2A3F54;
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
            <LeftDiv>
                <TitleDiv>
                    <TitleBar/>
                   
                </TitleDiv>
                <UserPanel/>
                <NavigateDiv>{this.renderChilds()} </NavigateDiv>
            </LeftDiv>
            
            <ContainerDiv>
                <MyAppBar/>
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

