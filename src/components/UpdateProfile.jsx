import { Alert } from 'bootstrap'
import React, {useRef, useState} from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import {useAuth} from '../context/AuthContext'
import {Link, useHistory} from 'react-router-dom'


function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef= useRef()
    const passwordConfirmRef = useRef()
    const {currentUser, updateEmail, updatePassword } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

 function handleSubmit(e){
        e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    setError("")
      setLoading(true)
    const promises = []
    if(emailRef.current.value !== currentUser.email){
        promises.push(updateEmail(emailRef.current.value))
    }

    if(passwordRef.current.value){
        promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises).then(()=>{
        history.push("/")
    }).catch(()=>{
        setError("failed to update")
    }).finally(()=>{
        setLoading(false)
    })

    try {
      setError("")
      setLoading(true)
      //await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
    }
    return (
        <>
          <Card>
              <Card.Body>
                <h2 className="text-center mb-4">Update Profile</h2>
                
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>
                            Email
                        </Form.Label>
                        <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>
                        Password
                        </Form.Label>
                        <Form.Control type="password" ref={passwordRef} required placeholder="Leave Blank to keep the same"/>
                    </Form.Group>
                    <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
                   
                    <Button disabled={loading} className="w-100" type="submit">Update</Button>
                </Form>
                <div className="w-100 text-center mt-3">
                    <Link to ="/forgot-password">Forgot Password?</Link>
                </div>
              </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
             <Link to ="/">Cancel</Link>
              {/* Link => using router */}
        </div>  
        </>
    )
}

export default UpdateProfile;


