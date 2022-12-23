import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const SearchForm = ({searchImages}) => {
    let myRef = useRef();
    
    const handleSubmit = e => {
        e.preventDefault();
        const query = myRef.current.value;
        if( query.trim().length > 0 ) {
          searchImages(query);
          e.currentTarget.reset();
        } else {
          myRef.current.focus();
        }
    }
  
    return (
      <form className="search-form" onSubmit={handleSubmit} >
        <input 
          type="search" 
          name="search" 
          placeholder="Search..." 
          ref={myRef}  
        />
        <button type="submit" id="submit" className="search-button"><i className="material-icons icon-search">search</i></button>
      </form>      
    );
}

SearchForm.propTypes = {
  searchImages: PropTypes.func.isRequired
}


export default SearchForm;