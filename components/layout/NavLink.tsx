"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps extends React.ComponentProps<typeof Link> {
  activeClassName?: string;
  end?: boolean;
}

export function NavLink({
  href,
  className,
  activeClassName,
  end = false,
  children,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();

  const isActive = end
    ? pathname === href
    : pathname.startsWith(href as string);

  return (
    <Link
      href={href}
      className={cn(className, isActive && activeClassName)}
      {...props}
    >
      {children}
    </Link>
  );
}
