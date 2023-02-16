import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import Header from './components/Header';
import Main from './components/Main';
function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);

  const handleSubmit = (e) => {
    if (e.key !== 'Enter') return;

    if (username === 'admin' && password === 'admin') {
      setIsLogged(true);
      toast.success('Đăng nhập thành công');
    } else {
      toast.error('Đăng nhập thất bại');
    }
  };

  return (
    <div className="App">
      <Header />

      <Container>
        {!isLogged ? (
          <Login className="login">
            <h1>Login</h1>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: 2,
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Username"
                value={username}
                placeholder="Nhập vào Username"
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleSubmit}
              />
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Password"
                value={password}
                type="password"
                placeholder="Nhập vào Password"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleSubmit}
              />
              <Button variant="contained" fullWidth onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </Login>
        ) : (
          <Main />
        )}
      </Container>
      <ToastContainer />
    </div>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: calc(100vh - 64px);
  background-color: #f5f5f5;
`;

const Login = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 400px;
  margin-top: 20px;
`;

export default App;
