import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PopularCardProps {
	src: string;
}

export function PopularCard({ src }: PopularCardProps) {
	return (
		<Link href=''>
			<div className='w-full border border-white shadow-sm rounded-md'>
				<Image src={src} alt='jordans' height='200' width='400' className='object-cover max-h-[200px] w-full' />
			</div>
		</Link>
	);
}
