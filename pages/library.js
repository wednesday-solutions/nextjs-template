import React from 'react';
import Library from '@app/containers/Library';
import withAuth from '@utils/withAuth';

const LibraryPage = () => <Library />;

export default withAuth(LibraryPage);
