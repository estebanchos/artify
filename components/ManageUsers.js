import { Button, Card, Select } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../styles/ManageUsers.module.css'
const { Option } = Select

function ManageUsers() {
    const [users, setUsers] = useState([])
    const [userIsSuspended, setUserIsSuspended] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)

    useEffect(() => {
        fetchAllUsers()
    }, [])

    const fetchAllUsers = () => {
        axios.get('/api/user')
            .then(res => {
                setUsers(res.data)
            })
            .catch(err => console.error(err))
    }

    const handleSelectedUser = (value) => {
        setSelectedUser(users.find(user => user.id === Number(value)))
        setUserIsSuspended(users.find(user => user.id === Number(value)).suspended)
    }

    const handleUserUpdate = () => {
        axios.patch(`/api/user/${selectedUser.id}`, {
            suspended: !userIsSuspended
        })
            .then(res => {
                setSelectedUser(res.data.returnUpdatedUser)
                setUserIsSuspended(res.data.returnUpdatedUser.suspended)
            })
            .catch(err => console.error(err))
    }

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Suspend or reactivate users</h2>
            <div className={styles.dropdownContainer}>
                <Select
                    showSearch
                    size="large"
                    placeholder="Select a user"
                    optionFilterProp="children"
                    onChange={handleSelectedUser}
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                >
                    {users?.map(user => {
                        return (
                            <Option
                                key={user.id}
                                value={user.id}>
                                {user.name} - {user.role}
                            </Option>
                        )
                    })}
                </Select>
            </div>
            {selectedUser ?
                <Card title={selectedUser.name}>
                    <p><span className={styles.cardLabel}>Role: </span><span className={styles.cardContent}>{selectedUser.role}</span></p>
                    <p><span className={styles.cardLabel}>Status: </span><span className={styles.cardContent}>{selectedUser.suspended ? 'Suspended' : 'Active'}</span></p>
                    <div className={styles.buttonContainer}>
                        {userIsSuspended ?
                            <Button onClick={handleUserUpdate} size='large'>
                                Reactivate Account
                            </Button>
                            :
                            <Button onClick={handleUserUpdate} size='large' danger>
                                Suspend Account
                            </Button>
                        }
                        {/* <button onClick={handleUserUpdate}>{selectedUser.suspended ? 'Reactivate Account' : 'Suspend Account'}</button> */}
                    </div>
                </Card>
                : ''}

        </section >
    );
}

export default ManageUsers;