import { Outlet } from 'react-router';
import { Header } from './header';

const DashboardLayout = () => {
    return (
        <div className="flex-1 flex-col">
            <Header />
            <main className="max-w-5xl mx-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
