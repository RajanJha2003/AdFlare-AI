import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar"
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const AppSidebar = () => {
  return (
    <Sidebar >
      <SidebarHeader className={"flex items-center my-5"}>
        <Image src={'/logo.svg'} alt='logo' width={200} height={200} />
        </SidebarHeader>
        <hr />
      <SidebarContent>
        <SidebarGroup>
            <Button className={"mt-5"}>
                + Create New Ad Video
            </Button>

        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar