import React, { useState, useEffect } from "react";
import { useParams,useHistory } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { jwtState,loggedinUserState } from "../recoiled/globalState";
import { SERVER_URL } from "../constants/serveruls";
import { useToasts } from 'react-toast-notifications';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";
import routes from "../routes/routes";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';

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
  const [open, setOpen] = React.useState(false);

  const [paid,setPaid] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
const paidClose =()=>{
  setPaid(true);
  addToast(`your Order has been successfully placed`, {
      appearance: 'success',
      autoDismiss: true,
    })
  handleClose();
}

const cancelTransaction=()=>{
  setPaid(false);
  addToast(`Transaction has been cancelled`, {
    appearance: 'danger',
    autoDismiss: true,
  })
  handleClose();
}
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

const { register, handleSubmit } = useForm();
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
                    <Button variant="contained" size="large" color="primary" onClick={handleOpen}>Buy - Now</Button>
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
      <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
      timeout: 500,
      }}
  >
      <Fade in={open}>
      <div className={classes.paperr}>
          <h1 id="transition-modal-title">ENTER CARD DETAILS</h1>
          <p>Total Amount : {post.RentalPrice} </p>
          <form className={classes.roott} Validate autoComplete="off" onSubmit={handleSubmit(handleClose)}>
              <div>
              <TextField
                  name="CARD-NUMBER"
                  id="standard-CARD"
                  label="CARD-NUMBER"
                  type="number"
                  ref={register({ required: true})}
              />
              <TextField
                  name="CVV"
                  id="standard-cvv"
                  label="CVV"
                  type="number"
                  ref={register({ required: true})}
              />
              <TextField
                  name="Name on Card"
                  id="standard-input"
                  label="Name on Card"
                  type="text"
                  ref={register({ required: true})}
              />
              </div>
              <div className="text-center">
                  <Button variant="contained" size="large" color="primary" className={classes.marginn} onClick={paidClose}>
                      PAY
                  </Button>
                  <Button variant="contained" size="large" color="secondary" className={classes.marginn} onClick={cancelTransaction}>
                      CANCEL
                  </Button>
              </div>
            </form>
          </div>
      </Fade>
  </Modal>
  </div>
  )}
    </>
  );
}
