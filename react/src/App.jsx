import { useEffect, useState } from 'react'
import './App.css'
import Heading from './components/Heading';
import ImageGrid from './components/Grid';
import getImages from './helpers/get-images';

function App() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function retrieve() {
      if (search === '') return;
      const images = await getImages(search, page);
      setImages(images);
    }
    retrieve();
  }, [search, page]);

  return (
    <div className="App">
      <Heading term={search} setTerm={setSearch} />
      <ImageGrid images={images} />
    </div>
  )
}

export default App
