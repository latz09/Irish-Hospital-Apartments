const SectionHeading = ({ heading, className = 'text-light' }) => {
	return <h2 className={`max-w-[59rem] ${className}`}>{heading}</h2>;
};

export default SectionHeading;