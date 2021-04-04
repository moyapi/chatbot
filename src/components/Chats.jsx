import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Chat } from './index';

const useStyles = makeStyles((theme) => ({
    chats:{
        height:400,
        padding:0,
        overflow:"auto",
    }
}));

const Chats = (props) => {
    const classes = useStyles();
    const { chats } = props;
    return (
        <List className={classes.chats} id={"scroll-area"}>
            {chats.map((chat,index) => {
                return <Chat text={chat.text} type={chat.type} key={index.toString()}/>
            })}
        </List>
    );
};

export default Chats;
