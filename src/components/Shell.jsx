import React, { Component } from 'react';
import styled from 'styled-components';
import MyAppBar from './AppBar'
import { connect } from 'react-redux'
import { TitleBar } from './TitleBar'
import { UserPanel } from './UserPanel'
import NavigateBar from './NavigateBar'
import { routeUrls } from '../constants'
import {  TaskList,TaskTagList } from './tasks'
import { BrowserRouter as Router,Switch,Route,} from 'react-router-dom'
import { GiftList } from './gifts';
import { UserPointFlowList ,UserPointList,UserGiftList } from './customers'
import { MonthReportList ,DayReportList,ClearPointFlowList} from './liquidation'


const ShellDiv = styled.div`
    display:flex;   
`

const TitleDiv = styled.div`
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
    margin-top:20px;
    background:#2A3F54;
`

const BodyDiv = styled.div`
    
    background: #F7F7F7;
     overflow-y:auto;   
    height:100%;  
    padding:15px;
    
`

const LeftDiv = styled.div`
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

    render() {
        return <Router>
            <ShellDiv>
                <LeftDiv>
                    <TitleDiv>
                        <TitleBar />
                    </TitleDiv>
                    <UserPanel />
                    <NavigateDiv className='scollContainer'>
                        <NavigateBar />
                    </NavigateDiv>
                </LeftDiv>

                <ContainerDiv>
                    <MyAppBar />
                    <BodyDiv  className='scollContainer'>
                        <Switch>
                            <Route path={routeUrls.GIFT_LIST} component={GiftList} />
                            <Route path={routeUrls.TASK_LIST} component={TaskList} />                        
                            <Route path={routeUrls.TASK_TAG_LIST} component={TaskTagList} />
                            <Route path={routeUrls.USER_POINT_FLOW_LIST} component={UserPointFlowList} />
                            <Route path={routeUrls.USER_POINT_LIST} component={UserPointList} />
                            <Route path={routeUrls.USER_GIFT_LIST} component={UserGiftList} />
                            <Route path={routeUrls.LIQUIDATION_MONTH_REPORT} component={MonthReportList} />
                            <Route path={routeUrls.LIQUIDATION_DAY_REPORT} component={DayReportList} />
                            <Route path={routeUrls.LIQUIDATION_ERROR_CLEAR_POINT_FLOW} component={ClearPointFlowList} />
                        </Switch>
                    </BodyDiv>
                </ContainerDiv>

            </ShellDiv>
        </Router>
    }
}

const mapStateToProps = state => {
    return { ...state };
}

const shell = connect(mapStateToProps)(Shell);

export { shell as Shell };

