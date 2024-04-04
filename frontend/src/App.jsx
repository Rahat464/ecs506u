// App.jsx
import { useContext, useEffect } from 'react';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import { UserContext } from './context/userContext.jsx';

function App() {

  // const {user, updateUser} = useContext(UserContext);

  // useEffect(() => {
  //   // Check if the user object exists in local storage
  //   if (localStorage.getItem('user')) {
  //     // Retrieve the user object from local storage
  //     updateUser(JSON.parse(localStorage.getItem('user')));
  //     // Use the user object for authentication and session management
  //     // For example:
  //     if (user.isLoggedIn) {
  //         // User is logged in, perform necessary actions
  //         console.log('User is logged in');
  //     } else {
  //         // User is not logged in, handle accordingly
  //         console.log('User is not logged in');
  //     }
  //   } else {
  //     // User object doesn't exist in local storage, handle accordingly
  //     console.log('User object not found in local storage');
  //   }
  // })

  return (
    <>
      <div>
        <LandingPage />
      </div>
    </>
  );
}

export default App;
