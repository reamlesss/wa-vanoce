import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function RegisterForm() {
    return (
        <Form>
            <Form.Group controlId='registerUsername'>
                <Form.Label>Username</Form.Label>
                <Form.Control type='username' placeholder='Username' />
            </Form.Group>
            <Form.Group controlId='registerEmail'>
                <Form.Label>E-mail</Form.Label>
                <Form.Control type='email' placeholder='sushi.sam@gmail.com' />
            </Form.Group>
            <Form.Group controlId='registerPassword'>
                  <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password' />
            </Form.Group>
             <Form.Group controlId='registerConfirmPassword'>
                  <Form.Label>Confirm password</Form.Label>
                <Form.Control type='password' placeholder='Confirm Password' />
            </Form.Group>
            <Button type='submit' variant='primary'>Register</Button>
        </Form>
    );
}

export default RegisterForm