'use client';
import React from 'react';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  Cog8ToothIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  ArrowPathRoundedSquareIcon,
  UserPlusIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.

// Define a type for links
type Link = {
  name: string;
  href: string;
  icon: React.ElementType;
  sublinks: Sublink[];
};

// Define a type for sublinks
type Sublink = {
  name: string;
  href: string;
};


const links: Link[] = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon, sublinks: [] },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
    sublinks: [],
  },
  { name: 'Revenues', href: '/dashboard/revenues', icon: CurrencyDollarIcon, sublinks: [], },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon, sublinks: [], },
  { name: 'Tax Settings', href: '/dashboard/tax', icon: CurrencyDollarIcon, sublinks: [], },
  { name: 'Backup & Export', href: '/dashboard/backup', icon: ArrowPathRoundedSquareIcon, sublinks: [], },
  { 
    name: 'Roles & Permission', 
    href: '#', 
    icon: UserPlusIcon,
    sublinks: [
      { name: 'Roles', href: '/dashboard/roles' },
      { name: 'Permissions', href: '/dashboard/permissions' },
    ]
   },
  { name: 'Data Export and Deletion', href: '/dashboard/data-export', icon: ArrowPathIcon, sublinks: [], },
  { name: 'Feedback and Suggestions', href: '/dashboard/feedback', icon: ChatBubbleBottomCenterIcon, sublinks: [], },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog8ToothIcon, sublinks: [], },
  { name: 'FAQ', href: '/dashboard/faqs', icon: ChatBubbleLeftRightIcon, sublinks: [], },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(false); // State to track submenu visibility
  const [currentParentLink, setCurrentParentLink] = React.useState<Link | null>(null);

  // Function to handle submenu toggle
  const toggleSubMenu = (link: Link) => {
    if (currentParentLink === link) {
      setIsSubMenuOpen(!isSubMenuOpen);
    } else {
      setIsSubMenuOpen(true);
      setCurrentParentLink(link);
    }
  };
  

  return (
    <>
      {links.map((link, index) => {
        const LinkIcon = link.icon;
        return (
          <div key={index} className="relative">
            <Link
              href={link.href}
              onClick={() => toggleSubMenu(link)}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-sky-100 text-blue-600': pathname === link.href,
                },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
              {link.sublinks.length > 0 && (
                  <ChevronDownIcon className="w-4 absolute right-2 top-2" />
                )}
            </Link>

            {link.sublinks.length > 0 && isSubMenuOpen && (
              <>
              {link.sublinks.map((sublink) => (
                  <Link
                    key={sublink.name}
                    href={sublink.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {sublink.name}
                  </Link>
                ))}
              </>
            )}
          </div>
          
          
        );
      })}
    </>
  );
}
