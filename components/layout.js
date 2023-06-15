import { useRouter } from 'next/router';
import Sidebar from "./sidebar";
import Header from "./header"

export default function Layout(props) {
    const router = useRouter();
    const [userName, setUser] = useState('');

    useEffect(() => {
        const localUserID = localStorage.getItem('userID');
        console.log('localUserID from my provider: ', localUserID);
      
        fetch(`https://yay-api.herokuapp.com/user/${localUserID}`, {
          credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
         
            // Set the messages to the state
            setUser(data.name);
            console.log("data name", data.name);

        })
        .catch(error => {
          console.error('Error:', error);
        });
      }, []);

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
