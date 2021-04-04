import React from 'react';
import { makeStyles,createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    button: {
        borderColor:"#FFB549",
        color:"#FFB549",
        fontWeight:600,
        marginBottom:"8px",
        "&:hover":{
            backgroundColor:"#FFB549",
            color:"#FFF"
        }
    }
})

const Answer = (props) => {
    const {content,nextId,select} = props;
    const classes = useStyles();
    return (
        <Button
        className={classes.button} variant="outlined" onClick={()=>select(content,nextId)}>
            {content}
        </Button>
    );
};

export default Answer;
