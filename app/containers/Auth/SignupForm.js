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

const SignupForm = ({ onSubmit, loading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <FormCard>
      <FormTitle>Join the beat</FormTitle>
      <FormSubtitle>Create your account and start listening</FormSubtitle>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <InputLabel htmlFor="signup-email">Email</InputLabel>
          <StyledInput
            id="signup-email"
            data-testid="signup-email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputWrapper>
        <InputWrapper>
          <InputLabel htmlFor="signup-password">Password</InputLabel>
          <StyledInput
            id="signup-password"
            data-testid="signup-password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputWrapper>
        {error && <ErrorMessage data-testid="signup-error">{error}</ErrorMessage>}
        <SubmitButton type="submit" disabled={loading} data-testid="signup-submit">
          {loading ? 'Creating account...' : 'Create Account'}
        </SubmitButton>
      </form>
      <SwitchText>
        Already have an account?{' '}
        <Link href="/login" passHref legacyBehavior>
          <SwitchLink>Sign in</SwitchLink>
        </Link>
      </SwitchText>
    </FormCard>
  );
};

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
};

export default SignupForm;
