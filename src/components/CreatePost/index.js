import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';


import { useApi } from '../../hooks/useApi'
import { useNavigate } from 'react-router-dom';

export const CreatePost = () => {
  const api = useApi();
  const [value, setValue] = useState('https://pearl-store.ru/local/templates/kvokka/components/bitrix/catalog.element/catalog/images/no-image.jpg');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      target: { title, text, image, tags },
    } = event;

    api.addPost({
      title: title.value,
      text: text.value,
      image: image.value,
      tags: tags.value.split(",").map((item) => item.trim()),
    }).then((data) => navigate('/'))

  };



  return (
    <Container >

      <form onSubmit={handleSubmit}>
        <Button variant="contained" style={{ marginBottom: '20px', marginRight: '10px' }} onClick={() => navigate('/')} >Назад</Button>
        <Button variant="contained" type='submit' style={{ marginBottom: '20px' }}>Добавить пост</Button>
        <Grid container >
          <Grid container item flexDirection='column' xs={6}>
            <Grid item>
              <TextField sx={{ width: '50ch' }} label="Заголовок" name="title" variant="filled" required helperText=" " />
            </Grid>
            <Grid item>
              <TextField 
              sx={{ width: '50ch' }} 
              label="Текст" 
              name="text" 
              variant="filled" 
              helperText=" " 
              multiline
              required
              maxRows={4}
              />
            </Grid>
            <Grid item>
              <TextField sx={{ width: '50ch' }} label="Картинка" name="image" variant="filled" helperText=" " onChange={handleChange} />
            </Grid>
            <Grid item>
              <TextField sx={{ width: '50ch' }} label="Тэги" name="tags" variant="filled" helperText="Указываются через запятую" />
            </Grid>
          </Grid>

          <Grid container item xs={6}>
            <Grid item>
              <img
                src={`${value}`}
                alt='image'


                style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  display: 'block',
                  maxHeight: 450,
                  maxWidth: 450,
                }} />
            </Grid>
          </Grid>

        </Grid>
      </form>

    </Container>
  )
}
