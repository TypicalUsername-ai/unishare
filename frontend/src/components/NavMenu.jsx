import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import './NavMenu.css'

function NavMenu() {
	return (
		<NavigationMenu.Root className='NavigationMenuRoot' orientation="horizontal">
			<NavigationMenu.List className='NavigationMenuList'>
				<NavigationMenu.Item className='NavigationMenuItem'>
					<NavigationMenu.Link className='NavigationMenuLink' href='/app/home'> Home </NavigationMenu.Link>
				</NavigationMenu.Item>

				<NavigationMenu.Item className='NavigationMenuItem'>
					<NavigationMenu.Link className='NavigationMenuLink' href='/app/account'> Account </NavigationMenu.Link>
				</NavigationMenu.Item>

				<NavigationMenu.Item className='NavigationMenuItem'>
					<NavigationMenu.Link className='NavigationMenuLink' href='/app/register'> Register </NavigationMenu.Link>
				</NavigationMenu.Item>
				<NavigationMenu.Item className='NavigationMenuItem'>
					<NavigationMenu.Link className='NavigationMenuLink' href='/app/login'> Login </NavigationMenu.Link>
				</NavigationMenu.Item>
				<NavigationMenu.Item className='NavigationMenuItem'>
					<NavigationMenu.Link className='NavigationMenuLink' href='/app/tos'> ToS </NavigationMenu.Link>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		</NavigationMenu.Root>
	)
};

export default NavMenu

