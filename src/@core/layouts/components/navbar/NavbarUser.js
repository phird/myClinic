// ** Dropdowns Imports
import UserDropdown from './UserDropdown'

// ** Third Party Components
import { Sun, Moon } from 'react-feather'

// ** Reactstrap Imports
import { NavItem, NavLink } from 'reactstrap'

const NavbarUser = props => {
  // ** Props
  const { skin, setSkin } = props

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  return (
    <ul className='nav navbar-nav align-items-center ms-auto'>
      <NavItem className='d-none d-lg-block d-flex align-items-start'>
        <NavLink className='nav-link-style'>
          <ThemeToggler />
        </NavLink>
      </NavItem>
      
      <UserDropdown />
    </ul>
  )
}
export default NavbarUser
