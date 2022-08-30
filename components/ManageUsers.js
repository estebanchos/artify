import { DownOutlined } from '@ant-design/icons';
import { Button, Card, Dropdown, Menu, Space } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../styles/ManageUsers.module.css'

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

    const handleSelectedUser = (e) => {
        setSelectedUser(users.find(user => user.id === Number(e.key)))
        setUserIsSuspended(users.find(user => user.id === Number(e.key)).suspended)
    }

    const menu = (
        <Menu
            onClick={handleSelectedUser}
            items={users?.map(user => {
                return {
                    label: `${user.name} - ${user.role}`,
                    key: user.id
                }
            })}
        />
    );

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
                <Dropdown overlay={menu} trigger='click'>
                    <Button>
                        <Space>
                            Select a User
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
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