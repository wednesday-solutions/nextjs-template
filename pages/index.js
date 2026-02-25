import React from 'react';
import Music from '@app/containers/Music';
import withAuth from '@utils/withAuth';

const HomePage = () => <Music />;

export default withAuth(HomePage);
