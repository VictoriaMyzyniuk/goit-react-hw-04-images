import { Searchbar } from 'components/Searchbar/Searchbar';
import { useState, useEffect } from 'react';
import * as API from 'services/getimages';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Container, ErrorMessage, Message } from 'components/App.styled';

export const App = () => {
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function loadImages() {
      if (query === '') {
        return;
      }
      try {
        setIsLoading(true);
        const receivedImages = await API.getImages(query, page);

        if (page === 1) {
          setTotal(receivedImages.total);
          setImages([...receivedImages.hits]);
        } else {
          setImages(images => [...images, ...receivedImages.hits]);
        }
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
        console.log(error.message);
      }
    }
    loadImages();
  }, [query, page]);

  const onLoadMore = () => {
    setPage(page + 1);
    setIsLoading(true);
  };

  const handleSubmitForm = values => {
    setQuery(values.searchQuery);
    setPage(1);
  };

  return (
    <Container>
      <Searchbar onSubmitProps={handleSubmitForm} />
      {isLoading && <Loader>Loading</Loader>}
      {error && (
        <ErrorMessage>An error has occurred, please, try again</ErrorMessage>
      )}
      {images && (
        <>
          {images.length === 0 && (
            <ErrorMessage>No pictures on this query! </ErrorMessage>
          )}

          <ImageGallery items={images} />

          {isLoading && <Loader>Loading</Loader>}
          {images.length > 0 && images.length !== total && (
            <Button onLoadMore={onLoadMore} />
          )}
          {isLoading && <Loader>Loading</Loader>}

          {images.length === total && !!images.length && (
            <Message>We show you all pictures!</Message>
          )}
        </>
      )}
    </Container>
  );
};
