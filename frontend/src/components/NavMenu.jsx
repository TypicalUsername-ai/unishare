import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import './NavMenu.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NavMenu() {

	const navigate = useNavigate();
	const nav = (route) => navigate(route);
	const authorized = useSelector((state) => state.token.authorized);

	return (
		<NavigationMenu.Root className='NavigationMenuRoot' orientation="horizontal">
			<NavigationMenu.List className='NavigationMenuList'>
				<NavigationMenu.Item className='NavigationMenuItem'>
					<button className='NavigationMenuLink' onClick={() => nav("/home")}> Home </button>
				</NavigationMenu.Item>

				{ authorized ? <>
				<NavigationMenu.Item className='NavigationMenuItem'>
					<button className='NavigationMenuLink' onClick={() => nav("/account")}> Account </button>
				</NavigationMenu.Item>
				<NavigationMenu.Item className='NavigationMenuItem'>
					<button className='NavigationMenuLink' onClick={() => nav("/notes")}> My Notes </button>
				</NavigationMenu.Item>
				<NavigationMenu.Item className='NavigationMenuItem'>
					<button className='NavigationMenuLink' onClick={() => nav("/ratings")}> My Ratings </button>
				</NavigationMenu.Item>
				<NavigationMenu.Item className='NavigationMenuItem'>
					<button className='NavigationMenuLink' onClick={() => nav("/upload")}> Upload </button>
				</NavigationMenu.Item>
				<NavigationMenu.Item className='NavigationMenuItem'>
					<button className='NavigationMenuLink' onClick={() => nav("/logout")}> log out </button>
				</NavigationMenu.Item>
				</> : null }

				{!authorized ? <>
				<NavigationMenu.Item className='NavigationMenuItem'>
					<button className='NavigationMenuLink' onClick={() => nav("/register")}> Register </button>
				</NavigationMenu.Item>
				<NavigationMenu.Item className='NavigationMenuItem'>
					<button className='NavigationMenuLink' onClick={() => nav("/login")}>Login </button>
				</NavigationMenu.Item>
				</>
				: null }
				<NavigationMenu.Item className='NavigationMenuItem'>
					<button className='NavigationMenuLink' onClick={() => nav("/tos")}> ToS </button>
				</NavigationMenu.Item>
				<NavigationMenu.Item className='NavigationMenuItem'>
					<button className='NavigationMenuLink' onClick={() => nav("/explore")}> Explore </button>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		</NavigationMenu.Root>
	)
};

export default NavMenu

