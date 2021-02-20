import { useState } from "react";
import axios from "axios";
import { Form, Button, FormLabel, FormControl, FormText, FormGroup, Row, Col, Alert, } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, Link, Redirect } from "react-router-dom";
const jwt = require("jsonwebtoken")

const PasswordEdit = () => {
    const [formData, setFormData] = useState({})
    const [changeStatus, setChangeStatus] = useState()
    const [errorMsg, setErrorMsg] = useState()
    const [redirect, setRedirect] = useState(false)
    // const userId = props.user.userId
    // console.log("userId from props.userId at password edit", userId)
    const userIdParam = useParams().id

    const token = localStorage.getItem("token");
    const decoded = jwt.verify(token, "sei-26");//cant read secret :/
    const user = { userId: decoded.user._id, username: decoded.user.username }
    // console.log("user", user)

    const handleSubmit = (event) => {
        event.preventDefault();
        // setChangeStatus("Hang on, changing your password...");
        setErrorMsg()
        if (formData.password === formData.password2) {
            axios.put(`/api/user/${user.userId}`, { password: formData.password })
                .then((response) => {
                    console.log(response)
                    setChangeStatus("Password updated! Redirecting...")
                    setTimeout(() => {
                        setRedirect(true)
                    }, 2000);
                })
                .catch((error) => {
                    setErrorMsg(error.response.data.errors)
                })
        } else {
            setChangeStatus()
            setErrorMsg([{ msg: "Passwords don't match" }])
        }
    }

    const showErrors = () => {
        let errors = [];
        if (errorMsg) {
            errors.push(<p class="font-weight-bold">Error!</p>);
            for (let i = 0; i < errorMsg.length; i++) {
                errors.push(<p>{errorMsg[i].msg}</p>);
            }
        }
        return errors;
    };

    if (redirect) { //redirect to updated profile page
        return <Redirect to={`/user/${userIdParam}`} />
    }

    const keyWidth = 2
    const valueWidth = 6
    const buffer = 2

    return (
        <>
            {user.userId === userIdParam ?
                <div class="form-box">
                    <div class="form-h1">
                        <h1>Change Password</h1>
                    </div>
                    <div class="detailform-cont">
                        <Form onSubmit={handleSubmit}>
                            <FormGroup as={Row} controlId="newpassword1">
                                <Col sm={buffer} />
                                <FormLabel column sm={keyWidth}>
                                    <span class="font-weight-bold">Enter New Password: </span>
                                </FormLabel>
                                <Col sm={valueWidth}>
                                    <FormControl
                                        type="password"
                                        value={formData.password}
                                        onChange={(event) => {
                                            setFormData((state) => {
                                                return { ...state, password: event.target.value }
                                            })
                                        }} />
                                    <FormText className="text">
                                        {/* text-muted */}
                            Password must be at least 8 characters long
            </FormText>
                                </Col>
                            </FormGroup>

                            <FormGroup as={Row} controlId="password2">
                                <Col sm={buffer} />
                                <FormLabel column sm={keyWidth}><span class="font-weight-bold">Re-Enter New Password: </span>
                                </FormLabel>
                                <Col sm={valueWidth}>
                                    <FormControl
                                        type="Password"
                                        value={formData.password2}
                                        onChange={(event) => {
                                            setFormData((state) => {
                                                return { ...state, password2: event.target.value };
                                            });
                                        }}
                                    />
                                </Col>
                            </FormGroup>

                            <Row>
                                <Col sm={buffer} />
                                <Col sm={valueWidth + 1} >
                                    {changeStatus === "Password updated! Redirecting..." ? <Alert variant="success">{changeStatus}</Alert> : ""}
                                    {changeStatus === "Hang on, changing your password..." ? <Alert variant="secondary">{changeStatus}</Alert> : ""}
                                    {errorMsg ? <Alert variant="danger">{showErrors()}</Alert> : ""}
                                </ Col>
                                <Button
                                    variant="primary"
                                    style={{
                                        borderRadius: "10px",
                                        // border: "3px solid",
                                        fontWeight: "bold",
                                        height: "50px",
                                    }}
                                    type="submit"
                                >
                                    Save Password
                                </Button>
                            </Row>
                        </Form>

                        <Row>

                        </Row>

                    </div>
                </div>
                :
                <Redirect to={"/restricted"} />
            }
        </>
    );
};
export default PasswordEdit;
