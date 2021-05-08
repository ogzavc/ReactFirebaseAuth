import React, { useState } from 'react';
import { Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from "react-router-dom";

const Dashboard = () => {

     
    const [error,setError]= useState('');
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    async function handleLogout() {
        setError('')

        try{
            await logout()
            history.pushState('/')
        } catch{
            setError('')
        }
    }
      
    return ( 
        <>
            <Card>
                <Card.Body>
                <h2 className="text-center mb-4">Hesap</h2> 
                {error && <Alert variant="danger"> {error}</Alert>}
                <strong>Email: </strong> {currentUser.email}
                <Link to="/profile-update" className="btn btn-info w-100 mt-3">Hesabı Güncelle</Link>
                </Card.Body> 
            </Card>

            <div className="w-100 text-center mt-2 bottom-text">
                <Button variant="link" onClick={handleLogout}> Çıkıp Yap </Button>
            </div>
        </>
    )
}

export default Dashboard;