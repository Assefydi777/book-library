import { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Auth.module.css";
import { axiosInstance } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from '../../context.';

const Auth = () => {
    const navigate = useNavigate();
    const { user, setUserLogin, logout } = useGlobalContext();

    const [displayLogin, setDisplayLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUserName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle login/signup logic here
        // check if it is a login or a register call happening
        try {
            if (displayLogin === true) {
                // Contact with the backend functionality
                await axiosInstance({
                    method: "POST",
                    url: `/users/login`,
                    data: {
                        email,
                        password,
                    },
                }).then((response) => {
                    const userObject = {
                        userid: response.data.userid,
                        username: response.data.username,
                        firstname: response.data.firstname,
                        token: response.data.token,
                    };

                    setUserLogin(userObject);

                    // Save the user id and token to local storage
                    //   localStorage.setItem("user_id", userObject.userid);
                    //   localStorage.setItem("token", userObject.token);
                });
                navigate("/");
            } else {
                // call the register function
                // Contact with the backend functionality
                await axiosInstance({
                    method: "POST",
                    url: `/users/register`,
                    data: {
                        email,
                        password,
                        username,
                        firstname,
                        lastname,
                    },
                }).then((response) => {
                    const userObject = {
                        userid: response.data.userid,
                        username: response.data.username,
                        firstname: response.data.firstname,
                    };

                    setUserLogin(userObject);

                });
                alert("Successfully signed up to Evangadi.");
                navigate("/");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={classes.authContainer}>
            <div className={classes.authInnerContainer}>
                <div className={classes.loginBox}>
                    <h2 className={classes.loginTitle}>
                        {displayLogin ? "Login to your account" : "Create a new account"}
                    </h2>
                    {displayLogin ? (
                        <p className={classes.createAccount}>
                            Don’t have an account?{" "}
                            <span
                                onClick={() => setDisplayLogin(false)}
                                className={classes.toggleForm}
                            >
                                Create a new account
                            </span>
                        </p>
                    ) : (
                        <p className={classes.createAccount}>
                            Already have an account?{" "}
                            <span
                                onClick={() => setDisplayLogin(true)}
                                className={classes.toggleForm}
                            >
                                Login
                            </span>
                        </p>
                    )}
                    <form onSubmit={handleSubmit} className={classes.loginForm}>
                        {!displayLogin && (
                            <div className={classes.nameFields}>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={firstname}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className={classes.inputField}
                                />

                                <input
                                    type="text"
                                    placeholder="User Name"
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className={classes.inputField}
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastname}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className={classes.inputField}
                                />
                            </div>
                        )}
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={classes.inputField}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={classes.inputField}
                        />
                        {!displayLogin ? (
                            <p className={classes.agreeTerms}>
                                I agree to the <u> privacy policy </u> and{" "}
                                <u> terms of service </u>.
                            </p>
                        ) : (
                            <p className={classes.forgotPassword}>
                                Forgot password?
                            </p>
                        )}
                        <button type="submit" className={classes.loginButton}>
                            {displayLogin ? "Login" : "Agree and Join"}
                        </button>

                        <span
                            className={classes.account}
                            onClick={() => setDisplayLogin(true)}
                        >
                            {displayLogin ? "" : " Already have an account?"}
                        </span>
                    </form>
                </div>
                <div className={classes.aboutSection}>
                    <h2 className={classes.aboutTitle}>Welcome</h2>
                    <h1 className={classes.aboutSubTitle}>Book Library</h1>
                    <p className={classes.aboutText}>Welcome to our web application, the ultimate destination for book enthusiasts!
                        Whether you're looking to discover your next favorite read,
                        search for specific titles, or explore which books are currently making waves in the literary world,
                        our platform is designed to cater to all your literary needs. Dive into our extensive collection,
                        find detailed information on a wide range of books, and connect with a community of fellow readers.
                        Start your journey today and immerse yourself in the world of books like never before!
                    </p>
                    <button
                        className={displayLogin ? classes.createAccountButton:  classes.newAccountButton }
                        onClick={() => setDisplayLogin(false)}
                    >
                        {"CREATE A NEW ACCOUNT"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;