import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function LoadingToRedirect({ path }) {
	const history = useHistory();
	const [count, setCount] = useState(5);

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((currentCount) => --currentCount);
		}, 1000);

		// redirect once count is equal to zero
		count === 0 && history.push(path);

		// cleanup
		return () => clearInterval(interval);
	}, [count]);

	return (
		<div className='my-10 py-10 flex justify-center items-center'>
			<p className='text-xl'>Redirecting you in {count} seconds</p>
		</div>
	);
}

export default LoadingToRedirect;
