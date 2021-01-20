import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Wrapper, Form } from './App.styles.js';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    if (name && email) {
      const encodedName = encodeURIComponent(name);
      const encodedEmail = encodeURIComponent(email);

      const sentEmail = await (
        await fetch(
          `/.netlify/functions/sendEmail?userName=${encodedName}&userEmail=${encodedEmail}`
        )
      ).json();

      setIsSent(true);
      
      console.log(sentEmail);
    }
  };

  return (
    <Wrapper>
      {isSent ? (
        <div>Message sent.</div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <TextField
            value={name}
            onChange={e => setName(e.currentTarget.value)}
            label='Name'
            variant='outlined'
          />
          <TextField
            value={email}
            type='email'
            onChange={e => setEmail(e.currentTarget.value)}
            label='E-mail'
            variant='outlined'
          />
          <Button type='submit' variant='contained' color='primary'>
            Submit
          </Button>
        </Form>
      )}
    </Wrapper>
  );
};

export default App;
