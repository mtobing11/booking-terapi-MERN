import React, { useEffect }from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SuccessLog = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log(navigate); 
        setTimeout(() => {
        navigate('/dashboard')
        }, 2000)
    }, [])

    return (
        <div>
            <h1>Success Loging</h1>
            <p>You will be direct to dashboard</p>
        </div>
    )
}

export default SuccessLog