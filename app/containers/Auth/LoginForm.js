import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {
  FormCard,
  FormTitle,
  FormSubtitle,
  InputWrapper,
  InputLabel,
  StyledInput,
  SubmitButton,
  SwitchText,
  SwitchLink,
  ErrorMessage
} from '@components/styled/authForm';

const LoginForm = ({ onSubmit, loading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <FormCard>
      <FormTitle>Welcome back</FormTitle>
      <FormSubtitle>Sign in to continue your musical journey</FormSubtitle>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <InputLabel htmlFor="login-email">Email</InputLabel>
          <StyledInput
            id="login-email"
            data-testid="login-email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputWrapper>
        <InputWrapper>
          <InputLabel htmlFor="login-password">Password</InputLabel>
          <StyledInput
            id="login-password"
            data-testid="login-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputWrapper>
        {error && <ErrorMessage data-testid="login-error">{error}</ErrorMessage>}
        <SubmitButton type="submit" disabled={loading} data-testid="login-submit">
          {loading ? 'Signing in...' : 'Sign In'}
        </SubmitButton>
      </form>
      <SwitchText>
        Don&apos;t have an account?{' '}
        <Link href="/signup" passHref legacyBehavior>
          <SwitchLink>Create one</SwitchLink>
        </Link>
      </SwitchText>
    </FormCard>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
};

export default LoginForm;
