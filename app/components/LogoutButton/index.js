import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import Router from 'next/router';
import { clearStoredToken } from '@utils/authStorage';
import { LogoutBtn } from '@components/styled/logoutButton';

const handleLogout = () => {
  clearStoredToken();
  Router.push('/login');
};

const LogoutButton = () => (
  <LogoutBtn data-testid="logout-button" onClick={handleLogout} aria-label="Log out">
    <LogoutOutlined />
  </LogoutBtn>
);

export default LogoutButton;
