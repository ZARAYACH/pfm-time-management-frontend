"use client"
import {Menu, MenuItem, Sidebar, sidebarClasses, SubMenu} from "react-pro-sidebar";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faChevronLeft, faChevronRight, faHome} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {Text} from "@radix-ui/themes";

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
            {!collapsed && <Text weight={"bold"} className={"ml-4"}>TimePlanner</Text>}
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
        active={pathname === '/teacher/dashboard'}
        component={<Link href={'/teacher/dashboard'}/>}
      >
        <span className={`${!collapsed ? '' : 'hidden'} ml-3`}>Dashboard</span>
      </MenuItem>
      <SubMenu icon={<FontAwesomeIcon width={"15"} color={"var(--accent-9)"} icon={faCalendar}/>}
               label={!collapsed ? "TimeTables & reservations" : ""}>
        <MenuItem
          component={<Link href={"/teacher/timetables"}/>}
          active={pathname === "/teacher/timetables"}
        >
          <span className="ml-3">TimeTables</span>
        </MenuItem>
        <MenuItem
          component={<Link href={"/teacher/reservations"}/>}
          active={pathname === "/teacher/reservations"}
        >
          <span className="ml-3">Reservations</span>
        </MenuItem>
      </SubMenu>
    </Menu>
  </Sidebar>
};

export default NavBar;