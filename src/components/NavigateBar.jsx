import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faEdit, faUser, faTasks, faMoneyBill, faUserFriends, faCircle } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { routeUrls } from '../constants'

import { Link} from 'react-router-dom'


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        color: 'white',
        backgroundColor: 'transparent',
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,

    },
});

const categories = {
    DATA_SUM: 'dataSum',
    CARD_MANAGE: 'cardManage',
    USER_MANAGE: 'usermanage',
    TASK_MANAGE: 'taskmanage',
    CARD_PAY_MANAGE: 'cardpaymanage',
    SYS_USER_MANAGE: 'sysusermanage',
}


const ItemDiv = styled.div`
    display:flex;
    color:white;
    font-size:14px;
    width:100%;
`

const ItemIcon = styled(FontAwesomeIcon)`
    color:white;
    margin-top:2px;
    margin-right:10px;
    font-size:15px;
`

const NavigateSubItem = ({ item }) => {
    return <ListItem button component={Link} to={item.url}>
        <ItemDiv style={{ marginLeft: 20 }}>
            <ItemIcon icon={faCircle} style={{ color: 'lightgray', fontSize: 1, marginTop: 5 }} />
            {item.title}
        </ItemDiv>
    </ListItem>
}

const NavigateDropdownItem = ({ icon, title, isDropdown, dropDownHandle }) => {
    return <ListItem button onClick={() => dropDownHandle(!isDropdown)}>
        <ItemDiv>
            <ItemIcon icon={icon} />
            <div style={{ flex: '0 1 100%' }}>{title}</div>
            {isDropdown ? <ExpandLess /> : <ExpandMore />}
        </ItemDiv>

    </ListItem>
}

const ModuleListItem = ({ icon, title, isDropdown, dropDownHandle, subItems }) => <React.Fragment>
    <NavigateDropdownItem icon={icon} title={title} isDropdown={isDropdown} dropDownHandle={dropDownHandle} />
    <Collapse in={isDropdown} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            {subItems ? subItems.map(x => <NavigateSubItem key={x.url} item={x} />) : <div />}
        </List>
    </Collapse>
</React.Fragment>


class NavigateBar extends React.Component {
    state = {
        open: true,
        isDataSumItemOpen: false,
        isCardManageItemOpen: false,
        isUserManageItemOpen: false,
        isTaskManageItemOpen: false,
        isCardPayManageItemOpen: false,
        isSystemUserManageItemOpen: false,
    };




    handleDataSumItemDropdwon = () => this.setState(state => ({ isDataSumItemOpen: !state.isDataSumItemOpen }));

    handleCardManageItemDropdwon = () => this.setState(state => ({ isCardManageItemOpen: !state.isCardManageItemOpen }));

    handleUserManageItemDropdwon = () => this.setState(state => ({ isUserManageItemOpen: !state.isUserManageItemOpen }));

    handleTaskManageItemDropdwon = () => this.setState(state => ({ isTaskManageItemOpen: !state.isTaskManageItemOpen }));

    handleCardPayManageItemDropdwon = () => this.setState(state => ({ isCardPayManageItemOpen: !state.isCardPayManageItemOpen }));

    handleSystemUserManageItemDropdwon = () => this.setState(state => ({ isSystemUserManageItemOpen: !state.isSystemUserManageItemOpen }));

     

    subItems = [
        { category: categories.DATA_SUM, url: routeUrls.DAY_REPORT, title: '数据大盘(日报表)' },
        { category: categories.DATA_SUM, url: routeUrls.MONTH_REPORT, title: '月报表' },
        { category: categories.DATA_SUM, url: routeUrls.CLEAR_DATA, title: '积分卡券每日统计'},
        { category: categories.CARD_MANAGE, url: routeUrls.GIFT_LIST, title: '卡券配置列表' },
        { category: categories.CARD_MANAGE, url: routeUrls.GIFT_STRATEGY, title: '卡券策略管理'},
        { category: categories.CARD_MANAGE, url: routeUrls.GIFT_ADD_UPDATE, title: '卡券添加' },
        { category: categories.CARD_MANAGE, url: routeUrls.GIFT_STRATEGY_ADD_UPDATE, title: '卡券策略添加' },
        { category: categories.CARD_MANAGE, url: routeUrls.GIFT_CHECK_OP, title: '待复核列表' },
        { category: categories.USER_MANAGE, url: routeUrls.USER_LIST, title: '用户列表' },
        { category: categories.USER_MANAGE, url: routeUrls.USER_POINT_FLOW, title: '用户积分变动' },
        { category: categories.USER_MANAGE, url: routeUrls.USER_CARD_LIST, title: '用户卡券列表' },
        { category: categories.TASK_MANAGE, url: routeUrls.TASK_LIST, title: '任务列表' },
        { category: categories.TASK_MANAGE, url: routeUrls.TASK_ADD_UPDATE, title: '添加任务' },
        { category: categories.CARD_PAY_MANAGE, url: routeUrls.GIFT_PAY_USERGIFT_FREEZING, title: '卡券冻结列表' },
        { category: categories.CARD_PAY_MANAGE, url: routeUrls.GIFT_PAY_APP_LST, title: '卡券支付列表' },
        { category: categories.SYS_USER_MANAGE, url: routeUrls.LOGIN_INFO_DETAIL, title: '权限管理'},

    ];

    render() {
        const { classes } = this.props;

        return (
            <List component="nav" className={classes.root}>

                <ModuleListItem icon={faTable} title={'数据统计'} isDropdown={this.state.isDataSumItemOpen} dropDownHandle={this.handleDataSumItemDropdwon}
                    subItems={this.subItems.filter(x => x.category === categories.DATA_SUM)} />
                <ModuleListItem icon={faEdit} title={'卡券配置管理'} isDropdown={this.state.isCardManageItemOpen} dropDownHandle={this.handleCardManageItemDropdwon}
                    subItems={this.subItems.filter(x => x.category === categories.CARD_MANAGE)} />
                <ModuleListItem icon={faUserFriends} title={'用户管理'} isDropdown={this.state.isUserManageItemOpen} dropDownHandle={this.handleUserManageItemDropdwon}
                    subItems={this.subItems.filter(x => x.category === categories.USER_MANAGE)} />
                <ModuleListItem icon={faTasks} title={'任务管理'} isDropdown={this.state.isTaskManageItemOpen} dropDownHandle={this.handleTaskManageItemDropdwon}
                    subItems={this.subItems.filter(x => x.category === categories.TASK_MANAGE)} />
                <ModuleListItem icon={faMoneyBill} title={'卡券支付管理'} isDropdown={this.state.isCardPayManageItemOpen} dropDownHandle={this.handleCardPayManageItemDropdwon}
                    subItems={this.subItems.filter(x => x.category === categories.CARD_PAY_MANAGE)} />
                <ModuleListItem icon={faUser} title={'系统用户管理'} isDropdown={this.state.isSystemUserManageItemOpen} dropDownHandle={this.handleSystemUserManageItemDropdwon}
                    subItems={this.subItems.filter(x => x.category === categories.SYS_USER_MANAGE)} />
            </List>

        );
    }
}

NavigateBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavigateBar);