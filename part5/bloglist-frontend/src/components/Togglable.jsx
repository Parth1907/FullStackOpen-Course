import {useState} from "react";
import PropTypes from "prop-types";

export default function Togglable({children, buttonLabel}) {
	const [visible, setVisisble] = useState(false);

	const hideWhenVisible = {display: visible ? "none" : ""};
	const showWhenVisisble = {display: visible ? "" : "none"};

	const toggleVisibility = () => {
		setVisisble(!visible);
	};

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{buttonLabel} </button>
			</div>
			<div style={showWhenVisisble}>
				{children}
				<button onClick={toggleVisibility}>cancel</button>
			</div>
		</div>
	);
}

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
};
