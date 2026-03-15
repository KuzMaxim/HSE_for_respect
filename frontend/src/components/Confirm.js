import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Confirm() {
  const { id } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/confirm/${id}`);
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        setMessage('Error confirming email');
      }
    };
    confirmEmail();
  }, [id]);

  return (
    <div>
      <h1>Email Confirmation</h1>
      <p>{message}</p>
    </div>
  );
}

export default Confirm;