"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Icons } from "@ui/components/icons"

import { Button } from "@ui/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Icons.sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Icons.moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Světlý
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Tmavý
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          Systém
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
