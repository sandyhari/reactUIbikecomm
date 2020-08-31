import React from "react"
import Login from "./login"
import { Button } from "@material-ui/core";
import routes from "../routes/routes";
import { useHistory } from "react-router-dom";

const Logout = () => {
    const history = useHistory()

    return(
        <div className="text-center" style={{paddingTop:"180px"}}>
            <div class="d-flex align-content-center flex-column text-center">
                <h1 className="text-muted">
                    Thanks for visiting us..!
                </h1>
                <h3 className="text-muted">
                    you have been Successfully logged out
                </h3>
                <div>
                    <Button variant="contained" size="large" color="secondary" onClick={()=>{history.push(routes.login)}}>re-login</Button>
                </div>
            </div>
        </div>
    )
}

export default Logout;