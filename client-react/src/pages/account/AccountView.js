import { useState, useEffect } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import axios from "axios";
import {
  Button,
  FormLabel,
  FormControl,
  FormGroup,
  Row,
  Col,
} from "react-bootstrap";
const jwt = require("jsonwebtoken");

const AccountView = () => {
  //user={userId, username}
  const [formData, setFormData] = useState({});
  const userIdParam = useParams().id;
  const token = localStorage.getItem("token");
  const decoded = jwt.verify(token, "sei-26"); //cant read secret :/
  const user = { userId: decoded.user._id, username: decoded.user.username };

  useEffect(() => {
    //get the user
    axios
      .get(`/api/user/${userIdParam}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [userIdParam]);

  const buffer = 2;
  const keyWidth = 2;
  const valueWidth = 6;

  return (
    <div>
      {user.userId === userIdParam ? ( //prevent people from manipulating with userId in params
        <div className="form-box">
          <div class="form-h1">
            <h1>Account Details</h1>
          </div>
          <div class="detailform-cont">
            <FormGroup as={Row} controlId="username">
              <Col sm={buffer} />
              <FormLabel column sm={keyWidth}>
                <span class="font-weight-bold">Username : </span>{" "}
              </FormLabel>
              <Col sm={valueWidth}>
                <p style={{ padding: "7px 15px" }}>{formData.username}</p>
              </Col>
            </FormGroup>

            <FormGroup as={Row} controlId="name">
              <Col sm={buffer} />
              <FormLabel column sm={keyWidth}>
                <span class="font-weight-bold">Name : </span>
              </FormLabel>
              <Col sm={valueWidth}>
                <FormControl
                  type="text"
                  value={formData.name}
                  disabled={true}
                />
              </Col>
            </FormGroup>

            <FormGroup as={Row} controlId="email">
              <Col sm={buffer} />
              <FormLabel column sm={keyWidth}>
                <span class="font-weight-bold">Email : </span>{" "}
              </FormLabel>
              <Col sm={valueWidth}>
                <FormControl
                  type="email"
                  value={formData.email}
                  disabled={true}
                />
              </Col>
            </FormGroup>

            <div id="" class="pt-1">
              <Row>
                <Col sm={buffer + keyWidth} />
                <Col sm={valueWidth}>
                  <div className="rightLink" class="d-flex flex-row">
                    <Link to={`/user/${user.userId}/edit`}>
                      <Button
                        variant="primary"
                        style={{
                          borderRadius: "10px",
                          padding: "6px",
                          width: "150px",
                          fontWeight: "bold",
                          margin: "5px",
                        }}
                      >
                        Edit Profile
                      </Button>
                    </Link>
                    <Link to={`/user/${user.userId}/delete`}>
                      <Button
                        variant="danger"
                        style={{
                          borderRadius: "10px",
                          padding: "6px",
                          width: "150px",
                          margin: "5px",
                        }}
                      >
                        Delete Account
                      </Button>
                    </Link>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to={"/restricted"} />
      )}
    </div>
  );
};

export default AccountView;
