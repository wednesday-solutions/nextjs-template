import React from 'react';
import TrackDetail from '@app/containers/TrackDetail';
import withAuth from '@utils/withAuth';

const TrackDetailPage = () => <TrackDetail />;

export default withAuth(TrackDetailPage);
