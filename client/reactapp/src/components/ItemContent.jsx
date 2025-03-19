function ItemContent({productName, productPrice}){
	return(
		<div className="ItemContainer">
			<div className="FirstItem">
				<span className="">{productName}</span>
				<button className="DeleteBtn absolute right-5">Delete</button>
			</div>
			{/* <span className="ItemName">{productName}</span>
			<span className="ItemName">Delete Item</span> */}
			<a href="" className="underline self-center text-black">Direct to Link</a>
			<p className="self-center">Price: {productPrice}</p>
		</div>
	)
}

export default ItemContent;

ItemContent.defaultProps = {
	productName: "Name",
	productPrice: "$0.00"
};