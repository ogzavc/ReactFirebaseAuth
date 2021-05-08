import React, {useState, useRef} from 'react';
import {Form, Button,Card, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useAuth} from '../../contexts/AuthContext';
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  
    const emailRef = useRef(); 
    const { resetPassword } = useAuth();
    const [error,setError]= useState('');
    const [message,setMessage]= useState('');
    const [loading,setLoading]= useState(false); 

    async function handleSubmit(e){
        e.preventDefault();

        try{
            setMessage('')
            setError('') 
            setLoading(true)
            await resetPassword(emailRef.current.value) 
            setMessage('Devam edebilmek için gönderilen email ile gönderilen adımlarını takip edin')
        } catch {
            setError('Şifre sıfırlanırken hata oluştu')
        }

        setLoading(false)
    }

    return ( 
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Reset Sıfırlama</h2> 
                    {error && <Alert variant="danger"> {error}</Alert>}
                    {message && <Alert variant="success"> {message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control type="email" ref={emailRef} required /> 
                        </Form.Group> 
                        <Button disabled={loading} className="w-100 btn-info" type="submit"> Şifremi Sıfırla </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                         <Link to="/login">Giriş</Link>
                    </div>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2 bottom-text">
                Üye değil misin? <Link to="/signup">Kayıt Ol</Link>
            </div>
        </>
    )
} 