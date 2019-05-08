import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
}))(MuiDialogContent);


export const CustomDialog = props => {
    const { isOpen, title, isMaxWidth, onClose } =props;
    return (<Dialog
        maxWidth={isMaxWidth === true ? "lg" : false}
        disableBackdropClick
        disableEscapeKeyDown
        onClose={() => onClose()}
        aria-labelledby="customized-dialog-title"
        open={isOpen}>
        <DialogTitle id="customized-dialog-title" onClose={() => onClose()}>
            {title}
        </DialogTitle>
        <DialogContent>
            {props.children}
        </DialogContent>
        {/* <DialogActions>
                <Button onClick={this.handleConfirm} color="primary">
                    确定
            </Button>
            </DialogActions> */}
    </Dialog>
    );

}

