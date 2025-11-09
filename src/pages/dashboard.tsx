"use client";

import { useState } from "react";
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronDown, ChevronRight, LayoutDashboard, FileText, Database } from "lucide-react";
import { ButtonGroup} from "@/components/ui/button-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import Icon from "@/assets/icon.png";
import { Button } from "@/components/ui/button";
export default function Dashboard() {
  const [adminName] = useState("Ariel Julians");
  const [date, setDate] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);
  const [openLaporan, setOpenLaporan] = useState(false);
  const [openMaster, setOpenMaster] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex bg-white w-full relative">
        {/* Sidebar */}
        <Sidebar className="h-screen w-64">
          <SidebarHeader>
            <div className="flex items-center gap-3 mt-4 mb-6 px-3">
              <img src={Icon} alt="Logo" className="h-10 w-10 rounded-sm object-contain" />
              <div className="flex flex-col leading-tight">
                <span className="text-base font-semibold text-[#002E8A]">ArtaJaya</span>
                <span className="text-sm text-gray-600">Konstruksi</span>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="uppercase text-xs tracking-wider text-gray-500 mb-2 px-3">
                Platform
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {/* Dashboard */}
                  <SidebarMenuItem>
                    <button className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 w-full text-left">
                      <LayoutDashboard className="h-4 w-4 text-[#002E8A]" />
                      <span className="font-medium text-gray-700">Dashboard</span>
                    </button>
                  </SidebarMenuItem>

                  {/* Laporan */}
                  <SidebarMenuItem>
                    <button
                      onClick={() => setOpenLaporan(!openLaporan)}
                      className="flex w-full items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-[#002E8A]" />
                        <span className="font-medium text-gray-700">Laporan</span>
                      </div>
                      {openLaporan ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                    {openLaporan && (
                      <div className="ml-8 mt-1 flex flex-col gap-1">
                        <button className="text-sm text-gray-600 hover:text-[#002E8A] hover:underline text-left">
                          Project
                        </button>
                        <button className="text-sm text-gray-600 hover:text-[#002E8A] hover:underline text-left">
                          Rancangan Anggaran
                        </button>
                      </div>
                    )}
                  </SidebarMenuItem>

                  {/* Master */}
                  <SidebarMenuItem>
                    <button
                      onClick={() => setOpenMaster(!openMaster)}
                      className="flex w-full items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <Database className="h-4 w-4 text-[#002E8A]" />
                        <span className="font-medium text-gray-700">Master</span>
                      </div>
                      {openMaster ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                    {openMaster && (
                      <div className="ml-8 mt-1 flex flex-col gap-1">
                        <button className="text-sm text-gray-600 hover:text-[#002E8A] hover:underline text-left">AHSP</button>
                        <button className="text-sm text-gray-600 hover:text-[#002E8A] hover:underline text-left">Tim</button>
                        <button className="text-sm text-gray-600 hover:text-[#002E8A] hover:underline text-left">Kegiatan</button>
                      </div>
                    )}
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 w-full mt-16 sm:mt-20 lg:mt-26 px-4 sm:px-6 lg:px-10">
          <div className="flex justify-between items-start mb-6 sm:mb-0 pt-12 lg:pt-0">
            <h1 className="text-2xl sm:text-3xl text-[#002E8A] font-bold font-inter">Dashboard</h1>

            <div className="flex flex-col items-end gap-2 mr-12">
              <span className="text-[#002E8A] font-semibold">{adminName}</span>

              {/* Date Picker */}
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" id="date" className="w-48 justify-between font-normal">
                    {date ? date.toLocaleDateString() : "Select Date"}
                    <ChevronDown />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden" align="end">
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <ButtonGroup className="fixed mt-2">
            <Button variant="outline" size="sm" className="hover:bg-[#002E8A] hover:text-white transition-colors duration-200 rounded-sm">
              Overview
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-[#002E8A] hover:text-white transition-colors duration-200 rounded-sm">
              Analytics
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-[#002E8A] hover:text-white transition-colors duration-200 rounded-sm">
              Reports
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-[#002E8A] hover:text-white transition-colors duration-200 rounded-sm">
              Notifications
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </SidebarProvider>
  );
}
