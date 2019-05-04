import React from 'react';
import { AlertDialog } from './AlertDialog'



export class Dialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = { alertMessage: null };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps != null) {
            const { alertMessage } = nextProps;
           
                this.setState({ alertMessage });
           
        }
    }


    onAlertDialogClose = e => this.setState({ alertMessage: null });

    render() {
        const { alertMessage } = this.state;
        return <React.Fragment>
            {alertMessage && <AlertDialog isOpen={true} title="提醒" content={alertMessage} onClose={this.onAlertDialogClose} />}         
        </React.Fragment>
    }
}


