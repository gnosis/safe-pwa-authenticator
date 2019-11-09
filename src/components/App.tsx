import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import PullToRefresh from 'rmc-pull-to-refresh';
import logo from '../logo.svg';
import './App.css'
import { StateType } from '../store/state';
import { transactionsSelector, refreshTransactionsAction, transactionsLoadingSelector } from '../store/transactions';

function ListItemLink(props: any) {
  return <ListItem button component="a" {...props} />;
}

type PropsType = {
    transactions: string[];
    transactionsLoading: boolean;
    dispatchRefresh: () => void;
};

class AppModel extends React.Component<PropsType> {

    componentDidMount() {
        console.log("componentDidMount")
        this.props.dispatchRefresh();
    }

    handleRefresh = async () => {
        console.log("handleRefresh")
        this.props.dispatchRefresh();
    }

    render() {
        console.log("render", this.props)
        return (
            <PullToRefresh
                style={{ height: '100vh', overflow: 'auto' }}
                direction="down"
                refreshing={this.props.transactionsLoading}
                onRefresh={this.handleRefresh}
                indicator={{ deactivate: '下拉' }}
                damping={150}
            >
                <List component="nav" aria-label="main mailbox folders">
                    {this.props.transactions.map(item => (
                        <ListItem 
                            style={{ width: '100vh', overflow: 'auto' }}
                        >
                            <ListItemText primary={item} />
                        </ListItem>
                    ))}
                </List>
            </PullToRefresh>
        );
    }
}

const mapStateToProps = (state: StateType) => {
    console.log("mapStateToProps", state)
    return ({
        transactions: transactionsSelector(state),
        transactionsLoading: transactionsLoadingSelector(state)
    })}
;

const mapDispatchToProps = {
    dispatchRefresh: refreshTransactionsAction,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppModel);
