import AccountDetailsForm from "./AccountDetailsForm";
import { useParams, Redirect } from "react-router-dom";
const jwt = require("jsonwebtoken");

const AccountEdit = () => {
    // const userId = props.user.userId
    // console.log("userId from props.userId at account edit", userId)
    const userIdParam = useParams().id;

    const token = localStorage.getItem("token");
    const decoded = jwt.verify(token, "sei-26");//cant read secret :/
    const user = { userId: decoded.user._id, username: decoded.user.username }
    console.log("user", user)
    return (
        <>
            {user.userId === userIdParam ? (
                <div className="form-box">

                    <div class="form-h1">
                        <h1>Edit account</h1>
                    </div>

                    <AccountDetailsForm user={user} />
                </div>
            ) : (
                    <Redirect to={"/restricted"} />
                )}
        </>
    );
};

export default AccountEdit;
