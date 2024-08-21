import { useState, createContext } from "react"

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null
  });

  function handleLoginUser(currentUser) {
    const userInfo = {
      username: currentUser[0],
      email: currentUser[1],
      role: currentUser[2],
      userId: currentUser[3]
    };
    setUser(userInfo);
    localStorage.setItem('user', JSON.stringify(userInfo));
  }

  function handleLogoutUser() {
    setUser(null);
    localStorage.setItem('user', null);
  }

  return (
    <UserContext.Provider value={{ user, handleLoginUser, handleLogoutUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;