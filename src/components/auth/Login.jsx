import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../../actions';
import {loginStates} from '../../constants'


class Login extends Component {

    constructor(props) {
        super(props);    
        this.state = { userName: '', userPassword: '', submitted: false,   }; //初始化登录状态            
    }


    handleSubmit=event =>{
        event.preventDefault();//禁止网页跳转
        this.setState({ submitted: true });//设置已经执行提交操作
        const { userName, userPassword } = this.state;
        const { dispatch } = this.props;

        //在用户名和密码输入后执行
        if (userName && userPassword) {
            dispatch(authActions.login(userName, userPassword));
        }

    }

    handleInputChange=event=> {
        const { name, value } = event.target;
        this.setState({ [name]: value }); //设置对应的属性
    }

    //清除错误信息
    clearError=()=> {
        const { dispatch } = this.props;
        dispatch(authActions.clearError());
    }

    render() {
        const { loggingIn, error } = this.props; //传入的状态值
      
        const { userName, userPassword,  submitted } = this.state;//自己持有的状态值
        return (
            <div >
                <div className='jumbotron row'>
                    <div className="col-sm-8 col-sm-offset-2">
                   
                        {error != null && error !== '' && <div className="alert alert-danger alert-dismissible fade in col-md-8 col-md-offset-2" role="alert">
                            <button type="button" className="close" onClick={this.clearError} data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
                            <strong>登录失败</strong> 原因：{error}
                        </div>}
                        <div className="col-md-6 col-md-offset-3">
                         
                            <h2>欢迎使用，请登录</h2>
                            <p></p>
                            <form name="form" onSubmit={this.handleSubmit}>
                                <div className={'form-group' + (submitted && !userName ? ' has-error' : '')}>
                                    <label htmlFor="userName">用户名</label>
                                    <input type="text" className="form-control" name="userName" value={userName} onChange={this.handleInputChange} />
                                    {submitted && !userName &&
                                        <div className="help-block">请输入用户名</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !userPassword ? ' has-error' : '')}>
                                    <label htmlFor="userPassword">登录密码</label>
                                    <input type="password" className="form-control" name="userPassword" value={userPassword} onChange={this.handleInputChange} />
                                    {submitted && !userPassword &&
                                        <div className="help-block">请输入密码</div>
                                    }
                                </div>
                                
                                <div className="form-group">
                                    <button className="btn btn-primary">登录</button>
                                    {loggingIn &&
                                        <img alt='' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }

                                </div>
                            </form>

                        </div>

                    </div>
                </div>

                {/* <div className="row text-center">
                    <p> <a >在线客服</a></p>
                    <p> <a >company.com</a></p>
                </div> */}
            </div>
        );
    }
}


function mapStateToProps(state) {

    const { loginState,error } = state.auth;
    return {
        loggingIn:loginState==loginStates.LOGGING_IN,
        error: error,

    };
}


const page = connect(mapStateToProps, null)(Login);

/**
 * Login实例
 */
export { page as Login }; 