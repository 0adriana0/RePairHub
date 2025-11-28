import { useNavigate } from 'react-router-dom'

const SignUpNavbar = () => {
  const navigate = useNavigate()

  const styles = {
      container: {
      display: 'flex',
      justifyContent: 'center',
      position: 'absolute',
        top: '68px',
        left: '30%',
        right: '30%'
    },
    btn: {
      textAlign: 'center',
      border: 'none',
      backgroundColor: '#0E725F',
      borderRadius: '26px',
      padding: '15px 25px',
      cursor: 'pointer',
      fontWeight: 'bold',
      height: 'fit-content',
      color: 'white',
      fontSize: '16px'
    }
  }

  return (
    <nav style={styles.container}>
    <button
        onClick={() => navigate("/register")}
        style={styles.btn}
      >SING UP</button>
    </nav>
  )
}

export default SignUpNavbar