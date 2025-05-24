import ItemContent from "./ItemContent.jsx";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase.js";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [url, setUrl] = useState("");
  const [nickName, setNickName] = useState("");
  const [isScraping, setIsScraping] = useState(false);
  const uid = auth.currentUser.uid;
  const userEmail = auth.currentUser.email;

  // === Fetch Data Section === BEGIN
  useEffect(() => {
    getItems();
    console.log("Loading Previous Items");

    const intervalCheck = setInterval(() => {
      //Runs every hour; a special function that doesnt need to be called.
      console.log("Checking Updates...");
      getItems();
    }, 3600000);

    return () => clearInterval(intervalCheck); //Cleanup to prevent double interval calling - for example
  }, []);

  const getItems = async () => {
    //Function gets items from db first
    const res = await fetch(`http://127.0.0.1:8000/get_products?uid=${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    setItems(
      data.map((product, index) => {
        //Dont need spread operator because this will be initial array
        return (
          <ItemContent //No spread operator so no dupes will called again by setInterval function
            productName={product.nickname}
            productPrice={product.price || undefined}
            productLink={product.link}
            key={product._id}
            productId={product._id}
          ></ItemContent>
        );
      }),
    );
  };
  // === Fetch Data Section === END

  // === Item Management Section === BEGIN
  const handleAddItem = async () => {
    setIsScraping(true);

    const response = await fetch("http://127.0.0.1:8000/scrape", {
      // Send information to backend
      method: "POST", // Tells what kind of data - sending json data, not raw text or anything else
      headers: {
        "Content-Type": "application/json",
      },
      // The json object thats sent and converted to string
      // The key must match the models.py
      body: JSON.stringify({
        url: url,
        uid: uid,
        nickname: nickName,
        userEmail: userEmail,
      }),
    });

    if (response.ok) {
      //If response went well
      const data = await response.json();
      setItems([
        ...items, // Add the newly scraped data to the array
        <ItemContent
          productName={data.nickname || "Error Name"}
          productPrice={data.price || "Error Price"}
          productLink={data.link || "Error Link"}
          key={data._id}
          productId={data._id}
        ></ItemContent>,
      ]);
      console.log("Response was Good");
    } else {
      //If response went bad
      const fallbackKey = `error-${Date.now()}`;
      setItems([
        ...items,
        <ItemContent
          productName={"Error Name"}
          productPrice={"Error Price"}
          productLink={undefined}
          key={fallbackKey}
          productId={fallbackKey}
        ></ItemContent>,
      ]);
      console.log("Response was bad");
    }

    setUrl("");
    setNickName("");
    setIsScraping(false);
  };
  // === Item Management Section === END

  // === User Authentication Section === BEGIN
  const handleSignOut = () => {
    signOut(auth);
  };
  // === User Authentication Section === END

  return (
    <div className="flex h-screen w-screen flex-col border-2 border-solid border-black bg-[#eef4fa]">
      <div className="mt-4 flex flex-row items-center justify-center border-2 border-dotted border-black text-4xl font-bold">
        <span className="">Welcome, User</span>
        <button
          className="absolute right-4 cursor-pointer rounded-xl border-2 border-solid border-black p-1 text-sm transition duration-300 ease-in hover:bg-amber-300"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
      <div className="mt-4 flex grow justify-evenly border-2 border-dotted border-black">
        <div className="AddPanel flex flex-1 flex-col bg-[#d0f0fd] pt-4 pr-4 pl-4">
          <p className="self-center pb-12 text-4xl font-bold">Add Item</p>
          <label className="text-3xl" htmlFor="URL">
            URL
          </label>
          <input
            className="mt-[5px] mb-[5px] h-[30px] rounded-xl border-2 border-solid border-black"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="url"
          />
          <label className="text-3xl" htmlFor="Nickname">
            Name
          </label>
          <input
            className="mt-[5px] mb-[5px] h-[30px] rounded-xl border-2 border-solid border-black"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            type="text"
          />
          <button
            className="ItemBtn mt-[10px] h-8 w-25 cursor-pointer self-center rounded-xl border-2 border-solid border-black font-bold"
            onClick={handleAddItem}
          >
            Track Item
          </button>
          {/* Code to show scraping to keep user notified */}
          <p className="mt-[10px] self-center text-4xl font-bold">
            {isScraping && "Scraping..."}
          </p>
        </div>
        <div className="w-[3px] bg-black"></div>
        <div className="flex flex-1 flex-col bg-[#c7f9e9] pt-[1rem] text-[1.5rem]">
          <p className="TrackHeader self-center pb-[3rem] text-[2.5rem] font-bold">
            Track Item
          </p>
          {items}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

Dashboard.defaultProps = {};
