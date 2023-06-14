import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import FormInput from '../Utils/FormInput';
export default function Setting() {
  
  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  
  const [id, setid] = useState(null);
  const [customerDetails, setcustomerDetails] = useState(null);
  const [error, seterror] = useState(null);
  const [ispending, setispending] = useState(true);
  const [values, setValues] = useState({});
  const [pricing_preference, setpricing_preference] = useState('flatrate')
  const [time_zone, settime_zone] = useState('+00:00')
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    console.log(controller.signal);
    const getcustomerDetails = async () => {
      // console.log("inside getorders function")
      try {
        // console.log("inside getorders try")

        const response = await axiosPrivate.get(
          '/api/customer/customerDetails',
          {
            signal: controller.signal,
          },
        );
        console.log(response.data);
        setid(response.data.id)
        isMounted && setcustomerDetails(response.data);
      } catch (err) {
        seterror(err);
        setispending(false);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getcustomerDetails();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const inputs = [
    {
      id: 1,
      name: 'customer_name',
      type: 'text',
      placeholder: 'Enter Customer Name',
      errorMessage:
        "customer_name should be 3-50 characters and shouldn't include any special character!",
      label: 'Customer Name',
      pattern: '^[A-Za-z0-9 ]{3,50}$',
    
    },
    {
      id: 2,
      name: 'payment_contact_name',
      type: 'text',
      placeholder: 'Enter payment_contact_name',
      errorMessage:
        "payment_contact_name should be 3-50 characters and shouldn't include any special character!",
      label: 'Payment Contact Name',
      pattern: '^[A-Za-z ]{3,50}$',
      required: false,
    },
    {
      id: 3,
      name: 'billing_email',
      type: 'email',
      placeholder: 'Enter billing_email',
      errorMessage:
        "billing email should be a valid email address!",
      label: 'Billing Email',
  
      required: false,
    },
    {
      id: 4,
      name: 'company_name',
      type: 'text',
      placeholder: 'Enter company name',
      errorMessage:
        "company name should be 3-50 characters and shouldn't include any special character!",
      label: 'Company Name',
      pattern: '^[A-Za-z0-9 ]{3,50}$',
      required: false,
    },
    {
      id: 5,
      name: 'phone',
      type: 'text',
      placeholder: 'Enter phone',
      errorMessage:
        "phone name should be 3-50 characters and shouldn't include any special character!",
      label: 'phone',
      pattern: '/^\+?\d{1,3}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/',
      required: false,
    },
    {
      id: 6,
      name: 'fax',
      type: 'text',
      placeholder: 'Enter fax',
      errorMessage:
        "it should be a valid fax number",
      label: 'fax',
      pattern: '/^\+?\d{1,3}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/',
      required: false,
    },
    {
      id: 7,
      name: 'address',
      type: 'text',
      placeholder: 'Enter address',
      errorMessage:
        "it sholud be valid address",
      label: 'address',
      required: false,
    },
    {
      id: 8,
      name: 'city',
      type: 'text',
      placeholder: 'Enter city',
      errorMessage:
        "city name should be 3-50 characters and shouldn't include any special character!",
      label: 'city',
      pattern: '^[A-Za-z0-9 ]{3,50}$',
      required: false,
    },
    {
      id: 9,
      name: 'state',
      type: 'text',
      placeholder: 'Enter state',
      errorMessage:
        "state name should be 3-50 characters and shouldn't include any special character!",
      label: 'state',
      pattern: '^[A-Za-z0-9 ]{3,50}$',
      required: false,
    },
    {
      id: 10,
      name: 'country_code',
      type: 'text',
      placeholder: 'Enter country code',
      errorMessage:
        "country code name should be 3-50 characters and shouldn't include any special character!",
      label: 'Country Code',
      pattern: '^[A-Za-z0-9 ]{3,50}$',
      required: false,
    },
    {
      id: 11,
      name: 'machine_name',
      type: 'text',
      placeholder: 'Enter machine name',
      errorMessage:
        "machine name name should be 3-50 characters and shouldn't include any special character!",
      label: 'Machine Name',
      pattern: '^[A-Za-z0-9 ]{3,50}$',
      required: false,
    },
    {
      id: 11,
      name: 'files_required',
      type: 'text',
      placeholder: 'Enter  Files You Normally Require For Embroidery Digitizing?',
      errorMessage:
        "machine name name should be 3-50 characters and shouldn't include any special character!",
      label: ' Files You Normally Require For Embroidery Digitizing?',
   
      required: false,
    },
  ];
  const handleSubmit = (e) => {
    console.log("first")
    e.preventDefault()

    let isMounted = true;
    const controller = new AbortController();
    console.log(id)
    const editCustomer = async () => {
      let isMounted = true;
      const controller = new AbortController();
      let data = {...values,pricing_preference,time_zone}
      try {
        const response = await axiosPrivate.patch(
          `/api/customer/customerDetails/${id}`,
          data,
          {
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
          },
        );
        console.log(response.data);
        isMounted && setcustomerDetails(response.data);
        isMounted && navigate('/customer');
      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    editCustomer()
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
      <div className="row my-4">
        <div className="col-12">
          <div className="card card-success">
            <div className="card-header">
              <h3 className="card-title">Edit Your Profile</h3>
              {error && <h3 className="card-title">{error}</h3>}
            </div>
            <div className="card-body">
              {customerDetails && (
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
                    defaultValue={customerDetails[input.name]}
                  />
                ))}
                  <div className="form-group">
                    <label for="">Pricing You Prefer?</label>
                    <select class="form-control" onChange={(e)=>{setpricing_preference(e.target.value)}}>
                      <option value="flatrate">flat rate</option>
                      <option value="stitchcount">stitch count</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label for="">Your Time Zone:</label>
                    <select
                      className="form-control"
                      name="timezone_offset"
                      id="timezone-offset"
                      onChange={(e)=>{settime_zone(e.target.value)}}
                    >
                      <option value="-12:00">
                        (GMT -12:00) Eniwetok, Kwajalein
                      </option>
                      <option value="-11:00">
                        (GMT -11:00) Midway Island, Samoa
                      </option>
                      <option value="-10:00">(GMT -10:00) Hawaii</option>
                      <option value="-09:50">(GMT -9:30) Taiohae</option>
                      <option value="-09:00">(GMT -9:00) Alaska</option>
                      <option value="-08:00">
                        (GMT -8:00) Pacific Time (US &amp; Canada)
                      </option>
                      <option value="-07:00">
                        (GMT -7:00) Mountain Time (US &amp; Canada)
                      </option>
                      <option value="-06:00">
                        (GMT -6:00) Central Time (US &amp; Canada), Mexico City
                      </option>
                      <option value="-05:00">
                        (GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima
                      </option>
                      <option value="-04:50">(GMT -4:30) Caracas</option>
                      <option value="-04:00">
                        (GMT -4:00) Atlantic Time (Canada), Caracas, La Paz
                      </option>
                      <option value="-03:50">(GMT -3:30) Newfoundland</option>
                      <option value="-03:00">
                        (GMT -3:00) Brazil, Buenos Aires, Georgetown
                      </option>
                      <option value="-02:00">(GMT -2:00) Mid-Atlantic</option>
                      <option value="-01:00">
                        (GMT -1:00) Azores, Cape Verde Islands
                      </option>
                      <option value="+00:00" selected="selected">
                        (GMT) Western Europe Time, London, Lisbon, Casablanca
                      </option>
                      <option value="+01:00">
                        (GMT +1:00) Brussels, Copenhagen, Madrid, Paris
                      </option>
                      <option value="+02:00">
                        (GMT +2:00) Kaliningrad, South Africa
                      </option>
                      <option value="+03:00">
                        (GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg
                      </option>
                      <option value="+03:50">(GMT +3:30) Tehran</option>
                      <option value="+04:00">
                        (GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi
                      </option>
                      <option value="+04:50">(GMT +4:30) Kabul</option>
                      <option value="+05:00">
                        (GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent
                      </option>
                      <option value="+05:50">
                        (GMT +5:30) Bombay, Calcutta, Madras, New Delhi
                      </option>
                      <option value="+05:75">
                        (GMT +5:45) Kathmandu, Pokhara
                      </option>
                      <option value="+06:00">
                        (GMT +6:00) Almaty, Dhaka, Colombo
                      </option>
                      <option value="+06:50">(GMT +6:30) Yangon, Mandalay</option>
                      <option value="+07:00">
                        (GMT +7:00) Bangkok, Hanoi, Jakarta
                      </option>
                      <option value="+08:00">
                        (GMT +8:00) Beijing, Perth, Singapore, Hong Kong
                      </option>
                      <option value="+08:75">(GMT +8:45) Eucla</option>
                      <option value="+09:00">
                        (GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk
                      </option>
                      <option value="+09:50">(GMT +9:30) Adelaide, Darwin</option>
                      <option value="+10:00">
                        (GMT +10:00) Eastern Australia, Guam, Vladivostok
                      </option>
                      <option value="+10:50">
                        (GMT +10:30) Lord Howe Island
                      </option>
                      <option value="+11:00">
                        (GMT +11:00) Magadan, Solomon Islands, New Caledonia
                      </option>
                      <option value="+11:50">(GMT +11:30) Norfolk Island</option>
                      <option value="+12:00">
                        (GMT +12:00) Auckland, Wellington, Fiji, Kamchatka
                      </option>
                      <option value="+12:75">(GMT +12:45) Chatham Islands</option>
                      <option value="+13:00">(GMT +13:00) Apia, Nukualofa</option>
                      <option value="+14:00">
                        (GMT +14:00) Line Islands, Tokelau
                      </option>
                    </select>
                  </div>
                 {/* <div className="form-group">
                    <label for="">
                      ENABLE AUTOMATIC BILLING TO SAVE YOUR TIME AND EFFORT ?
                    </label>
                    <select class="form-control" onChange={}>
                      <option value="" selected="">
                        No, don't charge my card automatically
                      </option>
                      <option value="1">Yes, charge my card automatically</option>
                    </select>
                    <div className="bg-danger text-light p-3 my-2 rounded">
                      <small>
                        It is optional but highly recommended that you enable
                        automatic billing on the day of your choice to avoid any
                        late fees in case you forget to pay the invoice on time.
                        This will make everything automatic for you such that you
                        can focus on sending / posting orders and our order
                        manaagement system will take care of everything else for
                        you.
                        <br />
                        If you don't allow automatic billing, our system will
                        still try to protect you from the late fees by attempting
                        to bill your last payment method if you forget to pay for
                        more than 45 days but that billing date will be a random
                        day. So please enable automatic billing on a suitable day
                        to make your life easier.
                        <br />
                        In any case, you will receive a detailed paid PDF invoice
                        for your records which will keep you aware of every
                        payment and about how much you were charged for which
                        service. Our client portal also shows all previous paid
                        invoices for your records. We really care for our clients.
                      </small>
                    </div>
                </div>*/}
                  <div className="text-center">
                    <input
                      type="submit"
                      className="btn btn-danger w-50"
                      value={'Update'}
                    />
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
