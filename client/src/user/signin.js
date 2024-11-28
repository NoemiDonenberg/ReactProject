import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SET_USER } from '../redux/action';

const schema = yup.object({
    Username: yup.string('must chars').min(2, 'too short').required('must username'),
    Password: yup.number('must number').required('must password'),
    Email: yup.string('must email'),
    Tz:yup.string('must number').min(9,'must 9 numbers')

})//בדיקת תקינות

const Signin=()=>{
    const nav=useNavigate();
    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const save = (data) => {
        axios.post("http://localhost:8080/api/user/sighin",data)
        .then(res=>{
            console.log(res)
            dispatch({type:SET_USER, data:res.data})
            nav("/homepage")
        })
        .catch()
       
     }
    return(
    <>
     <form onSubmit={handleSubmit(save)}>
                <input {...register("Username")}placeholder='שם משתמש' type="text"/>
                <p>{errors.Username?.message}</p>
                <input {...register("Password")} placeholder='סיסמא' type="password"/>
                <p>{errors.Password?.message}</p>
                <input {...register("Name")}placeholder='שם' type="text"/>
                <p>{errors.Username?.message}</p>
                <input {...register("Phone")}placeholder='טלפון' type="text"/>
                <p>{errors.Username?.message}</p>
                <input {...register("Email")}placeholder='מייל' type="email"/>
                <input {...register("Tz")}placeholder='תעודת זהות' type="text"/>
                <input type="submit" value="להרשם"/>
                
            </form>
    </>)

}
export default Signin