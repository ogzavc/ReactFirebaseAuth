import React, {useState, useRef} from 'react';
import {Form, Button,Card, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useAuth} from '../../contexts/AuthContext';
import { Link, useHistory } from "react-router-dom";

const LoginComponent = () => {

    const emailRef = useRef();
    const passwordRef = useRef(); 
    const {login} = useAuth();
    const [error,setError]= useState('');
    const [loading,setLoading]= useState(false);
    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();

        if(passwordRef.current.value.length < 6) 
        {
            setError('Lütfen şifrenizi kontrol edin')
        } else {
            try{
                setError('')
                setLoading(true)
                await login(emailRef.current.value,passwordRef.current.value)
                history.push("/")
            } catch {
                setError('Giriş yapılamadı')
            }
        }

        setLoading(false)
    }

    return ( 
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Giriş</h2> 
                    {error && <Alert variant="danger"> {error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control type="email" ref={emailRef} required /> 
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>
                                Şifre
                            </Form.Label>
                            <Form.Control type="password" ref={passwordRef} required /> 
                        </Form.Group> 
                        <Button disabled={loading} className="w-100 btn-info" type="submit"> Giriş Yap </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                         <Link to="/forgot-password">Şifrenizi mi unuttunuz?</Link>
                    </div>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2 bottom-text">
                Hesabınız yok mu? <Link to="/signup">Kayıt Ol</Link>
            </div>
        </>
    )
}

export default LoginComponent;