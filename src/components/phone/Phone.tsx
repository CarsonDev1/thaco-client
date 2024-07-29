import React from 'react';
import styles from './Phone.module.css';
import { FaPhoneAlt } from 'react-icons/fa';

const Phone = () => {
	return (
		<div className={styles.phone}>
			<FaPhoneAlt />
		</div>
	);
};

export default Phone;
