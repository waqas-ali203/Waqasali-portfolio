'use client';
import React from 'react';
import Lottie from 'lottie-react';
import * as animationData from '../public/lotties/animation_lmnww75b.json'; // Ensure this path is correct

export default function Svg() {
	return (
		<div className="w-full h-auto">
			<Lottie animationData={animationData} loop={true} autoplay={true} />
		</div>
	);
}
