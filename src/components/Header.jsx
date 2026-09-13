import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

function Header(props) {

    const [activeTab, setActiveTab] = useState("home");

    return (
        <nav>
            <Link to='/' className={activeTab === "home" ? "active" : ""} onClick={() => setActiveTab("home")}>Home</Link>
            <Link to='/about' className={activeTab === "about" ? "active" : ""} onClick={() => setActiveTab("about")}>About</Link>
        </nav>

    );
}

export default Header;