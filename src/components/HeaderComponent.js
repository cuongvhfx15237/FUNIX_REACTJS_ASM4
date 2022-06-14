import {  useState } from 'react'
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header(){
    const [isNavOpen, setiNavOpen]= useState(false);
    function toggleNav(){
        setiNavOpen(!isNavOpen);
    }

        return(
            <div className="container-fluid">
                <Navbar dark expand="md" style={{margin: 0 + 'em', backgroundColor: 'Dodgerblue'}}>
                        <NavbarToggler onClick={toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">
                            <img src='assets/images/logo.png' height="50px" width="50px" alt='LogoIcon' />
                            </NavbarBrand>
                        <Collapse isOpen={isNavOpen} navbar>
                            <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link"  to='/Nhanvien'>
                                    <img src="assets/images/public.png" alt="NVIcon" height="20px" width="20px"/>
                                    <span className="fa fa-home fa-lg" style={{fontSize:'20px'}}>Nhân viên</span>
                                    
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/PhongBan'>
                                <img src="assets/images/Department.png" alt="PBIcon" height="20px" width="20px"/>
                                    <span className="fa fa-info fa-lg" style={{fontSize:'20px'}}>Phòng Ban</span> 
                                    
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='/BangLuong'>
                                <img src="assets/images/money.png" alt="LuongIcon" height="20px" width="20px"/>
                                    <span className="fa fa-list fa-lg" style={{fontSize:'20px'}}>Bảng Lương</span> 
                                    
                                    </NavLink>
                            </NavItem>
                            </Nav>
                        </Collapse>
                       
                </Navbar>
            </div>
        );}
export default Header;