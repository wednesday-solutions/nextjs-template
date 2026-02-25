import React from 'react';
import Link from 'next/link';
import { AuthPageWrapper, VisualPanel, FormPanel } from '@components/styled/authLayout';
import MusicVisual from '@components/MusicVisual';
import { FormCard, FormTitle, FormSubtitle, SwitchText, SwitchLink } from '@components/styled/authForm';

const VerifyEmailPage = () => (
  <AuthPageWrapper>
    <VisualPanel>
      <MusicVisual />
    </VisualPanel>
    <FormPanel>
      <FormCard>
        <FormTitle>Check your inbox</FormTitle>
        <FormSubtitle>We sent a verification link to your email. Click the link to activate your account.</FormSubtitle>
        <SwitchText>
          Already verified?{' '}
          <Link href="/login" passHref legacyBehavior>
            <SwitchLink>Sign in</SwitchLink>
          </Link>
        </SwitchText>
      </FormCard>
    </FormPanel>
  </AuthPageWrapper>
);

export default VerifyEmailPage;
