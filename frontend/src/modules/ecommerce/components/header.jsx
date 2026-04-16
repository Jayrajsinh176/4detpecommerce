import React, { useState, useRef, useEffect } from 'react'
import { CgProfile } from "react-icons/cg";
import { RiShoppingBagLine } from "react-icons/ri";
import { FaSearch, FaUser, FaBox, FaTruck, FaSignOutAlt } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useLocation } from 'react-router-dom';

const CATEGORIES = [
    "What's New", "Makeup", "Skin", "Hair", "Fragrance", "Men", "Bath & Body", "Tools & Appliances", "Mom & Baby", "Wellness", "Minis", "Homegrown", "Gifts"
];

const RESOURCES = [
    { label: "Media Room", to: "/mediaroom" },
    { label: "Core Promoters", to: "/corepromoters" },
    { label: "Event Planning", to: "/" },
];

const ABOUT_LINKS = [
    { label: "Company Profile", to: "/aboutus" },
    { label: "Team Management", to: "/teammanagement" },
    { label: "Legal Documents", to: "/legaldocument" },
    { label: "Awards", to: "/awards" },
];

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isResourceOpen, setIsResourceOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);

    const profileRef = useRef(null);
    const resourceRef = useRef(null);
    const aboutRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target))
                setIsProfileOpen(false);
            if (resourceRef.current && !resourceRef.current.contains(e.target))
                setIsResourceOpen(false);
            if (aboutRef.current && !aboutRef.current.contains(e.target))
                setIsAboutOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);

    }, [location.pathname]);

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsProfileOpen(false);
        window.location.href = '/';
    };
    const [cartCount, setCartCount] = useState(0);


    const fetchCartCount = async () => {
        try {
            if (!user?.id) return;

            const res = await fetch(`http://127.0.0.1:8000/api/cart-count/${user.id}`);
            const data = await res.json();
            setCartCount(data.count || 0);
        } catch (err) {
            console.error("Cart count error:", err);
        }
    };
    useEffect(() => {
        fetchCartCount();

        window.addEventListener("cartUpdated", fetchCartCount);

        return () => {
            window.removeEventListener("cartUpdated", fetchCartCount);
        };
    }, []);

    const [activeDropdown, setActiveDropdown] = useState(null);
    return (
        <>
            <header className="sticky top-0 z-50 w-full bg-white" style={{ boxShadow: '0 1px 0 #e5e7eb' }}>

                {/* ── Top Right Links ── */}
                <div className="hidden md:block">
                    <div className="max-w-screen-xl mx-auto px-6">
                        <div className="flex justify-end items-center h-8 text-sm text-gray-600">
                            <Link to="/trackorder" className="hover:text-gray-900 transition-colors">Track Order</Link>
                            <span className="mx-2 text-gray-400">|</span>
                            <Link to="/helpform" className="hover:text-gray-900 transition-colors">Help Centre</Link>
                        </div>
                    </div>
                </div>

                {/* ── Main row ── */}
                <div className="hidden md:block border-b border-gray-100">
                    <div className="max-w-screen-xl mx-auto px-6">
                        <div className="flex items-center h-[70px] gap-5">

                            {/* Logo */}
                            <Link to="/" className="shrink-0">
                                <img src="/images/4steplogo.png" alt="4step" className="h-12 w-auto" />
                            </Link>

                            {/* Nav links */}
                            <nav className="flex items-center gap-0.6">
                                {[
                                    { to: '/', label: 'Home' },
                                    { to: '/allproduct', label: 'Products' },
                                      { to: '/opportunity', label: 'Opportunity' },
                                    { to: '/gallery', label: 'Gallery' },
                                  
                                ].map(item => (
                                    <Link
                                        key={item.label}
                                        to={item.to}
                                        className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all whitespace-nowrap"
                                    >
                                        {item.label}
                                    </Link>
                                ))}

                                {/* Resources dropdown */}
                                <div
                                    className="relative"
                                    onMouseEnter={() => setActiveDropdown("resources")}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all whitespace-nowrap">
                                        Resources
                                    </button>

                                    {activeDropdown === "resources" && (
                                        <div
                                            className="absolute left-0 top-full w-52 bg-white rounded-xl py-1 z-50"
                                        >
                                            {RESOURCES.map((item, i) => (
                                                <React.Fragment key={item.to}>
                                                    <Link
                                                        to={item.to}
                                                        onClick={() => setActiveDropdown(null)}
                                                        className="block px-5 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                                                    >
                                                        {item.label}
                                                    </Link>
                                                    {i < RESOURCES.length - 1 && (
                                                        <div className="mx-4 border-t border-dashed border-gray-100" />
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* About Us dropdown */}
                                <div
                                    className="relative"
                                    onMouseEnter={() => setActiveDropdown("about")}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all whitespace-nowrap">
                                        About Us
                                    </button>

                                    {activeDropdown === "about" && (
                                        <div
                                            className="absolute left-0 top-full w-52 bg-white rounded-xl py-1 z-50"
                                        >
                                            {ABOUT_LINKS.map((item, i) => (
                                                <React.Fragment key={item.to}>
                                                    <Link
                                                        to={item.to}
                                                        onClick={() => setActiveDropdown(null)}
                                                        className="block px-5 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                                                    >
                                                        {item.label}
                                                    </Link>
                                                    {i < ABOUT_LINKS.length - 1 && (
                                                        <div className="mx-4 border-t border-dashed border-gray-100" />
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </nav>

                            {/* Push right */}
                            <div className="flex-1" />

                            {/* Search bar */}
                            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 w-56 lg:w-68 focus-within:bg-white focus-within:ring-1 focus-within:ring-gray-300 transition-all">
                                <FaSearch className="text-gray-400 text-sm shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="outline-none text-sm bg-transparent w-full placeholder:text-gray-400 text-gray-800"
                                />
                            </div>

                            {/* Welcome + Login */}
                            {!user ? (
                                <div className="shrink-0 text-xs leading-snug text-gray-500 border-l border-gray-200 pl-5">
                                    <p className="mb-0.5">Welcome</p>
                                    <div className="flex items-center gap-1 font-semibold text-gray-800">
                                        <Link to="/login" className="hover:text-red-600 transition-colors">Sign In</Link>
                                        <span className="text-gray-400 font-normal">/</span>
                                        <Link to="/signup" className="hover:text-red-600 transition-colors">Sign Up</Link>
                                        <span className="text-gray-500 ml-0.5">›</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="shrink-0 text-xs leading-snug text-gray-500 border-l border-gray-200 pl-5">
                                    <p className="mb-0.5">Welcome back,</p>
                                    <p className="font-semibold text-gray-900 text-sm">{user.fullname?.split(' ')[0]}</p>
                                </div>
                            )}

                            {/* Cart */}
                            <Link
                                to="/checkout"
                                className="relative flex items-center justify-center w-9 h-9 rounded-full text-[22px] text-gray-700 hover:bg-gray-100 transition-all"
                            >
                                <RiShoppingBagLine />

                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] px-2 py-[1.5px] rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* Profile dropdown */}
                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center justify-center w-9 h-9 rounded-full text-[22px] text-gray-700 hover:bg-gray-100 transition-all"
                                >
                                    <CgProfile />
                                </button>

                                {isProfileOpen && (
                                    <div
                                        className="absolute right-0 mt-2 w-60 bg-white rounded-xl py-2 z-50"
                                        style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.12)', border: '1px solid #f0f0f0' }}
                                    >
                                        {user ? (
                                            <>
                                                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold shrink-0">
                                                        {user.fullname?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900 text-sm">{user.fullname}</p>
                                                        <p className="text-xs text-gray-400 truncate max-w-[140px]">{user.email}</p>
                                                    </div>
                                                </div>
                                                <div className="py-1">
                                                    {[
                                                        { to: '/profile', icon: <FaUser />, label: 'My Profile' },
                                                        { to: '/orders', icon: <FaBox />, label: 'My Orders' },
                                                    ].map(item => (
                                                        <Link
                                                            key={item.to}
                                                            to={item.to}
                                                            onClick={() => setIsProfileOpen(false)}
                                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                                        >
                                                            <span className="text-gray-400 text-xs">{item.icon}</span>
                                                            {item.label}
                                                        </Link>
                                                    ))}
                                                    <div className="mx-4 border-t border-gray-100 my-1" />
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                                                    >
                                                        <FaSignOutAlt className="text-xs" />
                                                        Logout
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="px-4 py-3">
                                                <p className="text-sm text-gray-500 mb-3">Sign in to access your account</p>
                                                <Link
                                                    to="/login"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="block w-full text-center py-2 rounded-lg text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 transition-colors"
                                                >
                                                    Sign In
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>

                {/* ── Category strip ── */}
                <div className="hidden md:block">
                    <div className="max-w-screen-xl mx-auto px-6">
                        <nav className="flex items-center h-11 overflow-x-auto no-scrollbar">
                            {CATEGORIES.map((cat) => (
                                <Link
                                    key={cat}
                                    to={`/allproduct?cat=${encodeURIComponent(cat)}`}
                                    className="relative shrink-0 px-4 h-full flex items-center text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors group"
                                >
                                    {cat}
                                    <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* ── Mobile header ── */}
                <div className="md:hidden">
                    <div className="flex items-center justify-between px-4 h-14">
                        <Link to="/home" className="shrink-0">
                            <img src="/images/4steplogo.png" alt="4step" className="h-9 w-auto" />
                        </Link>
                        <div className="flex items-center gap-1">
                            <Link
                                to="/checkout"
                                className="relative flex items-center justify-center w-9 h-9 rounded-full text-[22px] text-gray-700 hover:bg-gray-100 transition-all"
                            >
                                <RiShoppingBagLine />

                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] px-2 py-[1.5px] rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            <button
                                className="flex items-center justify-center w-9 h-9 rounded-full text-2xl text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <HiX /> : <HiMenu />}
                            </button>
                        </div>
                    </div>

                    {isMenuOpen && (
                        <div className="border-t border-gray-100 bg-white animate-slideDown">
                            <div className="px-4 pt-3 pb-2">
                                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2.5">
                                    <FaSearch className="text-gray-400 text-sm" />
                                    <input type="text" placeholder="Search products..." className="outline-none text-sm bg-transparent w-full placeholder:text-gray-400" />
                                </div>
                            </div>

                            <div className="px-4 pb-4 flex flex-col gap-0.5 text-sm text-gray-700">
                                {user ? (
                                    <div className="flex items-center gap-3 py-3 px-3 mb-1 rounded-xl bg-gray-50">
                                        <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold shrink-0">
                                            {user.fullname?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Welcome back</p>
                                            <p className="font-semibold text-gray-900">{user.fullname}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex gap-2 py-2 mb-1">
                                        <Link to="/login" className="flex-1 text-center py-2 rounded-xl bg-gray-900 text-white font-semibold text-sm">Sign In</Link>
                                        <Link to="/signup" className="flex-1 text-center py-2 rounded-xl border border-gray-900 text-gray-900 font-semibold text-sm">Register</Link>
                                    </div>
                                )}

                                <div className="h-px bg-gray-100 my-1" />
                                {[
                                    { to: '/home', label: 'Home' },
                                    { to: '/allproduct', label: ' Products' },
                                    { to: '/helpform', label: 'Contact' },

                                ].map(item => (
                                    <Link key={item.to} to={item.to} className="py-2.5 px-3 rounded-xl hover:bg-gray-50 transition-colors font-medium">{item.label}</Link>
                                ))}

                                {/* Mobile Resources */}
                                <div className="h-px bg-gray-100 my-1" />
                                <p className="text-xs text-gray-400 px-3 pt-1 pb-0.5 uppercase tracking-wider">Resources</p>
                                {RESOURCES.map(item => (
                                    <Link key={item.to} to={item.to} className="py-2.5 px-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-600">{item.label}</Link>
                                ))}

                                {/* Mobile About Us (collapsible) */}
                                <div className="h-px bg-gray-100 my-1" />
                                <p className="text-xs text-gray-400 px-3 pt-1 pb-0.5 uppercase tracking-wider">Resources</p>
                                {ABOUT_LINKS.map(item => (
                                    <Link key={item.to} to={item.to} className="py-2.5 px-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-600">{item.label}</Link>
                                ))}

                                <div className="h-px bg-gray-100 my-1" />
                                <p className="text-xs text-gray-400 px-3 pt-1 pb-0.5 uppercase tracking-wider">Categories</p>
                                {CATEGORIES.map(cat => (
                                    <Link key={cat} to={`/allproduct?cat=${encodeURIComponent(cat)}`} className="py-2.5 px-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-600">{cat}</Link>
                                ))}

                                {user && (
                                    <>
                                        <div className="h-px bg-gray-100 my-1" />
                                        {[
                                            { to: '/profile', icon: <FaUser />, label: 'My Profile' },
                                            { to: '/orders', icon: <FaBox />, label: 'My Orders' },
                                            { to: '/track-order', icon: <FaTruck />, label: 'Track Order' },
                                        ].map(item => (
                                            <Link key={item.to} to={item.to} className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-gray-50 transition-colors">
                                                <span className="text-gray-400">{item.icon}</span>
                                                {item.label}
                                            </Link>
                                        ))}
                                        <div className="h-px bg-gray-100 my-1" />
                                        <button onClick={handleLogout} className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-red-50 text-red-500 w-full">
                                            <FaSignOutAlt />
                                            Logout
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>

            </header>

            <style>{`
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-6px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .animate-slideDown { animation: slideDown 0.2s ease-out; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </>
    );
}

export default Header;