import React from 'react';
import Photo from './Photos';
import NoPhotos from './NoPhotos';
import Loading from './Loading';
import PropTypes from 'prop-types';

const PhotoList = ({photos, showModal, isLoadMore, hasMore, handleLoadMore}) => { 
	let photoList = photos.map((photo, index) => 
		<Photo 
			imageUrl = {photo.src.large} 
			photographer = {photo.photographer}
			key = {index} 
			showModal={showModal}
			index={index}
		/>);

	return(
	<>
		{ photos.length > 0 ? 
		<>
			<ul className="photo-list">
				{ photoList }
			</ul>
			{isLoadMore ? <Loading/> : hasMore && <button className='load-more-btn' onClick={handleLoadMore}>Load More</button>}
		</>
		: 
		<NoPhotos /> 
		}
	</>
	);
}

PhotoList.propTypes = {
	photos: PropTypes.array.isRequired,
	showModal: PropTypes.func.isRequired,
	isLoadMore: PropTypes.bool,
	hasMore: PropTypes.bool,
	handleLoadMore: PropTypes.func
}

export default PhotoList;
