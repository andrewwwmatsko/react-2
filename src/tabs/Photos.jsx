import { getPhotos } from 'apiService/photos';
import { Text, Form, PhotosGallery, Button, Loader } from 'components';
import { useEffect, useState } from 'react';

export const Photos = () => {
  const [searchValue, setSearchValue] = useState('');

  const [photos, setPhotos] = useState([]);

  const [error, setError] = useState('');

  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = value => {
    setSearchValue(value);
  };

  const handlerLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (!searchValue) return;

    const fetch = async () => {
      setIsLoading(true);
      try {
        const data = await getPhotos(searchValue, page);
        setPhotos(prevPhoto => {
          return [...prevPhoto, ...data.photos];
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [searchValue, page]);

  return (
    <>
      {isLoading && <Loader />}
      <Text textAlign="center">Let`s begin search 🔎</Text>

      <Form onSubmit={onSubmitHandler} />
      {error && <Text textAlign="center">{error}</Text>}
      <PhotosGallery photos={photos} />
      <Button onClick={handlerLoadMore}>Load more</Button>
    </>
  );
};
