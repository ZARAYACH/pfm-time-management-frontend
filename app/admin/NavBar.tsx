"use client"
import {Menu, MenuItem, Sidebar, sidebarClasses, SubMenu} from "react-pro-sidebar";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faBook,
  faChevronLeft,
  faChevronRight,
  faFileAlt,
  faFlask,
  faHome,
  faReceipt,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {Text} from "@radix-ui/themes";
import {faSchool} from "@fortawesome/free-solid-svg-icons/faSchool";

const NavBar = () => {

  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);
  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };
  return <Sidebar width="288px" collapsed={collapsed}
                  className={`w-full h-full duration-300 overflow-hidden h-screen shadow-sm`}
                  rootStyles={{
                    [`.${sidebarClasses.container}`]: {
                      backgroundColor: 'white',
                    },
                  }}
  >
    <Menu
      menuItemStyles={{
        SubMenuExpandIcon: {
          height: 30,
        },
        button: {
          ":hover": {
            background: 'var(--accent-a3)'
          },
          height: 40,
          borderRadius: 12,
          marginInline: 8,
          marginBlock: 6,
        },
      }}
    >
      <div className="flex items-center justify-between p-3">
        {!collapsed && (
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            {!collapsed && <Text weight={"bold"} className={"ml-4"}>Time Management</Text>}
          </a>
        )}
        <div className={`flex items-center justify-center ${collapsed ? '' : 'hidden'}`}></div>
        <FontAwesomeIcon width={"15"}
                         className="text-l cursor-pointer ml-2 text-green-700"
                         icon={collapsed ? faChevronRight : faChevronLeft}
                         onClick={handleCollapsedChange}
        />
      </div>
      <MenuItem
        icon={<FontAwesomeIcon width={"15"} color={"var(--accent-9)"} icon={faHome}/>}
        active={pathname === '/admin/dashboard'}
        component={<Link href={'/admin/dashboard'}/>}
      >
        <span className={`${!collapsed ? '' : 'hidden'} ml-3`}>Dashboard</span>
      </MenuItem>
      <MenuItem
        icon={<FontAwesomeIcon width={"15"} color={"var(--accent-9)"} icon={faSchool}/>}
        active={pathname === "/admin/semesters"}
        component={<Link href={"/admin/semesters"}/>}
      >
        <span className={`${!collapsed ? '' : 'hidden'} ml-3`}>Semesters</span>
      </MenuItem>
      <MenuItem
        icon={<FontAwesomeIcon width={"15"} color={"var(--accent-9)"} icon={faBook}/>}
        active={pathname === "/admin/modules"}
        component={<Link href={"/admin/modules"}/>}
      >
        <span className={`${!collapsed ? '' : 'hidden'} ml-3`}>Modules</span>
      </MenuItem>

      <MenuItem icon={<FontAwesomeIcon width={"15"} color={"var(--accent-9)"} icon={faUsers}/>} component={<Link href={"/admin/users"}/>}
                                       active={pathname === "/admin/users"}
      >
        <span className="ml-3">Admins</span>
      </MenuItem>
        <MenuItem
        icon={<FontAwesomeIcon width={"15"} color={"var(--accent-9)"} icon={faFileAlt}/>}
      active={pathname === ""}
      component={<Link href={""}/>}
    >
      <span className={`${!collapsed ? '' : 'hidden'} ml-3`}>Offers</span>
    </MenuItem>
    <MenuItem
      icon={<FontAwesomeIcon width={"15"} color={"var(--accent-9)"} icon={faReceipt}/>}
      active={pathname === "/admin/orders"}
      component={<Link href={""}/>}
    >
      <span className={`${!collapsed ? '' : 'hidden'} ml-3`}>Orders</span>
    </MenuItem>
    <SubMenu icon={<FontAwesomeIcon width={"15"} color={"var(--accent-9)"} icon={faFlask}/>}
             label={!collapsed ? "Tests" : ""}>
      <MenuItem
        component={<Link href={""}/>}
        active={pathname === ""}
      >
        <span className="ml-3">Scheduling</span>
      </MenuItem>
      <MenuItem component={<Link href={""}/>}
                active={pathname === ""}>
        <span className="ml-3">Quotes</span>
      </MenuItem>
    </SubMenu>
  </Menu>
</Sidebar>
};

export default NavBar;