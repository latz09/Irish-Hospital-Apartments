const HeadingWithDescription = ({ heading, description, className = 'text-light' }) => {
	const paragraphs = Array.isArray(description) ? description : [description];

	return (
		<div className='grid lg:grid-cols-3 gap-1.25 lg:gap-2.25'>
			<h5 className={className}>{heading}</h5>
			<div className='col-span-2 flex flex-col gap-1'>
				{paragraphs.map((paragraph, index) => (
					<p key={index} className={`text-paragraph ${className}`}>
						{paragraph}
					</p>
				))}
			</div>
		</div>
	);
};

export default HeadingWithDescription;