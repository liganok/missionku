import React from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import {Container, Row, Col} from 'reactstrap';


export default class Navbar_new extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Col sm="12" md={{ size: 10, offset: 1 }}>
        <Navbar color="faded" light toggleable >
          <NavbarToggler right onClick={this.toggle}/>
          <NavbarBrand  href="/">MissionKu</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto " navbar>
              <NavItem>
                <NavLink href="/Inbox/">Inbox</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/Tasks/">Tasks</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/Plans/">Plans</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/Trash/">Trash</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </Col>
    );
  }
}