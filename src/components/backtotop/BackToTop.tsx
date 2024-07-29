'use client';
import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa6';
import styles from './BackToTop.module.css';

const BackToTop: React.FC = () => {
	const [visible, setVisible] = useState(false);

	const toggleVisibility = () => {
		if (window.pageYOffset > 300) {
			setVisible(true);
		} else {
			setVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility);
		return () => window.removeEventListener('scroll', toggleVisibility);
	}, []);

	return (
		<button type='button' onClick={scrollToTop} className={`${styles.backToTop} ${visible ? styles.visible : ''}`}>
			<FaArrowUp />
		</button>
	);
};

export default BackToTop;
