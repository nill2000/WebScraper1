import React, { useState } from "react";
function ItemContent({productName, productPrice}){

	const [visible, setVisible] = useState(true);

	if(!visible){
		return null;
	}

	return(
		<div className="ItemContainer">
			<div className="FirstItem">
				<span className="">{productName}</span>
				<button 
					className="DeleteBtn absolute right-5" 
					onClick={() => setVisible(false)}>
					Delete
				</button>
			</div>
			<a 
				href="" 
				className="underline self-center text-black">
				Direct to Link
			</a>
			<p className="self-center">Price: {productPrice}</p>
		</div>
	)
}

export default ItemContent;

ItemContent.defaultProps = {
	productName: "Name",
	productPrice: "$0.00"
};