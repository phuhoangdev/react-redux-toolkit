import logo from './logo.svg';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllUsers } from './redux/slices/userSlice';

function App() {
  const dispatch = useDispatch();

  const listUsers = useSelector(state => state.user.listUsers);
  const isLoading = useSelector(state => state.user.isLoading);
  const isError = useSelector(state => state.user.isError);

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])

  if(isError === true && isLoading === false) {
    return (
      <div>Something wrongs. Please try again!</div>
    )
  }

  if(isError === false && isLoading === true) {
    return (
      <div>Loading data...</div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {listUsers && listUsers.length > 0 && 
                listUsers.map((item, index) => {
                  return (
                    <tr key={`table-redux-${index}`}>
                      <td>{index + 1}</td>
                      <td>{item.email}</td>
                      <td>{item.username}</td>
                    </tr>
                  )
              })}
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}

export default App;
