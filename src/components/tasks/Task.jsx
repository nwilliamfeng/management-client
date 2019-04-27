import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import {compose} from 'redux'
import { connect } from 'react-redux'
import {withHeader} from '../../controls'

const Body=props=><React.Fragment>
    {props.location.pathname}
    </React.Fragment>

const Render=withHeader(Body);

class Task extends Component {

    constructor(props){
        super(props);
      //  title=this.props.location?this.props.location.pathname:'sadfasdf';
      
    }

    render() {
        console.log(this.props); //this.props.location.search -- ?id=abc
        return  <Render title={'dddddddd'} {...this.props} />
    }
}


const mapStateToProps = (state) => {
    return state;
}

const task = withRouter(connect(mapStateToProps)(Task));
 

export { task as Task };
