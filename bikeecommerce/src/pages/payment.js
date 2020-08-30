import React,{useEffect, useState} from 'react';
import { useToasts } from 'react-toast-notifications';
import { useParams, useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { SERVER_URL } from "../constants/serveruls";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { jwtState,loggedinUserState } from "../recoiled/globalState";
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import Paper from '@material-ui/core/Paper';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
        width: 190,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
  }));


const Payment = () => {
    const history = useHistory();
    const accessToken = useRecoilValue(jwtState);
    const { userid } = useParams();
    const { addToast } = useToasts()
    console.log(userid);
    const [disp,setDisp] = useState({});
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        fetch(SERVER_URL + `/products/${userid}`,{headers:{
            'Authorization' : 'Bearer '+ accessToken
          },
          mode: "cors"
        })
          .then((response) => response.json())
          .then((data) => {
              console.log(data.item)
              setDisp(data.item)
          })
          .catch(console.error);
      }, []);

    return(
    <div>
        <Card className={classes.root}>
        <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h3" variant="h3">
            Payment Summary
          </Typography>
          <Card className={classes.root}>
            <div className={classes.details}>
                    <Timeline>
                        <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography variant="body2" color="textSecondary">
                                1
                            </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot>
                                <AddShoppingCartIcon />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                            <TimelineContent>
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="h3" component="h3">
                                        {disp.vehicleName}
                                    </Typography>
                                    <Typography variant="h5" component="h5">Price : Rs {disp.RentalPrice}</Typography>
                                </Paper>
                            </TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </div>
            </Card>
        </CardContent>
        <div className={classes.controls}>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
                Pay now
            </Button>
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
            <h2 id="transition-modal-title">We received your payment</h2>
            <p id="transition-modal-description">Thank you for shopping with US..!</p>
          </div>
        </Fade>
      </Modal>
        </div>
      </div>
    </Card>
    </div>)
}

export default Payment;



