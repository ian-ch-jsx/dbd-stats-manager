import { useState, useEffect } from 'react';
import { signUpUser, signInUser } from '../../services/auth';
import { useUser } from '../../context/UserContext';
import AuthForm from '../../components/Auth/AuthForm';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Auth({ isSigningUp = false }) {
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSigningUp) {
        const resp = await signUpUser(email, password);
        if (resp.error) {
          setError(resp.error.message);
        }
        setUser({ id: resp.user.id, email: resp.user.email });
      }
      const resp = await signInUser(email, password);
      if (resp.error) {
        setError(resp.error.message);
      }
      setUser({ id: resp.user.id, email: resp.user.email });
      history.replace('/');
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <>
      <h2>{isSigningUp ? 'create an account' : 'sign in'}</h2>
      <h4>
        {isSigningUp ? (
          <Link to="/signin">Already Registered?</Link>
        ) : (
          <Link to="/signup">Register here</Link>
        )}
      </h4>
      <AuthForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
