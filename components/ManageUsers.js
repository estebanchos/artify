import { DownOutlined } from '@ant-design/icons';
import { Button, Card, Dropdown, Menu, Space } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';



// const menu = (
//     <Menu
//         onClick={handleClick}
//         items={[
//             {
//                 label: '1st menu item',
//                 key: '1',
//             },
//             {
//                 label: '2nd menu item',
//                 key: '2',
//             },
//             {
//                 label: '3rd menu item',
//                 key: '3',
//             },
//         ]}
//     />
// );

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
        <section>
            <h2>Suspend or reactivate users</h2>
            <Dropdown overlay={menu} trigger='click'>
                <Button>
                    <Space>
                        Select a User
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
            {selectedUser ?
                <Card title={selectedUser.name}>
                    <p>Role: {selectedUser.role}</p>
                    <p>Status: {selectedUser.suspended ? 'Suspended' : 'Active'}</p>
                    {userIsSuspended ?
                        <Button onClick={handleUserUpdate}>
                            Reactivate Account
                        </Button>
                        :
                        <Button onClick={handleUserUpdate} danger>
                            Suspend Account
                        </Button>
                }
                    {/* <button onClick={handleUserUpdate}>{selectedUser.suspended ? 'Reactivate Account' : 'Suspend Account'}</button> */}
                </Card>
                : ''}
        </section>
    );
}

export default ManageUsers;