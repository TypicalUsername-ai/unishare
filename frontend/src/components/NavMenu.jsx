import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import './NavMenu.css'
import { useNavigate } from 'react-router-dom';

function NavMenu() {

	const navigate = useNavigate();
	const nav = (route) => navigate(route);

	return (
		<NavigationMenu.Root className='NavigationMenuRoot' orientation="horizontal">
			<NavigationMenu.List className='NavigationMenuList'>
				<NavigationMenu.Item className='NavigationMenuItem'>
					<button className='NavigationMenuLink' onClick={() => nav("/home")}> Home </button>
				</NavigationMenu.Item>

				<NavigationMenu.Item className='NavigationMenuItem'>
					<button className='NavigationMenuLink' onClick={() => nav("/account")}> Account </button>
				</NavigationMenu.Item>

				<NavigationMenu.Item className='NavigationMenuItem'>
					<button className='NavigationMenuLink' onClick={() => nav("/register")}> Register </button>
				</NavigationMenu.Item>
				<NavigationMenu.Item className='NavigationMenuItem'>
					<button className='NavigationMenuLink' onClick={() => nav("/login")}>Login </button>
				</NavigationMenu.Item>
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

