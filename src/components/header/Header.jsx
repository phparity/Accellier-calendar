import { Link } from 'react-router-dom'


import MenuIcon from '../../../public/images/menu-icon.svg'
import LogoImg from '../../../public/images/brand-logo.png'
import SearchIcon from '../../../public/images/blue-search-icon.svg'
import BellIcon from '../../../public/images/bell-icon.svg'
import ProfileImg from '../../../public/images/profile-img.png'
import ArrowIcon from '../../../public/images/down-arrow.svg'

import './Header.scss'
import HeaderInput from './HeaderInput'

function Header() {
    return (
        <header className='header_main'>
            <div className='wrapper'>
                <div className='logo_search_menu'>
                    <div className='logo_menu'>
                        <button className='menu_otr'>
                            <img className='menu_icon' src={MenuIcon} alt='icon'/>
                        </button>
                        <Link to="/" className='logo_otr'>
                            <img className='logo_img' src={LogoImg} alt='logo'/>
                        </Link>
                    </div>
                    <div className='search_otr'>
                        <img className='search_icon' src={SearchIcon} alt='icon' />
                        {/* <Input
                            inputClass="search_input"
                            inputType="search"
                            inputName="search"
                            inputPlaceholder="Search for..."
                        /> */}
                        <HeaderInput/>  
                    </div>
                </div>
                <div className='notification_profile'>
                    <div className='notification_otr'>
                        <span className='circle'></span>
                        <img className='bell_icon' src={BellIcon} alt='icon'/>
                    </div>
                    <div className='profile_otr'>
                        <img className='profile_img' src={ProfileImg} alt='img' />
                        <div className='text_arrow'>
                            <p className='profile_text'>
                                Anna Sthesia
                            </p>
                            <img className='arrow_down' src={ArrowIcon} alt='icon'/>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
