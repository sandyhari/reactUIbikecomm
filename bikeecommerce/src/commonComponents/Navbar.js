import React, { useState } from 'react';
import {
  Navbar
} from 'reactstrap';
import routes from "../routes/routes";
import { useRecoilValue } from "recoil";
import { loggedinUserState } from "../recoiled/globalState";
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { lineHeight } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    justifyContent: "center",
    alignContent:"center",
    backgroundColor:"#2c387e",
  },
  flexitem: {
    margin: "10px",
    lineHeight: "75px",
    fontSize: "30px",
  },
}));

const NavBar = ()=>{
  const classes = useStyles();
  return (
    <nav>
      <div className={classes.flex}>
          <div className={classes.flexitem}>
            <NavLink to={routes.landingpage}><h2>Wrappified</h2></NavLink>  
          </div>
        </div>
    </nav>  
  );
}

export default NavBar;