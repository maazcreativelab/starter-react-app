import React, { useEffect, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import { TagFilled  ,EditFilled} from '@ant-design/icons';
export default function ViewDigitizers() {
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
    
    
            const response = await axiosPrivate.get('/api/admin/digitizer', {
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
        <h3 className="card-title">View Digitizers</h3>
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
              <th>Username</th>
              <th>Salary</th>
              <th>Commission Type</th>
              <th>Commission</th>
              <th>Contract Details</th>
              <th>Sms Number</th>
              <th>Date Of Joining</th>
              <th>Actions</th>
        
            </tr>
          </thead>
          <tbody>
            {digitizers &&
              digitizers.map((digitizer) => (
                <tr>
                  <td>{digitizer?.username}</td>
                  <td>{digitizer?.salary}</td>
                  <td>{digitizer?.commissionType}</td>
                  <td>{digitizer?.commission}</td>
                  <td>{digitizer?.contactDetails}</td>
                  <td>{digitizer?.smsNumber}</td>
                  <td>{digitizer?.dateOfJoining}</td>
                  <div className="icon-container" >
                  <td><Link to={`/admin/editDigitizer/${digitizer.id}`}><EditFilled style={{ fontSize: '25px', color: '#023047' }} /></Link></td>
                  <span className="text">Edit digitizer</span>
                  </div>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
