import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AlertDialog = ({ isOpen, onClose, title, content }) => <Dialog
    maxWidth="md"
    open={isOpen}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
>
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
    <DialogContent>
        <DialogContentText id="alert-dialog-description" style={{ minWidth: 300 }}>{content}</DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button onClick={onClose}  color="primary" >确定</Button>
    </DialogActions>
</Dialog>


let currentEnable=false;
let currentMessage={};

export class ShowDialog extends React.Component {
 
    constructor(props) {
        super(props);
      //  this.state = { alertMessage: {} };  //此处用state会有在componentWillReceiveProps 调用setState后state未及时更改导致shouldComponentUpdate失效，setstate是异步的，原因待查       
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps != null) {
            const { alertMessage } = nextProps;
            if (alertMessage != null) {
                if ( alertMessage.id !== currentMessage.id) {
                     currentMessage=alertMessage;
                     currentEnable=true;
                }
            }       
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContenxt) {
         return  currentEnable===true ;
    }


    onAlertDialogClose = e => {
      currentEnable=false;
      this.forceUpdate(); //强制刷新
    }

    render() {
        return <React.Fragment>
            { currentEnable===true && <AlertDialog isOpen={true} title="提醒" content={currentMessage.content} onClose={this.onAlertDialogClose} />}
        </React.Fragment>
    }
}


