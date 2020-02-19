import React, { useState, useEffect, useRef } from "react";
import "./SideNav.scss";

const mediaQueryLimit = window.matchMedia("(max-width: 992px)");

export const SideNav = (props) => {

  const [sidenav, setSidenav] = useState({
    visible: true,
  })

  const [dropdown, setDropdown] = useState({
    active: false
  })


  let highlightSectionLink = () => {

    let navLinks = document.getElementsByClassName("link");

    let url = window.location.href;
    let urlParts = url.split("/");
    let currentHref = urlParts.pop()


    for (const link of navLinks) {
      link.classList.remove("link__active");
      let linkHref = link.getAttribute("href");
      linkHref = linkHref.replace(/[^\w\s]/gi, '')
      linkHref = linkHref.replace(/\s/g, '');
      currentHref = currentHref.replace(/[^\w\s]/gi, '')
      currentHref = currentHref.replace(/\s/g, '');

      // linkHref.replace(/\\|\//g, '');
     // console.log(`Current link href ${linkHref} && current href ${currentHref}`);
      if (linkHref === currentHref) {

        link.classList += " link__active";
    
      }
    }
  };

  let closeSideMenu = () => {
    setSidenav({
      visible: false
    })

  };

  let openSideMenu = () => {
    setSidenav({
      visible: true
    })

  };

  let toggleDropDown = () => {
    setDropdown({
      active: !dropdown.active
    })

  }

  let mediaQuery = () => {
    if (mediaQueryLimit.matches) {
      /******* MOBILE VIEW *******/
      setDropdown({
        active: true
      })

    } else {
      /******* DESKTOP VIEW *******/
      setDropdown({
        active: false
      })

    }
  }

  useEffect(() => {
    mediaQuery();
    mediaQueryLimit.addListener(mediaQuery);
    highlightSectionLink();

    return () => {
      mediaQueryLimit.removeEventListener(mediaQuery);
    };

  }, [])

  useEffect(() =>{

    highlightSectionLink()

  }, [dropdown.active])



  let childrenWithNewProps = React.Children.map(props.children, child =>
    React.cloneElement(child, { style: "link link__hidden" })
  );



  return (

    <div id="sideNav"
      className={`side-nav ${sidenav.visible ? "side-nav__active" : "side-nav__hidden"}`}
    >
      <a
        onClick={toggleDropDown}
        href="#"
        className={`dropdown`}
      >
        <i className={"fas fa-bars dropdown__icon"}></i>
      </a>


      <a
        href="#"
        onClick={closeSideMenu}
        className={`side-nav__btn-close ${sidenav.visible ? "side-nav__btn-close--active" : "side-nav__btn-close--hidden"}`}
        style={sidenav.visible ? { diplay: "block" } : { diplay: "none" }}
        id="close-button"
      >
        <i className="fas fa-times"></i>
      </a>
      <a
        href="#"
        onClick={openSideMenu}
        style={sidenav.visible ? { diplay: "none" } : { diplay: "block" }}
        className={`side-nav__btn-open ${sidenav.visible ? "side-nav__btn-open--hidden" : "side-nav__btn-open--active"}`}
        id="open-button"
      >
        <i id="open-button-icon" className="fas fa-bars"></i>
      </a>
      {dropdown.active ? childrenWithNewProps : props.children}
    </div>
  );

}

export default SideNav;
