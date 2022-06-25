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
                        <i class="fa fa-heartbeat" aria-hidden="true" style={{fontSize:"2em", color:"red"}}></i>
                            </NavbarBrand>
                        <Collapse isOpen={isNavOpen} navbar>
                            <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link"  to='/Nhanvien'>
                                <i class="fa fa-id-card-o" aria-hidden="true" style={{fontSize:"1.2em"}}></i>
                                    <span style={{fontSize:'15px'}}>  Nhân viên</span>
                                    
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/PhongBan'>
                                <i class="fa fa-user-circle-o" aria-hidden="true" style={{fontSize:"1.2em"}}></i>
                                    <span style={{fontSize:'15px'}}>  Phòng Ban</span> 
                                    
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='/BangLuong'>
                                <i class="fa fa-money" aria-hidden="true" style={{fontSize:"1.2em"}}></i>
                                    <span style={{fontSize:'15px'}}>  Bảng Lương</span> 
                                    
                                    </NavLink>
                            </NavItem>
                            </Nav>
                        </Collapse>
                       
                </Navbar>
            </div>
        );}
export default Header;