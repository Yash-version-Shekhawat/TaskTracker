import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Styles.css'
import img from '../assets/bg-oo1.png'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='loginback h-[100vh] flex justify-center items-center flex-col'
     style={{
        padding: '2rem', 
        textAlign: 'center',
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <h2 className='fonty1 p-3 text-[30px] absolute left-0 top-0'>To Do<span className='text-[#a06cd5]'>IT.</span></h2>
      <div className='bg-[#ffffff50] backdrop-blur-md w-[70vw] md:w-[30%] h-2/3 md:h-[28rem] rounded-2xl border-2 border-white'>
      
      <h2 className='fonty2 mt-8 text-[24px] font-extrabold'>User Log<span className='text-[#a06cd5]'>in</span></h2>
      <div className='flex justify-center'>
      <h2 className='fonty2 mt-2 text-[12px] font-medium w-2/3'>Hey, Enter your details to get sign in to your account</h2>
      </div>
      
      <input
        className='fonty2 p-2 w-3/4 mt-8 rounded-md'
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className='fonty2 p-2 w-3/4 mt-4 rounded-md'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin} className='fonty2 p-2 w-3/4 mt-8 rounded-md bg-[#333] text-white'>Login</button>
      </div>
    </div>
  );
};

export default Login;
