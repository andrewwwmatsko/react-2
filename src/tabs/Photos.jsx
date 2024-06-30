import { getPhotos } from 'apiService/photos';
import { Text, Form } from 'components';
import { useEffect, useState } from 'react';

export const Photos = () => {
  const [searchValue, setSearchValue] = useState('');

  const [photos, setPhotos] = useState([]);

  const [error, setError] = useState('');

  const onSubmitHandler = value => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (!searchValue) return;

    const fetch = async () => {
      try {
        const data = await getPhotos(searchValue);
        setPhotos(data.photos);
      } catch (error) {
        setError(error.message);
      }
    };

    fetch();
  }, [searchValue]);

  return (
    <>
      <Text textAlign="center">Let`s begin search 🔎</Text>

      <Form onSubmit={onSubmitHandler} />
    </>
  );
};
