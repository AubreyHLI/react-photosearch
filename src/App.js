/* use async/await */
import React, { useState, useEffect} from 'react';
import SearchForm from './Components/SearchForm';
import PhotoList from './Components/PhotoList';
import Modal from './Components/Modal';
import Loading from './Components/Loading';

const App = () => {
    let [photos, setPhotos] = useState([]);
    let [isLoading, setIsLoading] = useState(true);
	let [isLoadMore, setLoadMore] = useState(false);
	let [hasMore, setHasMore] = useState(false);
	let [baseUrl, setBaseUrl] = useState('https://api.pexels.com/v1/curated?&per_page=18');
	let [pageIndex, setPageIndex] = useState(1);	
	let [clickedImg, setClickedImg] = useState(null);
	let [currImgIndex, setCurrImgIndex] = useState(null);
	let [photographer, setPhotographer] = useState(null);
	let [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
		let canceled = false;

		const fetchImages = async () => {
			const response = await fetch( `${baseUrl}&page=${pageIndex}`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					Authorization: '563492ad6f9170000100000108248effbed34c6e9446fc0c038e10c6'
				}
			}); 
			const responseData = await response.json();  

			if (!canceled) { // Canceling previous click fetches
				if(isLoading || isLoadMore) {
					setPhotos(prevPhotos => pageIndex === 1 ? responseData.photos :[...prevPhotos, ...responseData.photos]);
					setIsLoading(false);
					setLoadMore(false);
					setHasMore(responseData.photos.length > 0);
				} 
			}
		}

		// call the fetching function
		fetchImages()
			.catch(error => console.log('Error fetching and parsing data', error));
		
		// cleanup, cancel any future 'setPhotos'
		return () => canceled = false;
    }, [baseUrl, pageIndex]);


	const handleSearchImages = (query) => {
		setPageIndex(1);
		setBaseUrl(`https://api.pexels.com/v1/search?query=${query}&per_page=18`); 
		setIsLoading(true);
		setHasMore(false);        
	}

	const handleLoadMore = () => {
		setLoadMore(true);
		setPageIndex( prevPage => prevPage + 1);
	}

	const handleHideModal = () => {
		setIsOpened(false);
		setClickedImg(null);
		document.body.style.overflow = 'unset';
	}

	const handleShowModal = (imgUrl, imgIndex, pho) => {
		setIsOpened(true);
		setClickedImg(imgUrl);
		setCurrImgIndex(imgIndex);
		setPhotographer(pho);
		document.body.style.overflow = 'hidden';
	}

	const handleShowImgPrev = (imgIndex) => {
		if(imgIndex > 0) {
			const target = imgIndex - 1;
			setClickedImg(photos[target].src.large);
			setPhotographer(photos[target].photographer);
			setCurrImgIndex(target);
		}
	}

	const handleShowImgNext = (imgIndex) => {
		if(imgIndex < photos.length - 1) {
			const target = imgIndex + 1;
			setClickedImg(photos[target].src.large);
			setPhotographer(photos[target].photographer);
			setCurrImgIndex(target);
		}
	}

    return (
      <>
        <div className="main-header">
			<div className="inner">
				<h1 className="main-title">PhotoSearch</h1>
				<SearchForm searchImages={handleSearchImages} />      
			</div>   
        </div> 
		<div className='main-content'>
			<div className='inner'>
				{ isLoading ? <Loading/> : <PhotoList photos={photos} 
					showModal={handleShowModal} 
					hasMore={hasMore}
					isLoadMore={isLoadMore}
					handleLoadMore={handleLoadMore} /> 
				}
			</div>
		</div>  
		<Modal
			clickedImg={clickedImg}
			currImgIndex={currImgIndex}
			photographer={photographer}
			isOpened={isOpened} 
			hideModal={handleHideModal}
			showImgPrev={handleShowImgPrev}
			showImgNext={handleShowImgNext}
		/> 
      </>
    );
}

export default App;