import React from 'react'
import styled from 'styled-components'


export const withHeader = Component =>props=> <div>
    {props.title}
    <Component {...props}/>
</div> 