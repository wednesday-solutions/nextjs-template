import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { NavLinkStyled } from '@components/styled/navLink';

const NavLink = ({ href, label, isActive }) => (
  <Link href={href} passHref legacyBehavior>
    <NavLinkStyled data-testid={`nav-${label.toLowerCase()}`} isActive={isActive}>
      {label}
    </NavLinkStyled>
  </Link>
);

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool
};

export default NavLink;
