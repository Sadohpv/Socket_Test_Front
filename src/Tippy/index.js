import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/translucent.css";

function TippyCustom({ children, content, place,offSet }) {

	return (
		<Tippy  content={content}  placement={place} offset={offSet} arrow={false}>
			{children}
		</Tippy>
	);
}

export default TippyCustom;
