import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    // console.log("inside => useRefreshToken");
    const refresh = async () => {
        // console.log("inside => useasyncRefreshToken");
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log("prev=>",JSON.stringify(prev));
            console.log("res=>",response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;