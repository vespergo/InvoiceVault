import { lusitana } from "../fonts";

type Permission = {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
}

const permissions: Permission[] = [
    {
        id: 'jahdjahsgd456467a',
        name: 'Create User',
        description: 'Create a new user',
        createdAt: '2021-10-10',
        updatedAt: '2021-10-10',
        isActive: true
    },
    {
        id: 'jah234534djahsgda',
        name: 'Update User',
        description: 'Create a new user',
        createdAt: '2021-10-10',
        updatedAt: '2021-10-10',
        isActive: true
    },
    {
        id: 'jahdja456456hsgda',
        name: 'Delete User',
        description: 'Create a new user',
        createdAt: '2021-10-10',
        updatedAt: '2021-10-10',
        isActive: true
    },
    {
        id: 'jahdja23hsgda',
        name: 'Create Invoice',
        description: 'Create a new user',
        createdAt: '2021-10-10',
        updatedAt: '2021-10-10',
        isActive: true
    },
    {
        id: 'jahdjahsgda1223',
        name: 'Update Invoice',
        description: 'Create a new user',
        createdAt: '2021-10-10',
        updatedAt: '2021-10-10',
        isActive: true
    },
    {
        id: 'jahdjahsgda678',
        name: 'Delete Invoice',
        description: 'Create a new user',
        createdAt: '2021-10-10',
        updatedAt: '2021-10-10',
        isActive: true
    },
    {
        id: 'jahdjahsgda23',
        name: 'Create Role',
        description: 'Create a new user',
        createdAt: '2021-10-10',
        updatedAt: '2021-10-10',
        isActive: true
    },
    {
        id: 'jahdjahsgda34',
        name: 'Update Role',
        description: 'Create a new user',
        createdAt: '2021-10-10',
        updatedAt: '2021-10-10',
        isActive: false
    }
];

const PermissionTable = ()=> {
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
                      Description
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
                  {permissions.map((permission, index) => (
                    <tr key={index} className="group">
                      
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {permission.name}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {permission.description}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {permission.createdAt}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {permission.updatedAt}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                      {permission.isActive ? (
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
    )
}

export default PermissionTable;