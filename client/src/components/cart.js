import { Box, List, ListItem, ListItemIcon, ListItemText, TableCell, TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';//קניתי את כל הכמות של המוצר
import axios from "axios";
import React, { useEffect } from 'react';
import { Segment } from "semantic-ui-react";
import { DELETE_FROM_CART, SET_CART } from "../redux/action";

const Cart = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const list = useSelector(state => state.cart);
    const handleDeleteIng = (ing) => {
        console.log("ing", ing);
        axios.post(`http://localhost:8080/api/bay/delete/${ing.Id}`).then(() => {
            dispatch({ type: DELETE_FROM_CART, data: ing });
        })
    }

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:8080/api/bay/${user.Id}`)
                .then(res => {
                    dispatch({ type: SET_CART, data: res.data });
                })
                .catch(err => {
                    alert(err.response?.data);
                });
        }
    }, [dispatch]);

    return <>
        {list?.length == 0 ? <Segment>אין מוצרים לקניה</Segment> : ""}
        <Box sx={{ width: '100%', maxWidth: "80%", bgcolor: 'background.paper', margin: 'auto' }}>
            <List>
                {list?.map(ing => {
                    return <>
                        <ListItem disablePadding key={ing?.Id}
                            sx={[{ minWidth: "300px" }, { width: "fit-content" }, { margin: "auto" }, { textAlign: "center" }]}>
                            <ListItemIcon onClick={() => handleDeleteIng(ing)}>
                                <CheckCircleRoundedIcon color="success" sx={{ fontSize: 40 }} />
                            </ListItemIcon>
                            <TableRow key={`${ing?.Name}${ing?.Type}${ing?.Count}`} sx={[{ '&:last-child td, &:last-child th': { border: 0 } }, { width: "fit-content" }]}>
                                <TableCell key={0} component="th" scope="row">{ing?.Name}</TableCell>
                                <TableCell key={2} align="right">{ing?.Count}</TableCell>
                                <TableCell key={1} align="right">{ing?.Type}</TableCell>
                            </TableRow>
                        </ListItem>
                    </>
                })}
            </List>
        </Box>
    </>
}
export default Cart;