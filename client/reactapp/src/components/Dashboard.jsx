import ItemContent from "./ItemContent";

function Dashboard(){
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
					<button className="ItemBtn">Track Item</button>
				</div>
				<div className="VerticalLine"></div>
				<div className="TrackPanel">
					<p className="TrackHeader">Track Item</p>
					<ItemContent></ItemContent>
				</div>
			</div>
		</div>
	)
}

export default Dashboard;