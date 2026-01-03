"use client";

import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavigationMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const navigate = (route: string) => {
    router.push(route);
  };

  React.useEffect(() => {
    const handleShortcuts = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const isCtrlOrMeta = e.ctrlKey || e.metaKey;

      if (isCtrlOrMeta && key === "j") {
        e.preventDefault();
        setOpen((prevOpen) => !prevOpen);
      }

      if (open) {
        if (isCtrlOrMeta && key === "h") navigate("/");
        if (isCtrlOrMeta && key === "a") navigate("/about");
        if (isCtrlOrMeta && key === "g") navigate("/github");
        if (isCtrlOrMeta && key === "p") navigate("/projects");
        if (isCtrlOrMeta && e.altKey && key === "t") navigate("/tech");
      }
    };

    document.addEventListener("keydown", handleShortcuts);
    return () => document.removeEventListener("keydown", handleShortcuts);
  }, [open]);

  return (
    <>
      <kbd
        className="fixed bottom-16 right-4 inline-flex h-5 items-center gap-1 rounded-lg bg-primary p-5 text-white cursor-pointer md:right-12"
        onClick={() => setOpen(!open)}
      >
        <span className="text-lg">⌘+J</span>
      </kbd>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <Link href="/" onClick={() => setOpen(false)}>
              <CommandItem>
                Home
                <CommandShortcut>⌘H</CommandShortcut>
              </CommandItem>
            </Link>
            <Link href="/about" onClick={() => setOpen(false)}>
              <CommandItem>
                About
                <CommandShortcut>⌘A</CommandShortcut>
              </CommandItem>
            </Link>
            <Link href="/github" onClick={() => setOpen(false)}>
              <CommandItem>
                Github
                <CommandShortcut>⌘G</CommandShortcut>
              </CommandItem>
            </Link>
            <Link href="/projects" onClick={() => setOpen(false)}>
              <CommandItem>
                Projects
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
            </Link>
            <Link href="/tech" onClick={() => setOpen(false)}>
              <CommandItem>
                Tech
                <CommandShortcut>⌘Alt+T</CommandShortcut>
              </CommandItem>
            </Link>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
