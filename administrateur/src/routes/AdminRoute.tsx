import { lazy } from 'react'

const UserList = lazy(() => import('../pages/Admin/Users/UsersLists'))
const UserForm = lazy(() => import('../pages/Admin/Users/UsersLists'))

const adminRoutes = [
  {
    path: '/admin/users',
    element: <UserList />,
  },
  {
    path: '/admin/users/:id',
    element: <UserForm />,
  },
]

export default adminRoutes
