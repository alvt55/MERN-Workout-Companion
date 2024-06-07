
import { Link, Outlet } from 'react-router-dom';
import { NavLink, Group } from '@mantine/core';
import { ActionIcon, Flex} from '@mantine/core';





export default function Navbar(props) {


    return (
        <div className="navbar-container">



            <h1>Fitness</h1>

            <Flex justify="flex-end" gap="s">


            <NavLink href="/" label="Tracker" size="1rem"></NavLink>
            <NavLink href="/search" label="Search"></NavLink>

            <ActionIcon
                onClick={props.toggleTheme}
                variant="default"
                size="lg"
                aria-label="Toggle color scheme">
            </ActionIcon>
            </Flex>



            <Outlet></Outlet>


        </div>
    )
}