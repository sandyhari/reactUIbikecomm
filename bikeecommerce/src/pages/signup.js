import React,{useState} from "react"
import { useForm } from "react-hook-form";
import { SERVER_URL } from "../constants/serveruls"
import { Spinner } from "reactstrap";
import { useHistory } from "react-router-dom";
import routes from "../routes/routes";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Typography, Box } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  margin:{
    display:"flex",
    justifyContent:"center",
  },
});

const Signuppage = ()=>{
  
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const setEmailChange = (event) => setEmail(event.target.value);
  const setFirstnameChange = (event) => setFirstname(event.target.value);
  const setPasswordChange = (event) => setPassword(event.target.value);


  const addUser = (event)=>{
    setIsLoading(true);
    // event.preventDefault();
    if(email && username && password){
        const requestBody = { email, username, password };
        fetch(`${SERVER_URL}/user/signup`, {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          mode: "cors",
          body: JSON.stringify(requestBody)
        })
        .then((response) => response.json())
        .then(() => alert("Successfully registered"))
        .then(()=>{history.push(routes.login)})
        .catch((e) => {
          alert("Failed to register ,Check EmailAddress and try again");
          console.error(e);
        })
        .finally(() => {
          setIsLoading(false);
        })
      }
    };
    const { register, handleSubmit } = useForm();
    return (
      <div style={{paddingTop:"176px"}}>
         <Box mx="auto" className={classes.margin}>
            <Card className={classes.root}>
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fm1.behance.net%2Frendition%2Fmodules%2F99988087%2Fdisp%2F53985795ab8380a7cec2128a21dc9a67.jpg&f=1&nofb=1" style={{maxHeight: "300px"}}/>
              <CardContent>
              <form onSubmit={handleSubmit(addUser)}>
                <div className="form-group">
                    <label for="emailregister">Email</label>
                    <input type="email"  className="form-control" ref={register({ required: true})} name="emailregister" placeholder="Email id.." value={email} onChange={setEmailChange}/>
                </div>
                <div className="form-group">
                  <label for="FisrtName">Username</label>
                  <input type="text" className="form-control" ref={register({ required: true})} name="Username" placeholder="Username.." value={username} onChange={setFirstnameChange}/>
                </div>
                <div className="form-group">
                    <label for="passwordregister">Password</label>
                    <input type="password" className="form-control" ref={register({ required: true})} name="passwordregister" placeholder="password.." value={password} onChange={setPasswordChange}/>
                </div>
                {isLoading ? (
                <Spinner style={{ width: "3rem", height: "3rem" }} />
                ) : (
                  <Button variant="contained" size="large" color="primary" type="submit" className="text-uppercase font-weight-bold">
                  <h2>REGISTER</h2> 
                </Button>
                )}
            </form>
          </CardContent>
          <hr />
          <div className={classes.margin}>
            <Typography>Already registered member ?</Typography>
              <CardActions>
                <Button variant="contained" size="large" color="secondary" className="text-uppercase font-weight-bold" onClick={()=>history.push(routes.login)}>
                  <h3>LOGIN</h3>
                </Button>
                </CardActions>
          </div>
        </Card>
      </Box>
    </div>
         
    )
}   

export default Signuppage;

        