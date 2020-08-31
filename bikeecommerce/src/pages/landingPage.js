import React, { useEffect, useState } from "react"
import Carousel from 'react-bootstrap/Carousel'
import { useHistory } from "react-router-dom";
import routes from "../routes/routes";
import "../ComponentStyles/productList.css"
import "../ComponentStyles/landStyles.css"
import { useRecoilValue } from "recoil";
import { jwtState } from "../recoiled/globalState";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";


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
  console.log(accessToken);
   return (  
          <div>  
              <div className='container-fluid' >  
              <Carousel interval={600} keyboard={false} pauseOnHover={true}>  
              <Carousel.Item style={{'height':"700px"}}  >  
                <img style={{'height':"700px"}}  className="d-block w-100"  src={'assets/img/img2.jfif'}  />  
              <Carousel.Caption>  <h3>Ride for peace</h3>  </Carousel.Caption>  
              </Carousel.Item  >  
              <Carousel.Item style={{'height':"700px"}}>  
                <img style={{'height':"700px"}}   className="d-block w-100"  src={'assets/img/img1.png'}    />  
                <Carousel.Caption>  <h3>Ride with Love</h3>  </Carousel.Caption>  
              </Carousel.Item>  
              <Carousel.Item style={{'height':"700px"}}>  
                  <img style={{'height':"700px"}}  className="d-block w-100"  src={'assets/img/img3.jfif'}   />  
              <Carousel.Caption>  <h3>Ride with Passion</h3>  </Carousel.Caption>  
              </Carousel.Item>  
              </Carousel>  
            </div>  
       </div>  
                      )  
              }  
    

export default Landingpage;


{/* <div className="container-fluid custom" style={{minHeight:"90vh"}}>
<div className="p-3" />
<div className="row">
  <div className="col-6 mx-auto col-md-4 order-md-2">

  </div>
  <div className="col-md-8 order-md-1 text-center text-md-left pr-md-5">
  <h1 class="mb-3" style={{fontWeight:"300px"}}>Hello, check out our custom modified bikes</h1>
    <Typography class="lead font-weight-bold mb-4">
      Stylish
    </Typography>
    <Typography class="lead font-weight-bold mb-4">
      Performant
    </Typography>
    <Typography class="lead font-weight-bold mb-4">
      Bold
    </Typography>
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
    <Typography class="text-muted mb-0">
      Logon and check 
    </Typography>
  </div>
</div>

</div> */}