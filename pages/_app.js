// _app.js
import "../css/index.css";
import Head from "next/head";
import Layout from "../components/layout";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useState, createContext, useContext, useEffect } from "react";

export const MyContext = createContext({
    userID: null,
    setUserID: () => {},
    userName: null,
    setUserName: () => {},
});

function MyProvider({ children }) {
    const [userID, setUserID] = useState(null);

    useEffect(() => {
      const localUserID = localStorage.getItem('userID');
      setUserID(localUserID);
    
      // Fetch the user's details from the server
      fetch(`https://yay-api.herokuapp.com/user/${localUserID}`, {
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => {
        // Assuming the response data contains the user's name
        const userName = data.name;
        setUserName(userName);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }, []);

    return (
      <MyContext.Provider value={{value, setValue, userID, setUserID}}>
        {children}
      </MyContext.Provider>
    );
}

function MyApp({ Component, pageProps }) {
    return (
      <Layout>
        <div>
          <Head>
            <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <title>Bundl Admin Portal</title>
            <link rel="icon" href="/favicon.ico" />
            <meta />
            <script src="https://apis.google.com/js/api.js"></script>
          </Head>
          <MyProvider>
            <Component {...pageProps} />
          </MyProvider>
        </div>
      </Layout>
    );
}

export default MyApp;

