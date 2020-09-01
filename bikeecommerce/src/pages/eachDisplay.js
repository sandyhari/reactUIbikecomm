import React, { useState, useEffect } from "react";
import { useParams,useHistory } from "react-router-dom";
import Axios from 'axios';
import { useRecoilValue, useRecoilState } from "recoil";
import { jwtState,loggedinUserState } from "../recoiled/globalState";
import { SERVER_URL } from "../constants/serveruls";
import { useToasts } from 'react-toast-notifications';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import routes from "../routes/routes";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Box, ServerStyleSheets } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 400,
    height: 400,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paperr: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  roott: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    marginn: {
      margin: theme.spacing(1),
    },
}));

export default function Eachproduct() {
  const classes = useStyles();
  const history = useHistory();
  const [post, setPost] = useState({});
  const accessToken = useRecoilValue(jwtState);
  const { id } = useParams();
  const { addToast } = useToasts();
  const [details,setDetails] = useRecoilState(loggedinUserState);

  const productamount = post.RentalPrice;

  const paymentHandler = async (e) => {
    e.preventDefault();
    const orderUrl = `${SERVER_URL}/order`;
    const response = await Axios.post(orderUrl,{
      amount: productamount * 100, 
        currency: "INR",
        receipt: "receipt#1",
        payment_capture: 1,
    });
    const { data } = response;
    const options = {
      key: "rzp_test_na9KTMUAioqZx5",
      name: "Wrap the Ride",
      currency:"INR",
      description: "Hello test transaction",
      order_id: data.id,
      handler: async (response) => {
        try {
         const paymentId = response.razorpay_payment_id;
         if(paymentId){
          addToast(`Hey we received your amount ${post.RentalPrice} for the order of ${post.vehiclename} under pay ID:${paymentId}`, {
            appearance: 'success',
            autoDismiss: true,
          })
          addToast(`Thanks for shopping with US..!`, {
            appearance: 'success',
            autoDismiss: true,
          })
         }
         else{
          addToast(`Oops your payment has been cancelled.`, {
            appearance: 'danger',
            autoDismiss: true,
          })
         }
        } catch (err) {
          console.log(err);
          addToast(`Something went wrong with payment gateway`, {
            appearance: 'danger',
            autoDismiss: true,
          })
        }
      },
      theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    };

useEffect(() => {
  fetch(SERVER_URL + `/products/${id}`,{headers:{
      'Authorization' : 'Bearer '+ accessToken
    },
    mode: "cors"
  })
    .then((response) => response.json())
    .then((data) => {
      setPost(data.item);
    })
    .catch((e)=>{
      console.error(e);
      history.push(routes.login)
    });
}, []);

  return (
    <>
    {!accessToken ?(
      <div className="text-center" style={{paddingTop:"180px"}}>
            <div class="d-flex align-content-center flex-column text-center">
                <h1 className="text-muted">
                    Oops...!
                </h1>
                <h3 className="text-muted">
                    you're session has been expired.
                </h3>
                <h3 className="text-muted">
                    Kindly re-logon to use the services.
                </h3>
            </div>
        </div>
    ):(
      <div style={{paddingTop:"180px"}}>
       <Box mx="auto" >
          <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item>
                  <img className={classes.image} alt="complex" src={post.vehicleImgURL} />  
              </Grid>
              <Grid item xs={12} sm container>
              <div className="d-flex align-content-center flex-column text-center">
                <h1 className="text-muted">
                  {post.vehiclename}
                </h1>
                <h3 className="text-muted">
                    Price : Rs {post.RentalPrice} /-
                </h3>
              </div>
              <hr />
              <div className="d-flex align-content-center flex-column text-center">
                <div>
                    <Button variant="contained" size="large" color="primary" onClick={paymentHandler}>Buy - Now</Button>
                </div>
                <div>
                  <Button variant="contained" size="large" color="secondary" onClick={()=>{history.push(routes.allproducts)}}>Return</Button>
                </div>
              </div>
              </Grid>
            </Grid>
          </Paper>
    </div>
    </Box>
    </div>
     
  )};
  </>
)}
