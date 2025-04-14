import ItemContent from "./ItemContent.jsx";
import { useEffect, useState } from "react";
import {signOut} from "firebase/auth";
import {auth} from "../Firebase.js";

function Dashboard(){
	const [items, setItems] = useState([]);
	const [url, setUrl] = useState("");
	const [nickName, setNickName] = useState("");
	const [isScraping, setIsScraping] = useState(false)
	const uid = auth.currentUser.uid;

	useEffect(() => {
		const getItems = async () => {
			const res = await fetch(`http://127.0.0.1:8000/get_products?uid=${uid}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			});

			const data = await res.json();

			console.log(data)

			setItems(data.map((product, index) => { //Dont need spread operator because this will be initial array
				return(
					<ItemContent 
						productName={product.nickname} 
						productPrice={product.price || undefined} 
						productLink={product.link}
						key={product.id}
						productId={product.id}>
					</ItemContent>
				)
				
			}))
		};
		getItems();
		console.log("Loading Previous Items")
	}, []);

	// Buttons that scrapes data from backend
	const handleClick = async() => {

		setIsScraping(true)
		
		const response = await fetch("http://127.0.0.1:8000/scrape", {
            // Send information to backend
			method: "POST", 
            // Tells what kind of data - sending json data, not raw text or anything else
			headers: {
				'Content-Type': 'application/json'
			},
            // The json object thats sent and converted to string
            // The key must match the models.py
			body: JSON.stringify({ url: url, uid: uid, nickname: nickName }),
		});

		const data = await response.json();
		console.log(data.id)

		// Add the newly scraped data to the array
		setItems([...items, 
		<ItemContent 
			productName={data.nickname} 
			productPrice={data.price || undefined} 
			productLink={data.link}
			key={data.id}
			productId={data.id}>
		</ItemContent>])

		setUrl("")
		setNickName("")
		setIsScraping(false)
	}

	// Buttons had signs user out
	const handleSignOut = () => {
		signOut(auth);
	}
 

	return(
		<div id="DashboardContainer">
			<div className="Header">
				<span className="HeaderIntro">Welcome, User</span>
				<button className="signOutBtn" onClick={handleSignOut}>Sign Out</button>
			</div>
			<div className="MainContent">
				<div className="AddPanel">
					<p className="AddHeader">Add Item</p>
					<label 
						className="AddLabel"
						htmlFor="URL">
						URL
					</label>
					<input 
						className="AddInput" 
						value={url} 
						onChange={e => setUrl(e.target.value)} 
						type="url" 
					/>
					<label 
						className="AddLabel"  
						htmlFor="Nickname">
						Name
					</label>
					<input 
						className="AddInput" 
						value={nickName} 
						onChange={e => setNickName(e.target.value)} 
						type="text" 
					/>
					<button 
						className="ItemBtn" 
						onClick={handleClick}>
						Track Item
					</button>
					{/* Code to show scraping to keep user notified */}
					<p className="scrapeMsg">{isScraping && "Scraping..."}</p>
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