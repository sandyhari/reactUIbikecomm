import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import routes from "../routes/routes";
import "../ComponentStyles/productList.css"
import { useRecoilValue } from "recoil";
import { jwtState } from "../recoiled/globalState";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));


const Landingpage = () =>{
  const history = useHistory();
  const classes = useStyles();
  const accessToken = useRecoilValue(jwtState);
  console.log(accessToken)
    return(
        <div className="container-fluid custom" style={{minHeight:"90vh"}}>
          <div className="p-3"></div>
          <div className="row">
            <div className="col-6 mx-auto col-md-4 order-md-2">

            </div>
            <div className="col-md-8 order-md-1 text-center text-md-left pr-md-5">
            <h1 class="mb-3" style={{fontWeight:"300px"}}>Hello, check out our custom modified bikes</h1>
              <p class="lead font-weight-bold mb-4">
                Stylish
              </p>
              <p class="lead font-weight-bold mb-4">
                Performant
              </p>
              <p class="lead font-weight-bold mb-4">
                Bold
              </p>
              <div class="d-flex flex-column flex-md-row">
                {!accessToken ? 
                (
                <div>
                 <Button type="button" variant="contained" size="large" color="primary" onClick={()=>history.push(routes.login)}>Login</Button>
                  <Button type="button" variant="contained" size="large" color="secondary" className={classes.margin}  onClick={()=>history.push(routes.signup)}>
                    Sign UP
                  </Button>
                </div>
                ):(
                  <></>
                )}
              </div>
              <h4 class="text-muted mb-0">
                Logon and check 
              </h4>
            </div>
          </div>
          
        </div>
      )
    

}

export default Landingpage;