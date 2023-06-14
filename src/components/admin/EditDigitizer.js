import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import FormInput from '../Utils/FormInput';

export default function EditDigitizer() {
    const{id}=useParams()
    const location = useLocation();
    let navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [contractDetails, setcontractDetails] = useState('N/A')
    const [error, seterror] = useState(null)
    const [ispending, setispending] = useState(null)
    const [digitizer, setdigitizer] = useState(null)

    const [values, setValues] = useState({
      email: '',
      password: '',
      username: '',
      salary: '',
      commissionType: '',
      commission: '',
      contractDetails: '',
      email: '',
      smsNumber: '',
      dateOfJoining: '',
    });
    const inputs = [
      {
        id: 1,
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        errorMessage: 'It should be a valid email address!',
        label: 'Email',
        required: true,
      },
      {
        id: 2,
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
        id: 3,
        name: 'username',
        type: 'text',
        placeholder: 'Enter Username',
        errorMessage:
          "Username should be 8-15 characters and shouldn't include any special character!",
        label: 'Username',
        pattern: '^[A-Za-z0-9 ]{8,15}$',
        required: true,
      },
      {
        id: 4,
        name: 'salary',
        type: 'number',
        placeholder: 'Enter Salary',
        errorMessage: 'salary should be in numbers',
        label: 'Salary',
        pattern: '^[0-9]{1,8}$',
        required: true,
      },
      {
        id: 5,
        name: 'salaryCurrency',
        type: 'text',
        placeholder: 'Enter Salary Currency',
        errorMessage: 'salary currency contains alphabets',
        label: 'Salary Currency',
        pattern: '^[A-Za-z]{1,8}$',
        required: true,
        defaultValue:'PKR'
      },
      {
        id: 6,
        name: 'commission',
        type: 'number',
        placeholder: 'Enter Salary Currency',
        errorMessage: 'commision contains numbers',
        label: 'Commission',
        pattern: '^[0-9]{1,8}$',
        required: true,
        value:0.00
      },
      {
        id: 7,
        name: 'smsNumber',
        type: 'text',
        placeholder: 'Enter SMS Number',
        errorMessage: 'SMS Number contains numbers',
        label: 'SMS Number',
        pattern: '^[0-9]{1,15}$',
        required: true,
      },
      {
        id: 8,
        name: 'dateOfJoining',
        type: 'date',
        placeholder: 'Enter Date Of Joining',
        errorMessage: 'Date Of Joining (YEAR-MONTS-DATE)',
        label: 'Date Of Joining',
        pattern: '^[0-9]{1,15}$',
        required: true,
      },
    ];

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getDigitizer = async () => {
          console.log('inside getorders function');
          try {
            // console.log("inside getorders try")
    
            const response = await axiosPrivate.get(`/api/admin/digitizer/${id}`, {
              signal: controller.signal,
            });
    
            isMounted && setdigitizer(response.data)
            isMounted && console.log('data=>',digitizer)
          } catch (err) {
            seterror(err);
            setispending(false);
            navigate('/login', { state: { from: location }, replace: true });
          }
        };
    
        getDigitizer();
    
        return () => {
          isMounted = false;
          controller.abort();
        };
      }, []);
    
    const handleSubmit = (e) => {
      e.preventDefault();
  
      let isMounted = true;
      const controller = new AbortController();
      const createDigitizer = async () => {
        console.log('controller', controller);
        let data ={...values,contractDetails}
        try {
          const response = await axiosPrivate.post(
            '/api/admin/digitizer',
            data,
            {
              headers: { "Content-Type": "application/json" },
              signal: controller.signal,
            },
          );
          console.log(response.data);
       
          isMounted &&  navigate('/admin/viewDigitizer');
        } catch (err) {
          seterror(err)
          navigate('/login', { state: { from: location }, replace: true });
        }
      };
      
  
      
        
      createDigitizer();
      return () => {
        isMounted = false;
        controller.abort();
      };
    };
  
    const onChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };
  
    return (
      <div className="container">
        <div className="row my-4 ">
          <div className="col-12">
            <div className="card card-success">
              <div className="card-header">
                <h3 className="card-title">
                  Add Digitizer
                </h3>
              </div>
              <div className="card-body w-100">
                {digitizer && console.log(digitizer)}
                {digitizer&&<form
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
                  {inputs.map((input) => (
                    (input.name=='email'||input.name=='password')?<FormInput
                    key={input.id}
                    {...input}
                    defaultValue={digitizer?.User[input.name]}
                    
                    onChange={onChange}
                    
                  />:<FormInput
                  key={input.id}
                  {...input}
                  defaultValue={digitizer?.[input.name]}
                  
                  onChange={onChange}
                  
                />
                    
                  ))}
                  <div className="text-center form-group">
                    <h3 className="my-2">Contract Details</h3>
  
                    <textarea
                      class="form-control"
                      rows="3"
                      placeholder="Enter Contract Details"
                      onChange={(e)=>{setcontractDetails(e.target.value)}}
                      defaultValue={digitizer.contractDetails}
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <input
                      
                      type="submit"
                      className="btn btn-success my-3 w-50"
                      value={'Create Digitizer'}
                    />
                  </div>
                </form>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
