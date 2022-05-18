import { useEffect, useState } from 'react'
import './App.css'
import Heading from './components/Heading';
import ImageGrid from './components/ImageGrid';
import FooterPagination from './components/FooterPagination';
import getImages from './helpers/get-images';

function App() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(null);

  const [showPagination, setPagination] = useState(false);
  const [hideNextPage, setHideNextPage] = useState(false);
  const [maxPageSize, setMaxPageSize] = useState(2);

  function updatePagination(imageListLength) {
    if (page === 1 && imageListLength < 100) {
      setPagination(false);
    } else if (imageListLength < 100) {
      setPagination(true);
      setHideNextPage(true);
    } else {
      setPagination(true);
      setHideNextPage(false);

      if (maxPageSize < page+1) {
        setMaxPageSize(page + 1);
      }
    }
  }

  useEffect(() => {
    async function retrieve() {
      if (search === '') return;
      let images = [];
      try {
        images = await getImages(search, page);
      } catch (error) {
        console.error(error);
        images = [];
      }
      setImages(images);
      updatePagination(images.length);
      setLoading(false);
    }
    retrieve();
  }, [search, page]);

  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function changePage(newPage) {
    scrollTop();
    setLoading(true);
    // set history
    setPage(newPage);
  }

  function changeQuery(newQuery) {
    setLoading(true);
    setPage(1);
    setMaxPageSize(2);
    setSearch(newQuery);
  }

  return (
    <div className="App">
      <Heading term={search} setTerm={changeQuery} />
      <ImageGrid images={images} loading={loading} />
      <FooterPagination
        defaultPageSize={maxPageSize}
        active={showPagination}
        showNextPage={hideNextPage}
        page={page}
        setPage={changePage}
      />
    </div>
  )
}

export default App
