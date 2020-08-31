import React,{useState} from "react"
import routes from "../routes/routes";
import { useHistory } from 'react-router-dom';
import { Spinner } from "reactstrap";
import { useSetRecoilState } from "recoil";
import { SERVER_URL } from "../constants/serveruls"
import { loggedinUserState,jwtState } from "../recoiled/globalState";
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  margin:{
    height:"100%",
    display:"flex",
    justifyContent:"center",
    // flexDirection:"column",
    
  },
});

const Login = () => {
  const classes = useStyles();
    const setUser = useSetRecoilState(loggedinUserState);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const setAccessKey = useSetRecoilState(jwtState);

    const history = useHistory();

    const onSubmitclick = (event) => {
        setIsLoading(true);
        // event.preventDefault();
        const requestBody = { email, password };
    
        fetch(`${SERVER_URL}/user/login`, {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          mode: "cors",
          body: JSON.stringify(requestBody)
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.user)
              alert("Successfully Login");
              setAccessKey(data.token);
              setUser(data.user);
            })
            .then(() => {history.push(routes.allproducts)})
          .catch((e) => {
            alert("Invalid credentials..!");
            console.error(e);
          })
          .finally(() => {
            setIsLoading(false);
          });
      };
      const { register, handleSubmit } = useForm();
    return (
      <div style={{paddingTop:"170px"}}>
              <Box mx="auto" p={1} className={classes.margin}>
                  <Card className={classes.root}>
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fjobs.nokriwp.com%2Fwp-content%2Fuploads%2F2018%2F09%2Flogin-avatar-1.png&f=1&nofb=1"></img>
                    <CardContent>
                      <form onSubmit={handleSubmit(onSubmitclick)}>
                          <div className="form-group">
                           <input type="email" className="form-control" name="email" ref={register({ required: true})} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="enter email.."/>
                          </div>
                          <div className="form-group">
                            <input type="password" className="form-control" name="password" ref={register({ required: true})} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="enter password.."/>
                          </div>
                          <div className="text-center">
                              {isLoading ? (
                              <Spinner style={{ width: "3rem", height: "3rem" }} />
                              ) : (
                                <div className="p-1">
                                    <Button variant="contained" size="large" color="primary" type="submit" className="text-uppercase font-weight-bold">
                                        <h2>Login</h2> 
                                      </Button>
                                </div>
                              )
                              }
                          </div>
                        
                      </form>
                    </CardContent>
                    <hr />
                    <CardActions>
                      <Box mx="auto">
                        <div className="d-flex align-content-center flex-column">
                        <Typography p={1}>Not a member, Signup here ..</Typography>
                        <Button variant="contained" size="large" color="secondary" className="text-uppercase font-weight-bold" onClick={()=>history.push(routes.signup)}>
                          <h3>REGISTER</h3>
                        </Button>
                      </div>
                      </Box>  
                  </CardActions>
               </Card>
                
                </Box> 
                </div>
    )
}

export default Login;

