import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import FormInput from './Utils/FormInput';
import { ROLES } from '../App';

export default function Login() {

  const { setAuth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"
 
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const [values, setValues] = useState({

    email: "",
    password: "",
   
  });
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    }
  ]

  let handleSubmit = async (e) => {
    e.preventDefault()

    let { email, password } =values

    try {
      const response = await axios.post('/api/user/login',
        values,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials:true
        }
      
      );
     
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      const username = response?.data?.username;
      setAuth({ email, password, roles, accessToken,username });
      // setemail('')
      // setpassword('')
      roles==ROLES.Admin?navigate('/admin'):navigate('/customer')
      // navigate(from, { replace: true });
      
    } catch (error) {
      console.log(error.response.data)
        setErrMsg(error.response.data.error)
    }
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="bg-log">
    <div className="container">
      <div
        className="row justify-content-center align-content-center"
        style={{ height: '100vh' }}
      >
        <div className="col-12 col-md-7">
          <div
            className="card card-success"
            style={{ backgroundColor: '#2d3436' }}
          >
            <div className="card-body text-white">
            <h1 className="text-center">AA Creative EMB <br /> Customer Portal</h1>
            <hr className='bg-light w-75' />
              <h3 className="text-center">Login </h3>
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                {inputs.map((input) => (
                  <FormInput
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                  />
                ))}
                <div className="text-center my-4">
                  <button className="btn btn-primary w-50">Login</button>
                </div>
                <Link to={'/register'} className="my-4 text-center text-white font-weight-bolder d-block">Dont have an Account</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  )
}
