import React, { useEffect } from "react";
import avatar from "../assets/ayoub.jpeg";
import "../assets/NavBar.css";
function NavBar() {
	useEffect(() => {
		const id = window.location.pathname;
		console.log(id);
		if (id === "/") {
			document.getElementById("Todo").style.backgroundColor = "teal";
		} else {
			document.getElementById(`${id}`).style.backgroundColor = "teal";
		}
	}, []);

	const links = ["Todo", "Chat", "About", "ContactUs"];
	return (
		<nav className="nav">
			<h3 className="nav__title">
				ToDo <span>List</span>
			</h3>

			<ul className="nav__list">
				{links.map((link) => {
					return (
						<li id={`/${link}`}>
							<a href={`/${link}`}>{link}</a>
						</li>
					);
				})}
			</ul>
			<img src={avatar} width="40px" />
		</nav>
	);
}

export default NavBar;
