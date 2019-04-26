import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

import { icons } from './icons'

const Div = styled.div`
    display:flex;
    color:white;
    font-size:14px;
    padding:20px 0px;
`

const InfoDiv = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
`

const AvataContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:40px;
    border-width:3px;
    border-color:white;
    border-style:solid;
    height:48px;
    width:48px;
    background-repeat:no-repeat;
    background-size:100%;
    background-image:${props => `url(${icons.CONNECTION_ICON})`};
    margin:0px 20px 0px 12px;
`

export const UserPanel = ({ userName }) => <Div>
    <AvataContainer />
    <InfoDiv>
        {userName == null && <div style={{ color: 'lightgray' }}>{'未登录'}</div>}
        {userName != null && <div><div style={{ color: 'lightgray' }}>{'欢迎，'}</div>{userName}</div>}
    </InfoDiv>

</Div>
