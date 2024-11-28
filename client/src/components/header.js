import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, ButtonGroup, Fab } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { SET_USER } from "../redux/action";

const Header = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const location = useLocation();
    const user = useSelector(state => state.user);
    const [active, setActive] = useState();

    useEffect(() => {
        setActive(location.pathname);
    }, [location]);

    const funcExit = () => {
        alert("Goodbye 🖐");
        dispatch({ type: SET_USER, data: null });
        nav("/header");
    };

    return (
        <header style={{ position: "sticky", top: 0, backgroundColor: "white", zIndex: 10, direction: "ltr" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignContent: "center", justifyContent: "space-evenly", alignItems: "center", marginTop: "5vh", marginBottom: "5vh" }}>
                <Fab variant="extended" color="success">
                    <PersonIcon sx={{ mr: 1 }} />
                    {user ? user.Name : "לא מחובר"}
                </Fab>
                <ButtonGroup color="success" size="large" sx={{ height: "5vh" }}>
                    {user ? (
                        <>
                            <Link to="/listRecipe">
                                <Button name="/listRecipe" variant={active === "/listRecipe" ? "text" : "contained"} onClick={ev => setActive(ev.target.name)}>
                                    כל המתכונים
                                </Button>
                            </Link>
                            <Link to="/addRecipe">
                                <Button name="/addRecipe" variant={active === "/addRecipe" ? "text" : "contained"} onClick={ev => setActive(ev.target.name)}>
                                    הוסף מתכון
                                </Button>
                            </Link>
                            <Link to="/cart">
                                <Button name="/cart" variant={active === "/cart" ? "text" : "contained"} onClick={ev => setActive(ev.target.name)}>
                                    לעגלת הקניות
                                </Button>
                            </Link>
                            <Button onClick={funcExit} color="error">
                                יציאה
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button name="/login" variant={active === "/login" ? "text" : "contained"} onClick={ev => setActive(ev.target.name)}>
                                    כניסה
                                </Button>
                            </Link>
                            <Link to="/signin">
                                <Button name="/signin" variant={active === "/signin" ? "text" : "contained"} onClick={ev => setActive(ev.target.name)}>
                                    הרשמה
                                </Button>
                            </Link>
                        </>
                    )}
                </ButtonGroup>
            </div>
            <hr style={{ borderColor: "#1976d2" }} />
        </header>
    );
}

export default Header;
