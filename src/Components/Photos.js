import React from 'react';
import PropTypes from 'prop-types';

const Photos = ({imageUrl, showModal, index, photographer}) => (
  <li className="photo-wrap">
    <img src={imageUrl} alt='' onClick={()=>showModal(imageUrl, index, photographer)}/>
  </li>
);

Photos.propTypes = {
  imageUrl: PropTypes.string.isRequired, 
  showModal: PropTypes.func.isRequired, 
  index: PropTypes.number.isRequired, 
  photographer: PropTypes.string
}

export default Photos;