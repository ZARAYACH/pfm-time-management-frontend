"use client";
import React from 'react';
import {Avatar, Button, DropdownMenu, Text} from "@radix-ui/themes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOut, faUser} from "@fortawesome/free-solid-svg-icons";
import {BASE_PATH} from "@/app/openapi";
import {useAuth} from "@/app/contexts/AuthContext";
import {useRouter} from "next/navigation";

export default function DashboardHeader() {

  const router = useRouter();
  const {user} = useAuth();

  const logOut = () => fetch(BASE_PATH + '/logout', {credentials: 'include'})
    .then(() => router.replace("/auth/login"))

  return (
    <nav className="border-gray-200 pr-8 bg-white shadow-sm">
      <div className="flex justify-end py-3">
        <ul className="flex font-medium items-center space-x-8 ">
          <li>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button className="border-none" variant="ghost">
                  <Avatar className="mr-1" radius="full" size="3" fallback="A"/>
                  <Text className="pr-2 hidden lg:inline" weight="medium" size="3">
                    {user?.email}
                  </Text>
                  <DropdownMenu.TriggerIcon/>
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content size="2" style={{"width": '200px'}}>
                <DropdownMenu.Item onSelect={() => router.push("/admin/profile")}><FontAwesomeIcon
                  icon={faUser}/>Mon profile</DropdownMenu.Item>
                <DropdownMenu.Item onSelect={logOut}><FontAwesomeIcon icon={faSignOut}/> deconnexion</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </li>
        </ul>
      </div>
    </nav>
  );
};

