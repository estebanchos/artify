import ArtUpload from "../../components/ArtUpload";
import { Card } from 'antd';
import { useState } from 'react';

const tabList = [
    {
        key: 'tab1',
        tab: 'Browse Artists',
    },
    {
        key: 'tab2',
        tab: 'Add Art',
    },
];
const contentList = {
    tab1: <p>Dropdown and list</p>,
    tab2: <ArtUpload />,
};

function Artists() {
    const [activeTabKey1, setActiveTabKey1] = useState('tab1');
    const onTab1Change = (key) => {
        setActiveTabKey1(key);
    }; 
    
    return (
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
                title="Artist"
                tabList={tabList}
                activeTabKey={activeTabKey1}
                onTabChange={(key) => {
                    onTab1Change(key);
                }}
            >
                {contentList[activeTabKey1]}
            </Card>
        </div>
    );
}

export default Artists;