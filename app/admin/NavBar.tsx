"use client"
import {Menu, MenuItem, Sidebar, sidebarClasses, SubMenu} from "react-pro-sidebar";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBuilding,
  faCalendar,
  faChevronLeft,
  faChevronRight,
  faGraduationCap,
  faHome,
  faUserGroup,
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

      <MenuItem icon={<FontAwesomeIcon width={"15"} color={"var(--accent-9)"} icon={faUsers}/>}
                component={<Link href={"/admin/users"}/>}
                active={pathname === "/admin/users"}
      >
        <span className="ml-3">Users</span>
      </MenuItem>
      <MenuItem
        icon={<FontAwesomeIcon width={"15"} color={"var(--accent-9)"} icon={faUserGroup}/>}
        active={pathname === "/admin/groups"}
        component={<Link href={"/admin/groups"}/>}
      >
        <span className={`${!collapsed ? '' : 'hidden'} ml-3`}>Student Groups</span>
      </MenuItem>
      <SubMenu icon={<FontAwesomeIcon width={"15"} color={"var(--accent-9)"} icon={faBuilding}/>}
               label={!collapsed ? "Rooms" : ""}>
        <MenuItem
          active={pathname === "/admin/departments"}
          component={<Link href={"/admin/departments"}/>}
        >
          <span className={`ml-3`}>Departments</span>
        </MenuItem>
        <MenuItem
          active={pathname === "/admin/rooms"}
          component={<Link href={"/admin/rooms"}/>}
        >
          <span className={`ml-3`}>Class rooms</span>
        </MenuItem>
      </SubMenu>
      <MenuItem icon={<FontAwesomeIcon width={"15"} color={"var(--accent-9)"} icon={faGraduationCap}/>}
                component={<Link href={"/admin/classes"}/>}
                active={pathname === "/admin/classes"}
      >
        <span className="ml-3">Classes</span>
      </MenuItem>

      <SubMenu icon={<FontAwesomeIcon width={"15"} color={"var(--accent-9)"} icon={faCalendar}/>}
               label={!collapsed ? "TimeTables & reservations" : ""}>
        <MenuItem
          component={<Link href={"/admin/timetables"}/>}
          active={pathname === "/admin/timetables"}
        >
          <span className="ml-3">TimeTables</span>
        </MenuItem>
        <MenuItem
          component={<Link href={"/admin/reservations"}/>}
          active={pathname === "/admin/reservations"}
        >
          <span className="ml-3">Reservations</span>
        </MenuItem>
      </SubMenu>
    </Menu>
  </Sidebar>
};

export default NavBar;