import axios from '../api/axios';
import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import FormInput from './Utils/FormInput';

export default function Register() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const inputs = [
    {
      id: 1,
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: 'Username',
      pattern: '^[A-Za-z0-9]{3,16}$',
      required: true,
    },
    {
      id: 2,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'It should be a valid email address!',
      label: 'Email',
      required: true,
    },
    {
      id: 3,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage:
        'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
      label: 'Password',
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      errorMessage: "Passwords don't match!",
      label: 'Confirm Password',
      pattern: values.password,
      required: true,
    },
  ];

  // const [username, setusername] = useState(null);
  // const [email, setemail] = useState(null);
  const [currencyType, setcurrencyType] = useState('USD');
  const [errMsg, setErrMsg] = useState(null);
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  let handleSubmit = (e) => {
    e.preventDefault();

    // let { email, password, username } = values;
    const data = { ...values, currencyType };
    let isMounted = true;
    const controller = new AbortController();
    const getOrders = async () => {
      // console.log("inside getorders function")
      e.preventDefault();
      try {
        const response = await axios.post('/api/user/signup', data, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;

        setAuth({
          email: response?.data?.email,
          roles,
          accessToken,
          username: response?.data?.username,
        });
        // setemail('')
        // setpassword('')
        roles == 'admin' ? navigate('/admin') : navigate('/customer');
        // navigate(from, { replace: true });
      } catch (error) {
        console.log("error",error);
        setErrMsg(error.response.data.error);
      }
    };

    getOrders();

    return () => {
      isMounted = false;
      controller.abort();
    };
  };

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
                <h1 className="text-center">AA Creative EMB Customer Portal</h1>
                <hr className="bg-light w-75" />
                <h3 className="text-center">Register Now !</h3>
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
                  <div className="form-group">
                    <label for="">Currency Type</label>
                    <select
                      class="form-control"
                      onChange={(e) => {
                        setcurrencyType(e.target.value);
                      }}
                    >
                      <option>USD</option>
                      <option>CAD</option>
                      <option>GBP</option>
                      <option>EUR</option>
                      <option>AUD</option>
                      <option>JPY</option>
                    </select>
                  </div>
                  <div className="text-center my-4">
                    <button className="btn btn-primary w-50">Register</button>
                  </div>
                  <Link
                    to={'/login'}
                    className="my-4 text-center text-white font-weight-bolder d-block"
                  >
                    Already have an Account
                  </Link>
                </form>
                {errMsg && <div class="alert alert-danger alert-dismissible">
                  <button
                    type="button"
                    class="close"
                    data-dismiss="alert"
                    aria-hidden="true"
                  >
                    ×
                  </button>
                  <h5>
                    <i class="icon fas fa-ban"></i> Alert!
                  </h5>
                  {errMsg}
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
