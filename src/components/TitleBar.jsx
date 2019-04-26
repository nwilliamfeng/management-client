import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGift } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const Div=styled.div`
    display:flex;
    color:white;
    font-size:22px;
`

const IconContainer=styled.div`
    border-radius:20px;
    border-width:1px;
    border-color:white;
    border-style:solid;
    height:32px;
    width:32px;
    margin:0px 10px;
`

export const TitleBar=()=> <Div>
        <IconContainer>
            <FontAwesomeIcon icon={faGift}/>
        </IconContainer>
        
         {'卡券管理系统'}  
    </Div>
