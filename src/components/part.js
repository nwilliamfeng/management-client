import React from 'react';
import styled from 'styled-components'
import { withHeader,  } from '../controls'


export const Container = withHeader(props => <div {...props} title=''>
    {props.children}
</div>)

export const TitleDiv = styled.div`
    display:flex;
    width:100%;
    justify-content:space-between;
`