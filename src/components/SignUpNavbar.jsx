import './SignUpNavbar.css'
import { Navigate } from 'react-router-dom'

const SignUpNavbar = () => {
  return (
    <nav className='signUpNav'>
    <button
        onClick={() => Navigate("/register")}
        className={'signUpNavbar'}
      >SING UP</button>
    </nav>
  )
}

export default SignUpNavbar