import React from 'react';
import ReactDOM from 'react-dom';
import '../scss/styles.scss';
import Loading from './Loading';
import PropTypes from 'prop-types';

const Modal = ({clickedImg, isOpened, hideModal, showImgPrev, showImgNext, currImgIndex, photographer}) => {
    console.log('imgsrc:', clickedImg);

    return ReactDOM.createPortal(
    <>
        <div className={`overlay ${isOpened ? '' : 'hidden'}`}>
            <span className="close-btn btn" onClick={hideModal} >&times;</span>
            { clickedImg == null ? <Loading />
            :<div className='modal'>
                <div className='modal-container'>
                    <img src={clickedImg} alt='bigger_picture' />
                    <span className="prev-btn btn-arrow btn" onClick={() => showImgPrev(currImgIndex)} >&#8249;</span>
                    <span className="next-btn btn-arrow btn" onClick={() => showImgNext(currImgIndex)} >&#8250;</span>
                </div>
                <div className='photographer modal-info'>
                    <h2>Photographer:</h2>
                    <p>{photographer}</p>
                </div>
            </div>}
        </div>
    </>,
    document.getElementById('portal')
    )
}

Modal.propTypes = {
    clickedImg: PropTypes.string.isRequired,
    isOpened: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
    showImgPrev: PropTypes.func.isRequired,
    showImgNext: PropTypes.func.isRequired,
    currImgIndex: PropTypes.number.isRequired, 
    photographer: PropTypes.string.isRequired
}

export default Modal;