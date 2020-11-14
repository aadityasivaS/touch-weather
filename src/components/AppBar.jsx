import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img className={"logo"} src="pin.png" alt="logo"/>
          <Typography variant="h6" className={classes.title}>
            Touch Weather
          </Typography>
          <p className="copyright">© {new Date().getFullYear()} <a href="https://aadityasiva.tk" className="copyright-text" target="_blank" rel="noreferrer">Aadityasiva</a></p>
        </Toolbar>
      </AppBar>
    </div>
  );
}