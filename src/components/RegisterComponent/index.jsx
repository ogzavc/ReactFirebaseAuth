import React, {useState, useRef} from 'react';
import {Form, Button,Card, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useAuth} from '../../contexts/AuthContext';
import { Link, useHistory } from "react-router-dom";

const RegisterComponent = ( ) => {
    
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {singup} = useAuth();
    const [error,setError]= useState('');
    const [loading,setLoading]= useState(false);
    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();
  
        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Girdiğiniz şifreler eşleşmiyor!');
        }  else if(passwordRef.current.value.length < 6) {
            return setError('Lütfen daha güçlü bir şifre seçin');
        } 

        try{
            setError('')
            setLoading(true)
            await singup(emailRef.current.value,passwordRef.current.value)
            history.push("/")
        } catch {
            setError('Kullanıcı oluşturulamadı')
        }

        setLoading(false)
    }

    return ( 
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Kayıt Ol</h2> 
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
                        <Form.Group id="password-confirm">
                            <Form.Label>
                                Şifre Doğrulama
                            </Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required /> 
                        </Form.Group>
                        <Button disabled={loading} className="w-100 btn-info" type="submit"> Kayıt </Button>
                    </Form>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2 bottom-text">
                Hesabınız var mı?  <Link to="/login">Giriş yapın</Link>
            </div>
        </>
    )
}

export default RegisterComponent;