import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import './Modal.css';

export const Modal = ({ children, showModal, onClickClose }) => {
	const handleModalClose = (e) => {
		onClickClose(e);
	};

	return (
		<>
			<div className={showModal ? 'mask active' : 'mask'}></div>
			<div className='modal-control'>
				<button className='close' onClick={handleModalClose}>
					<FontAwesomeIcon icon={faTimesCircle} />
				</button>
				{children}
			</div>
		</>
	);
};
