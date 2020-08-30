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

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
      margin: {
        margin: theme.spacing(1),
      },
  }));

const Eachproductt = (props) => {
    const history = useHistory();
    const [post, setPost] = useState({});
    const accessToken = useRecoilValue(jwtState);
    const { id } = useParams();
    const { addToast } = useToasts();
    const [details,setDetails] = useRecoilState(loggedinUserState);
    const classes = useStyles();
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
 
//       addToast(`Item successfully added to cart..!`, {
//         appearance: 'success',
//         autoDismiss: true,
//       })
//       fetch(SERVER_URL + `/products/addbasket/${id}`,{headers:{
//         'Authorization' : 'Bearer '+ accessToken},
//       method:"PUT",
//       mode: "cors",
//       body: JSON.stringify(requestBody)
//     })
//       .then((response) => response.json())
//       .then((res) => {
//         setDetails(res.item.basket + 1);
//         setDetails(res.item.productidinbasket);
//       })
//       .catch((e) => {
//             alert("Unable to fetch results");
//             console.error(e);
//       })
//   }
const { register, handleSubmit } = useForm();

  return (
        <div className="container">
            <div className="text-center">
                <div class="card mb-3">
                <img class="card-img-top" src={post.vehicleImgURL} alt={post.vehicleName} />
                <div class="card-body">
                    <h5 class="card-title">{post.vehicleName}</h5>
                    <p class="card-text">Price :Rs {post.RentalPrice} /-</p>
                    <button type="button" className="btn btn-success" onClick={handleOpen}>PAY NOW</button>
                    {/* <button type="button" className="btn btn-danger" onClick={()=>history.push(routes.payment.replace(":userid", post._id))}>CHECKOUT</button> */}
                    <button type="button" className="btn btn-danger" onClick={()=>history.push(routes.allproducts)}>Go Back</button>
                </div>
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
                    <div className={classes.paper}>
                        <h1 id="transition-modal-title">ENTER CARD DETAILS</h1>
                        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(handleClose)}>
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
                                <Button variant="contained" size="large" color="primary" className={classes.margin} onClick={handleClose}>
                                    PAY
                                </Button>
                                <Button variant="contained" size="large" color="secondary" className={classes.margin} onClick={handleClose}>
                                    CANCEL
                                </Button>
                            </div>
                        </form>
                        </div>
                    </Fade>
                </Modal>
            </div>
      </div>
</div>
  )
};

export default Eachproductt;
