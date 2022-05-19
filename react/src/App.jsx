import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import Heading from './components/Heading';
import ImageGrid from './components/ImageGrid';
import FooterPagination from './components/FooterPagination';
import getImages from './helpers/get-images';
import scrollTop from './helpers/scroll-top';

function App() {
  let navigate = useNavigate();
  let location = useLocation();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(null);

  const [showPagination, setPagination] = useState(false);
  const [hideNextPage, setHideNextPage] = useState(false);
  const [maxPageSize, setMaxPageSize] = useState(2);

  useEffect(() => {
    const { state } = location;
    async function retrieve() {
      if (!state || !state.search) return;
      let images = [];
      try {
        images = await getImages(state.search, state?.page);
      } catch (error) {
        console.error(error);
        images = [];
      }
      setImages(images);
      updatePagination(images.length);
      setLoading(false);
    }
    retrieve();
  }, [location]);

  useEffect(() => {
    const { state } = location;
    if (state && state.page) {
      setPage(state.page);
    }
    if (state && state.search) {
      setSearch(state.search);
    }
    if (state && state.maxPageSize) {
      setMaxPageSize(state.maxPageSize);
    }
  }, [location]);

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

  function changePage(newPage) {
    setLoading(true);
    scrollTop();
    setPage(newPage);
    let newMaxPageSize = newPage + 1;
    if (maxPageSize > newMaxPageSize) newMaxPageSize = maxPageSize;
    navigate(`/${search}/page/${newPage}`, {
      state: {
        page: newPage,
        search,
        maxPageSize: newMaxPageSize,
      },
    });
  }

  function changeQuery() {
    setLoading(true);
    setPage(1);
    setMaxPageSize(2);
    navigate(`/${search}`, {
      state: {
        page: 1,
        search,
        maxPageSize: 2,
      },
    });
  }

  return (
    <div className="App">
      <Heading term={search} setTerm={setSearch} search={changeQuery} />
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
