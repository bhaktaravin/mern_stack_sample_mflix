import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, clearToken } from '../utils/auth';
import { api } from '../utils/api';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [sessionMsg, setSessionMsg] = useState('');
  const navigate = useNavigate();

  const logout = (expired = false) => {
    clearToken();
    if (expired) {
      // Pass a message to login page via location state
      navigate('/login', { state: { message: 'Session expired, please log in again.' } });
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      const res = await api('/api/data', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) return logout(true);
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button onClick={() => logout(false)}>Logout</button>
      </div>
      {sessionMsg && <p className="error">{sessionMsg}</p>}
      {data ? (
        <div className="data-box">
          <p>Welcome, {data.user?.name}</p>
          <pre>{JSON.stringify(data.user, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
