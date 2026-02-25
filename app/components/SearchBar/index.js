import React from 'react';
import PropTypes from 'prop-types';
import { SearchContainer, SearchInput } from '@components/styled/musicSearch';

const SearchBar = ({ value, onChange, loading }) => (
  <SearchContainer>
    <SearchInput
      data-testid="music-search-input"
      type="text"
      placeholder="Search songs, artists..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={loading}
    />
  </SearchContainer>
);

SearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default SearchBar;
