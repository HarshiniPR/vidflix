import React,{useState,useContext} from 'react'
import Form from '../components/form'
import { HeaderContainer } from '../containers/header'
import { useNavigate  } from 'react-router-dom';
import { FirebaseContext } from '../context/firebase';
import { FooterContainer } from '../containers/footers';
import * as ROUTES from '../constants/routes';


export default function SignUp(){

  const history=useNavigate();
 const {firebase} = useContext(FirebaseContext);
 const [firstName,setFirstName]=useState('');
 const [emailAddress,setEmailAddress]=useState('');
 const [password,setPassword]=useState('');
 const [error,setError]=useState('');

  const isInValid = firstName==='' || password==='' || emailAddress==='';

  const handleSignup=(event)=>{
    event.preventDefault();
    firebase
    .auth()
    .createUserWithEmailAndPassword(emailAddress, password)
    .then((result) =>
      result.user
        .updateProfile({
          displayName: firstName,
          photoURL: 1,
        })
        .then(() => {
          history.push(ROUTES.BROWSE);
        })
    )
    .catch((error) => {
      setFirstName('');
      setEmailAddress('');
      setPassword('');
      setError(error.message);
    });
    } ;
  return (
   <>
     <HeaderContainer>
       <Form>
         <Form.Title>Sign Up</Form.Title>
         {error && <Form.Error>{error}</Form.Error>}
       <Form.Base onSubmit={handleSignup} method="POST">
        <Form.Input placeholder="First Name" 
        type="text" 
        name="firstName" 
        value={firstName} 
        onChange={(target)=>setFirstName(target.value)}/>
        <Form.Input
              placeholder="Email address"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <Form.Input
              type="password"
              value={password}
              autoComplete="off"
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)}
            />

            <Form.Submit disabled={isInValid} type="submit" data-testid="sign-up">
              Sign Up
            </Form.Submit>
        
       </Form.Base>

       <Form.Text>
            Already a user? <Form.Link to="/signin">Sign in.</Form.Link>
          </Form.Text>
          <Form.TextSmall>
            This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.
          </Form.TextSmall>
       </Form>
     </HeaderContainer>
     <FooterContainer/>

   </>
  );
}
