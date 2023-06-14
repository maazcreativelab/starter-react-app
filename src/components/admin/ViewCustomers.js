import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
export default function ViewCustomers() {

    const { auth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const [digitizers, setdigitizers] = useState(null);
    const [error, seterror] = useState(null);
    const [ispending, setispending] = useState(true);

    useEffect(() => {
    
        let isMounted = true;
        const controller = new AbortController();

        const getDigitizers = async () => {
         
          try {
    
    
            const response = await axiosPrivate.get('/api/admin/customer', {
              signal: controller.signal,
            });
            console.log("data",response);
           
            isMounted && setdigitizers(response.data);
          } catch (err) {
            console.log(err)
            seterror(err);
            setispending(false);
            // navigate('/login', { state: { from: location }, replace: true });
          }
        };
    
        getDigitizers();
    
        return () => {
          isMounted = false;
          controller.abort();
        };
      }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">View Customer</h3>
        {error && <h3 className="card-title">{error}</h3>}
        <div className="card-tools">
          <div className="input-group input-group-sm" style={{ width: 150 }}>
            <input
              type="text"
              name="table_search"
              className="form-control float-right"
              placeholder="Search"
            />
            <div className="input-group-append">
              <button type="submit" className="btn btn-default">
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="card-body table-responsive p-0"
        style={{ height: '80vh' }}
      >
        <table className="table table-head-fixed text-wrap">
          <thead>
            <tr>
              <th>customer_name</th>
              <th>company_name</th>
              <th>currencyType</th>
              <th>phone</th>
              <th>fax</th>
          
            </tr>
          </thead>
          <tbody>
            {digitizers &&
              digitizers.map((digitizer) => (
                <tr>
                  <td>{digitizer?.customer_name}</td>
                  <td>{digitizer?.company_name}</td>
                  <td>{digitizer?.currencyType}</td>
                  <td>{digitizer?.phone}</td>
                 
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
