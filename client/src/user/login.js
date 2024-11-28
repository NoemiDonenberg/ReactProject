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
    Password: yup.number('must number').required('must password')
})//בדיקת תקינות



const Login = () => {
    const nav=useNavigate();
    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const check = (data) => {
        console.log("pass",data.Password)
       axios.post("http://localhost:8080/api/user/login",data)
       .then(res=>{
           console.log(res.data)
           dispatch({type:SET_USER, data:res.data})
           nav("/homepage")
       })
       .catch()
    }
    return (
        <>
            <form onSubmit={handleSubmit(check)}>
                <input {...register("Username")} type="text"/>
                {/*  */}
                <p>{errors.Username?.message}</p>
                <input {...register("Password")} type="password"/>
                <p>{errors.Password?.message}</p>
                <input type="submit" value="שמור"/>
            </form>
        </>
    );
}

export default Login

