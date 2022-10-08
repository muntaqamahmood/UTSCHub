import React from "react";
import * as TbIcons from "react-icons/tb";
import * as CgIcons from "react-icons/cg";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";

export const SidebarData = [
{
	title: "Profile",
	path: "/Dashboard",
	icon: <CgIcons.CgProfile />,
},
{
	title: "Events",
	path: "/events",
	icon: <MdIcons.MdEvent />,
},
{
	title: "Market",
	path: "/market",
	icon: <AiIcons.AiFillShopping />,
},
{
	title: "Messgae",
	path: "/message",
	icon: <TbIcons.TbMessageCircle />,
},
];

