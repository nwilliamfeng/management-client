import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../../actions';

import styled from 'styled-components'

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import ErrorIcon from '@material-ui/icons/Error';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CircularProgress from '@material-ui/core/CircularProgress';



const Div = styled.div`
    height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-between;
    
`

const DialogDiv = styled.div`
    border-radius:3px;
    margin-top:50px;
    border:1px solid #eaeced;
    padding:40px 60px;
    display:flex;
    flex-direction:column;
`

const FootContentDiv = styled.div`
    padding:0px 10px; 
    color:gray;
    font-size:12px;
`

const FooterDiv = styled.div`
    width:100%;
    height:40px;
    background:#F7F9FA;
    padding:10px 0px;
    display:flex;
    align-items:center;
    justify-content:space-between;

`

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { userName: '', userPassword: '', loggingIn: false, alertMessage:null }; //初始化登录状态    

    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({ loggingIn: false,alertMessage:nextProps.alertMessage });
    }

    onLogin = event => {
        event.preventDefault();//禁止网页跳转
        this.setState({ loggingIn: true,alertMessage:null });//设置已经执行提交操作
        const { userName, userPassword } = this.state;
        const { dispatch } = this.props;

        //在用户名和密码输入后执行
        if (userName && userPassword) {
            dispatch(authActions.login(userName, userPassword));
        }

    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value }); //设置对应的属性
    }


    isUserNameValid=()=>this.state.userName!=null && this.state.userName!=='';

    isUserPasswordValid=()=>this.state.userPassword!=null && this.state.userPassword!=='';

    render() {
   
        const { loggingIn ,alertMessage} = this.state;//自己持有的状态值
        return (
            <Div>
                <DialogDiv>

                    <div style={{ color: 'gray', fontSize: 28, paddingBottom: 20 }}>积分卡券管理系统</div>
                    {alertMessage != null && <SnackbarContent
                        style={{ marginBottom: 20, background: 'red' }}
                        className='error'
                        aria-describedby="client-snackbar"
                        message={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <ErrorIcon style={{ marginRight: 10 }} />
                                <div style={{ maxWidth: 290, wordBreak: 'break-all' }}>{alertMessage.content} </div>
                            </div>
                        }
                    />}
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item >
                            <AccountCircle style={{ color: '#0070ba', fontSize: 32 }} />
                        </Grid>
                        <Grid item>
                            <TextField name="userName" label="用户名" error={!this.isUserNameValid()} 
                            helperText={!this.isUserNameValid()?'请输入用户名':''}
                            style={{ width: 300 }} onChange={this.handleInputChange} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-end" style={{ marginTop: 20, marginBottom: 40 }}>
                        <Grid item >
                            <Lock style={{ color: '#0070ba', fontSize: 32 }} />
                        </Grid>
                        <Grid item>
                            <TextField type="password" label="登录密码" 
                             error={!this.isUserPasswordValid()} name="userPassword" 
                             helperText={!this.isUserPasswordValid()?'请输入登录密码':''}
                             style={{ width: 300 }} onChange={this.handleInputChange} />
                        </Grid>
                    </Grid>

                    <div style={{display:'flex'}}>
                        {loggingIn === true && <CircularProgress />}
                        <Button variant="contained" disabled={loggingIn === true || !this.isUserNameValid() || !this.isUserPasswordValid()} color="primary" style={{ width: 320 }} onClick={this.onLogin}> 登录</Button>

                    </div>

                </DialogDiv>

                <FooterDiv>
                    <FootContentDiv > {'基于 React + Redux 构建'}</FootContentDiv>
                    <FootContentDiv > {'版权所有© 2019'}</FootContentDiv>
                </FooterDiv>

            </Div>

        );
    }
}


function mapStateToProps(state) {

    const { alertMessage } = state.auth;
    return {

        alertMessage,
    };
}


const page = connect(mapStateToProps, null)(Login);

/**
 * Login实例
 */
export { page as Login }; 