import ItemContent from "./ItemContent.jsx";
import { useState } from "react";

function Dashboard(){
	const [items, setItems] = useState([]);

	const handleClick = () => {
		setItems([...items, <ItemContent productName={undefined} productPrice={undefined} key={items.length}></ItemContent>])
	}
 

	return(
		<div id="DashboardContainer">
			<div className="Header">Welcome, User</div>
			<div className="MainContent">
				<div className="AddPanel">
					<p className="AddHeader">Add Item</p>
					<label className="AddLabel" htmlFor="URL">URL</label>
					<input className="AddInput" type="url" />
					<label className="AddLabel"  htmlFor="Nickname">Name</label>
					<input className="AddInput" type="text" />
					<button className="ItemBtn" onClick={handleClick}>Track Item</button>
				</div>
				<div className="VerticalLine"></div>
				<div className="TrackPanel">
					<p className="TrackHeader">Track Item</p>
					{items}
				</div>
			</div>
		</div>
	)
}

export default Dashboard;

Dashboard.defaultProps = {
	
};