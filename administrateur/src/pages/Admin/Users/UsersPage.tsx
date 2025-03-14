import UserList from '../../../components/users/UsersLists'
import UserForm from '../../../components/users/UsersForm'


const UsersPage = () => {


  return (
    <div>
      <h1>Gestion des utilisateurs</h1>
      <UserForm/>
      <UserList />
    </div>
  )
}

export default UsersPage
