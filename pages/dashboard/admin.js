import { Card } from 'antd';
import Head from 'next/head';
import { useState } from 'react';
import ArtUpload from '../../components/ArtUpload';
import ManageUsers from '../../components/ManageUsers';
import BrowseArt from "../../components/BrowseArt";

function Admin() {
    const [activeTabKey1, setActiveTabKey1] = useState('tab1');
    const onTab1Change = (key) => setActiveTabKey1(key);

    const tabList = [
        {
            key: 'tab1',
            tab: 'Browse Artists',
        },
        {
            key: 'tab2',
            tab: 'Upload Art',
        },
        {
            key: 'tab3',
            tab: 'Manage',
        },
    ];
    const contentList = {
        tab1: <BrowseArt />,
        tab2: <ArtUpload />,
        tab3: <ManageUsers />,
    };

    return (
        <>
            <Head><title>Artify - Dashboard</title></Head>
            <div style={{
                width: '80%',
                maxWidth: '80rem',
                margin: '2rem auto'
            }}>
                <h1>Dashboard</h1>
                <Card
                    style={{
                        width: '100%',
                        minHeight: '75vh',
                    }}
                    title="Admin"
                    tabList={tabList}
                    activeTabKey={activeTabKey1}
                    onTabChange={(key) => {
                        onTab1Change(key);
                    }}
                >
                    {contentList[activeTabKey1]}
                </Card>
            </div>
        </>
    );
}

export default Admin;