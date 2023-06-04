import React, {useEffect, useState} from 'react'
import { Prism } from '@mantine/prism';
import AdminWrapper from '../../layouts/AdminWrapper'
import { useAppContext } from '../../providers/appProvider';
import publicStyles from '../../styles/publicStyles';

const Admin = () => {
  const { user, logout, login_status } = useAppContext();
    const [loggedInUser, setloggedInUser] = useState<any>(null)
    const [loggedIn, setLoggedIn] = useState(false)

    const { theme } = publicStyles()

    useEffect(() => {
        setLoggedIn(login_status)
        setloggedInUser(JSON.parse(user ? user : "{}"))
    }, [login_status, user])

  return (
    <div>
      Admin
      <Prism language='json'>
        {JSON.stringify(loggedInUser ? loggedInUser : "{}", null, 4)}
      </Prism>
    </div>
  )
}

Admin.PageLayout = AdminWrapper

export default Admin