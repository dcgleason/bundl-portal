import { useRouter } from 'next/router';
import Sidebar from "./sidebar";
import Header from "./header"
import { useEffect, useState } from 'react';

export default function Layout(props) {
    const router = useRouter();
    const [userName, setUser] = useState('');

    return (
        <div>
            <div className="flex w-full">
                {router.pathname !== '/signup' && router.pathname !== '/signin' && <Sidebar />}
                <div className="w-full px-6 md:px-10 py-6">
                {router.pathname !== '/signup' && router.pathname !== '/signin' && <Header user={userName} />} 
                    <main>{props.children}</main>
                </div>
            </div>
        </div>
    );
}
