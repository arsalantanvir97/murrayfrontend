import React from "react";

const SearchFilter = ({ searchString, setSearchString }) => {
  return (
    <>
      <input
        type="search"
        className="form-control shadow-sm"
        placeholder="Search"
        value={searchString}
        onChange={(e) => {
          setSearchString(e.target.value);
        }}
      />
    </>
  );
};

export default SearchFilter;
