import React, {useState, useRef} from 'react';
import {Form, Button,Card, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useAuth} from '../../contexts/AuthContext';
import { Link, useHistory } from "react-router-dom";

const UpdateProfile = ( ) => {
    
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updatePassword, updateEmail } = useAuth();
    const [error,setError]= useState('');
    const [loading,setLoading]= useState(false);
    const history = useHistory();

    function handleSubmit(e){
        e.preventDefault();
  
        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Şifreler Eşleşmiyor');
        }  

        const promises = []
        setLoading(true)
        setError('')
        if(emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }

        if(passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push('/')
        }).catch( () => {
            setError('Şifre güncellenirken hata oluştu')
        }).finally(() => {
            setLoading(false) 
        })
  
    }

    return ( 
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Hesabını Güncelle</h2> 
                    {error && <Alert variant="danger"> {error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} /> 
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>
                                Şifre
                            </Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder="Değiştirmek için yeni şifrenizi girin" /> 
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>
                                Şifre Doğrulama
                            </Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} placeholder="Değiştirmek için yeni şifrenizi girin"/> 
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit btn-info"> Güncelle </Button>
                    </Form>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2 bottom-text"> 
                <Link to="/"> Cancel </Link>
            </div>
        </>
    )
}

export default UpdateProfile;