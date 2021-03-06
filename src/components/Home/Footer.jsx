import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { 
    Typography,
    Divider,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    footer: {
        padding: theme.spacing(6),
        backgroundColor: "#424242",
        marginTop: theme.spacing(10),
        borderRadius: 5,
    },
    footerTypography: {
        marginTop: theme.spacing(1)
    },
    divider: {
        margin: theme.spacing(1.5)
    },
    links: {
        textDecoration: "none",
        color: "#fff",
        '&:hover': {
            color: "#ffc107",
        },
        '&:active': {
            color: '#ccc'
        }
    }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
        <Typography variant="h5" align="center" gutterBottom>
            TodoMan
        </Typography>

        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Make todos.<br /> 
            Very quick, very simple!
        </Typography>

        <Divider className={classes.divider}/>

        <Typography variant="body2" color="textSecondary" align="center" className={classes.footerTypography}>
            GitHub repositories:
        </Typography>

        <Typography variant="subtitle1" color="textSecondary" align="center">
            <a href="https://github.com/MarkTerris/TodoMan" className={classes.links}>Frontend </a>
                | 
            <a href="https://github.com/MarkTerris/todo-man-server" className={classes.links}> Backend</a> 
        </Typography>

        <Divider className={classes.divider}/>

        <Typography variant="body2" color="textSecondary" align="center" className={classes.footerTypography}>
            {'Copyright © Mark Terris '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    </div>
  );
}


