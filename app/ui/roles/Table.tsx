import React from 'react';

type Role = {
  name: string;
  totalPermissions: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
};

const roles: Role[] = [
  {
    name: 'Admin',
    totalPermissions: 10,
    createdAt: '2022-01-15',
    updatedAt: '2022-02-20',
    isActive: true,
  },
  {
    name: 'Editor',
    totalPermissions: 5,
    createdAt: '2022-02-10',
    updatedAt: '2022-03-18',
    isActive: true,
  },
  {
    name: 'Viewer',
    totalPermissions: 3,
    createdAt: '2022-03-05',
    updatedAt: '2022-04-12',
    isActive: false,
  },
  {
    name: 'SuperAdmin',
    totalPermissions: 15,
    createdAt: '2022-04-20',
    updatedAt: '2022-05-25',
    isActive: true,
  },
  {
    name: 'Moderator',
    totalPermissions: 7,
    createdAt: '2022-05-12',
    updatedAt: '2022-06-30',
    isActive: false,
  },
];

const RoleTable: React.FC = () => {
  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Permissions
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Created At
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Updated At
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Is Active
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {roles.map((role, index) => (
                    <tr key={index} className="group">
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {role.name}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {role.totalPermissions}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {role.createdAt}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {role.updatedAt}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {role.isActive ? (
                          <p className="text-green-500">Yes</p>
                        ) : (
                          <p className="text-red-500">No</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleTable;