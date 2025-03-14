import ItemContent from "./ItemContent.jsx";
import { useState } from "react";

function Dashboard(){
	const [items, setItems] = useState([]);
	const [url, setUrl] = useState("");
	const [nickName, setNickName] = useState("");

	const handleClick = async() => {
		const response = await fetch("http://127.0.0.1:8000/scrape", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ url: url }),
		});

		const data = await response.json();
		console.log(data)

		setItems([...items, 
		<ItemContent 
			productName={nickName} 
			productPrice={data.price || undefined} 
			key={items.length}>
		</ItemContent>])

		setUrl("")
		setNickName("")
	}
 

	return(
		<div id="DashboardContainer">
			<div className="Header">Welcome, User</div>
			<div className="MainContent">
				<div className="AddPanel">
					<p className="AddHeader">Add Item</p>
					<label className="AddLabel" htmlFor="URL">URL</label>
					<input className="AddInput" value={url} onChange={e => setUrl(e.target.value)} type="url" />
					<label className="AddLabel"  htmlFor="Nickname">Name</label>
					<input className="AddInput" value={nickName} onChange={e => setNickName(e.target.value)} type="text" />
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