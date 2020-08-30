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
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    .catch(console.error);
}, []);
const { register, handleSubmit } = useForm();
  return (
      <>
      <Box mx="auto" >
          <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
              <img className={classes.image} alt="complex" src={post.vehicleImgURL} />  
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item>
                <Typography variant="h2" component="h2">{post.vehicleName}</Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" size="large" color="primary" className={classes.margin} onClick={handleOpen}>
                  <Typography variant="h5" component="h5"> BUY-NOW</Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography color="primary" variant="h3" component="h3">Price :Rs {post.RentalPrice}</Typography>
            </Grid>
            <Grid item>
            <Button variant="contained" size="large" color="secondary" className={classes.margin} onClick={()=>history.push(routes.allproducts)}>
                  <Typography variant="h5" component="h5">GO BACK</Typography>
              </Button>
            </Grid>
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
          <form className={classes.roott} noValidate autoComplete="off" onSubmit={handleSubmit(handleClose)}>
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
                  <Button variant="contained" size="large" color="primary" className={classes.marginn} onClick={handleClose}>
                      PAY
                  </Button>
                  <Button variant="contained" size="large" color="secondary" className={classes.marginn} onClick={handleClose}>
                      CANCEL
                  </Button>
              </div>
            </form>
          </div>
      </Fade>
  </Modal>
  </>
    
  );
}
