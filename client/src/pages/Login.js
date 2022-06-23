import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import isLogin from "../common/isLogin";
import { Encryption } from '../common/encryption';
import { fetchSignIn } from "../redux/authSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginErr, setLoginErr] = useState(null);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: process.env.TEST_USERNAME,
            password: process.env.TEST_PASSWORD
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                const encPass = Encryption(values.password, process.env.API_ENC_KEY)
                console.log(encPass)
                setLoading(true);
                await dispatch(fetchSignIn({ username: values.email, password: encPass })).unwrap();
                //navigate("/home", { replace: true })
            }
            catch (e) {
                setLoginErr(e?.message);
                setLoading(false);
            }
        },
    });

    return (
        isLogin() ? <Navigate to="/home" replace={true} /> : <div>
            <h2>BK App</h2>
            {
                loading ? <>Loading...</> : <form style={{ 'marginTop': '16px' }} onSubmit={formik.handleSubmit} size={'large'}>
                    {loginErr ? (<div>{loginErr}</div>) : null}
                    <input id="email" name="email" placeholder='Email' onChange={formik.handleChange} value={formik.values.email}></input>
                    {formik.touched.email && formik.errors.email ? (<div>{formik.errors.email}</div>) : null}

                    <input id="password" name="password" type="password" placeholder='Password' onChange={formik.handleChange} value={formik.values.password}></input>
                    {formik.touched.password && formik.errors.password ? (<div>{formik.errors.password}</div>) : null}

                    <button type="submit">Sign In</button>
                </form>
            }
        </div>
    );
}

export default Login;