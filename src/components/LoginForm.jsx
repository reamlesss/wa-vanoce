import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'



 function Login() {
    return (
        <Form>
            <Form.Group controlId='formLoginUsername'>
                <Form.Label>Username</Form.Label>
                <Form.Control type='username' placeholder='Username' />
            </Form.Group>

            <Form.Group controlId='formLoginPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password' />
            </Form.Group>
            <Button variant='primary' type='submit'>Login</Button>
        </Form>
    );
    
}

export default Login;