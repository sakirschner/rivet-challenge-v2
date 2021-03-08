import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

import './ScrollToTop.css';

export const ScrollToTop = () => {
	const [scrollPosition, setScrollPosition] = useState(0);

	useEffect(() => {
		window.addEventListener('scroll', handleScrollPosition, {
			passive: true
		});

		return () => {
			window.removeEventListener('scroll', handleScrollPosition);
		};
	}, []);

	const handleScrollPosition = () => {
		const position = window.pageYOffset;
		setScrollPosition(position);
	};

	const handleScroll = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<>
			{scrollPosition >= 500 ? (
				<button className='scroll fade-in' onClick={handleScroll}>
					<FontAwesomeIcon icon={faArrowUp} className='pencil-icon' />
				</button>
			) : null}
		</>
	);
};
