function ItemContent({productName, productPrice}){
	return(
		<div className="ItemContainer">
			<p className="ItemName">{productName}</p>
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