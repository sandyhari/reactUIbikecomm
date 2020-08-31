import React, { useEffect, useState } from "react"
import { useRecoilValue } from "recoil";
import { jwtState,loggedinUserState } from "../recoiled/globalState";
import { SERVER_URL } from "../constants/serveruls";
import { useToasts } from 'react-toast-notifications';
import { useHistory } from "react-router-dom";
import routes from "../routes/routes";
import { Link } from "react-router-dom";
import "../ComponentStyles/productList.css";

const Displaytable = () => {
  const history = useHistory();
  const { addToast } = useToasts()
  const userObj = useRecoilValue(loggedinUserState);
  const accessToken = useRecoilValue(jwtState);
        console.log("notoken:",accessToken);
  const [content,setContent] = useState([]);

  useEffect(()=>{
    fetch(`${SERVER_URL}/products`,{
      headers:{
      'Authorization' : 'Bearer '+ accessToken,
      'Content-Type': 'application/json'
    },
      mode:"cors"})
    .then((response) => response.json())
    .then((data) => {
      console.log(data.result);
      addToast(`hey ,hii ${userObj.username}`, {
        appearance: 'success',
        autoDismiss: true,
      })
      setContent(data.result);
    })
    .catch((e)=>{
                console.error(e);
                alert("session expired");
                history.push(routes.login)
      })},[])
return(
  <div className="container" style={{paddingTop:"200px"}}>
    <header className="pb-2 bg-black">
      <h3>Welcome, {userObj.username} </h3>
    </header>
    <hr className="rounded" />
        <div className="p-3" />
          <div className="container1">
            {content.map((each,eachIndex) => {
              return (
                <Link to={routes.eachproduct.replace(":id", each._id)}>
                    <div className="box" key={eachIndex}>
                        <div className="card">
                            <img className="card-img-top" src={each.vehicleImgURL} alt="biike" />
                            <div className="card-body">
                                <h5 className="card-title font-weight-bold text-dark">{each.vehicleName}</h5>
                                <p className="card-text font-weight-bold text-dark">Price : Rs {each.RentalPrice} /-</p>
                            </div>
                        </div>
                    </div>
                </Link>
              );
            })}
          </div>
  </div>
)
}

export default Displaytable;