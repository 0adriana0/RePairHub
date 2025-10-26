import './SignUpNavbar.css'
import { useNavigate } from 'react-router-dom'

const SignUpNavbar = () => {
  const navigate = useNavigate()
  return (
    <nav className='signUpNav'>
    <button
        onClick={() => navigate("/register")}
        className={'signUpNavbar'}
      >SING UP</button>
    </nav>
  )
}

export default SignUpNavbar