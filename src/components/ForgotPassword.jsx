import { Alert } from 'bootstrap'
import React, {useRef, useState} from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import {useAuth} from '../context/AuthContext'
import {Link, useHistory} from 'react-router-dom'

function ForgotPassword() {
    const emailRef = useRef()
    
    const resetPassword = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()
       
        try{
            setMessage('')
            setError('')
            setLoading(true)
          await resetPassword(emailRef.current.value)
          setMessage("Check your inbox for further instructions")
           
        }
        catch{
            setError('Failed to Reset Password')
        }
        setLoading(false)
    }
    return (
        <>
          <Card>
              <Card.Body>
                <h2 className="text-center mb-4">Password Reset</h2>
                
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>
                            Email
                        </Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Reset Password</Button>
                </Form>
                <div className="w-100 text-center mt-3">
                    <Link to ="/login">Login</Link>
                </div>
              </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
              Need an account? <Link to ="/signup">Sign Up</Link>
              {/* Link => using router */}
        </div>  
        </>
    )

}

export default ForgotPassword
