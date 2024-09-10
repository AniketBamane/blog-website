// src/components/Verify.js

import authService from '@/appwrite/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const VerificationPage = () => {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const verifyEmail = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const secret = urlParams.get('secret');
      const userId = urlParams.get('userId');

      if (secret && userId) {
        await authService.updateVerification({ userId, secret });
        setVerified(true);
        navigate("/"); // Redirect to home or desired page
      } else {
        throw new Error("Missing parameters.");
      }
    } catch (err) {
      setError(err.message);
      console.error("Verification failed:", err);
      navigate("/authentication"); // Redirect to authentication or error page
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <div className="verification-page">
      <h1>Verify Email</h1>
      {loading && <p>Loading...</p>}
      {verified && <p>Email verified successfully!</p>}
      {error && <p>Error: {error}</p>}
      <Button onClick={() => navigate("/authentication")}>Go to Login</Button>
    </div>
  );
};

export default VerificationPage;
