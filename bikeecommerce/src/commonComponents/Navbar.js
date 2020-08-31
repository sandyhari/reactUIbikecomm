import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import routes from "../routes/routes";
import { useRecoilValue } from "recoil";
import { loggedinUserState } from "../recoiled/globalState";
import { NavLink, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    justifyContent: "center",
    alignContent:"center",
  },
  flexitem: {
    margin: "10px",
    lineHeight: "75px",
    fontSize: "30px",
  },
}));

const NavBar = ()=>{
  const userStatus = useRecoilValue(loggedinUserState);
  console.log("decide",userStatus.username);

  const classes = useStyles();
  const history = useHistory();
  return (
    <nav className="navbar fixed-top">
        <div className={classes.flex}>
          <div className={classes.flexitem}>
          <h1 style={{fontSize:"56px",fontFamily:"Lobster",color:"hotpink"}}><NavLink to={routes.landingpage}>Wrappified</NavLink></h1>  
          </div>
        </div>
          {userStatus.username === undefined?
          (
            <div className={classes.flex}>
              <div className={classes.flexitem}>
              <Button variant="contained" size="large" color="primary" type="submit" className="text-uppercase font-weight-bold" onClick={()=>history.push(routes.login)}><h2>LOGIN</h2></Button>  
              </div>
              <div className={classes.flexitem}>
              <Button variant="contained" size="large" color="secondary" type="submit" className="text-uppercase font-weight-bold" onClick={()=>history.push(routes.signup)}><h2>SIGNUP</h2></Button>  
            </div>
          </div>
          ):(
            <div className={classes.flex}>
              <div className={classes.flexitem}>
                <Button variant="contained" size="large" color="primary" type="submit" className="text-uppercase font-weight-bold" onClick={()=>history.push(routes.logout)}><h2>LOGOUT</h2></Button>  
              </div>
            </div>
          ) }
    </nav>  
  );
}

export default NavBar;