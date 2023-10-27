import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';
import { MdPayments } from 'react-icons/md';
import { FaFolderOpen, FaLaptopHouse, FaCloudUploadAlt } from 'react-icons/fa'
import { AiFillHome } from 'react-icons/ai'

// Import icons for menu items
import { BiBook, BiSolidArrowToLeft, } from 'react-icons/bi';
import { HiDocumentDuplicate } from 'react-icons/hi'

const Sidebar = () => {
    const menuItems = [
        { path: '/profile', label: 'Home', icon: <AiFillHome size={25} /> },
        { path: '/tax-interview', label: 'Tax Interview', icon: <FaLaptopHouse size={25} /> },
        { path: '/upload-document', label: 'Upload Document', icon: <FaCloudUploadAlt size={25} /> },
        { path: '/my-summary', label: 'Summary', icon: <HiDocumentDuplicate size={25} /> },
        { path: '/make-payment', label: 'Payments', icon: <MdPayments size={25} /> },
        { path: '/my-tax-documents', label: 'Documents', icon: <FaFolderOpen size={25} /> },
    ];

    const location = useLocation();
    const [activeItem, setActiveItem] = useState(location.pathname);

    useEffect(() => {
        setActiveItem(location.pathname);
    }, [location.pathname]);

    return (
        <div className="sidebar">
            <div className='header-container p-3 d-flex align-items-center justify-content-between'>
                <div className='logo-text'>
                    <p className='m-0 p-0 text-warning' style={{ fontSize: '30px' }}>Navigations</p>
                </div>
                <button className='btn btn-dark'>
                    <BiSolidArrowToLeft size={25} />
                </button>
            </div>
            <ul className="sidebar-menu">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <Link to={item.path} className="sidebar-link" style={{
                            borderBottom: activeItem === item.path ? '2px solid #faae0b' : 'initial',
                            color: activeItem === item.path ? '#ccc' : '#ccc',
                            backgroundColor: activeItem === item.path ? '#4d4d4b':''
                        }}>
                            {item.icon} {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
