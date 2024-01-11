'use client';
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
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
  { name: 'Tax Settings', href: '/dashboard/tax', icon: CurrencyDollarIcon },
  { name: 'Backup & Export', href: '/dashboard/backup', icon: ArrowPathRoundedSquareIcon },
  { name: 'Roles & Permission', href: '/dashboard/roles', icon: UserPlusIcon },
  { name: 'Data Export and Deletion', href: '/dashboard/data-export', icon: ArrowPathIcon },
  { name: 'Feedback and Suggestions', href: '/dashboard/feedback', icon: ChatBubbleBottomCenterIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog8ToothIcon },
  { name: 'FAQ', href: '/dashboard/faqs', icon: ChatBubbleLeftRightIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
