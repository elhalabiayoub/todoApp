import React, { useState, useEffect } from "react";
import avatar from "../assets/ayoub.jpeg";
import "../assets/NavBar.css";
import { Link } from "react-router-dom";
function NavBar() {
	const [links, setLinks] = useState([
		{
			name: "Todo",
			active: false,
		},
		{
			name: "Chat",
			active: false,
		},
		{
			name: "About",
			active: false,
		},
		{
			name: "ContactUs",
			active: false,
		},
	]);
	useEffect(() => {
		var path = window.location.pathname;
		if (path === "/") {
			path = "/Todo";
		}
		document.getElementById(`${path}`).classList.add("nav__active");
	}, []);

	const changeColor = (name) => {
		links.forEach((link) => {
			var li = document.getElementById(`/${link.name}`);
			if (link.name === name) {
				link.active = true;
				li.classList.add("nav__active");
			} else {
				link.active = false;
				li.classList.remove("nav__active");
			}
		});
		setLinks(links);

		console.log(links);
	};
	return (
		<nav className="nav">
			<h3 className="nav__title">
				ToDo <span>List</span>
			</h3>

			<ul className="nav__list">
				{links.map((link) => {
					return (
						<li id={`/${link.name}`}>
							<Link
								onClick={changeColor.bind(this, link.name)}
								to={`/${link.name}`}
							>
								{link.name}
							</Link>
						</li>
					);
				})}
			</ul>
			<img src={avatar} width="40px" />
		</nav>
	);
}

export default NavBar;
