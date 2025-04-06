import React, { useState } from "react";
function ItemContent({productName, productPrice, productLink}){

	const [visible, setVisible] = useState(true);

	

    const handleDelete = async () => {
        // Removes from frontend
        setVisible(false);

        // const response = await fetch("http://127.0.0.1:8000/product/{item_id}", {
        //     // Send information to backend
		// 	method: "DELETE", 
        //     // Tells what kind of data - sending json data, not raw text or anything else
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
            
		// 	body: JSON.stringify({ item_id: item_id }),
		// });
    }

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