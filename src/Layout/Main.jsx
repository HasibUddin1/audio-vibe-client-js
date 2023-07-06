import { Link, Outlet } from "react-router-dom";


const Main = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-sky-600 text-white font-bold text-xl">
                    {/* Sidebar content here */}
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/search'>Search</Link></li>
                    <li><Link to='/favorites'>Favorites</Link></li>
                    <li><Link to='/playlists'>Playlists</Link></li>
                </ul>

            </div>
        </div>
    );
};

export default Main;