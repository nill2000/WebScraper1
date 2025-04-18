import React, { useState } from "react";
function ItemContent({productName, productPrice, productLink, productId}){

	const [visible, setVisible] = useState(true);
	
    const handleDelete = async () => {
        setVisible(false); // Removes from frontend
		console.log(productId);
        const response = await fetch(`http://127.0.0.1:8000/product_delete/${productId}`, { // Place the id into the path params for backend
		// productId is saved from the parent code and attaches itself with productID
			method: "DELETE", // Send information to backend
			headers: { // Tells what kind of data - sending json data, not raw text or anything else
				'Content-Type': 'application/json'
			}
		});

		if (response.ok){
			console.log("Item deleted");
		} else{
			console.log("Error Deleting Item")
		}
    }

	// Ternary operator for visible. If true, show contents; else show null
	return(
		visible ? (<div className="ItemContainer">
			<div className="FirstItem">
				<span className="">{productName}</span>
				<button 
					className="DeleteBtn absolute right-5" 
                    onClick={() => handleDelete()}>
					Delete
				</button>
			</div>
			<a 
				href={productLink} 
				className="underline self-center text-black">
				Direct to Link
			</a>
			<p className="self-center">Price: {productPrice}</p>
		</div>
	): null
)
}

export default ItemContent;

ItemContent.defaultProps = {
	productName: "Name",
	productPrice: "$0.00"
};