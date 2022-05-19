import { useState } from 'react';
import Masonry from '@mui/lab/Masonry';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Image from './Image';

export default function ImageGrid(props) {
  const { images } = props;
  const [imageLoading, setImageLoading] = useState(
    images ? new Array(images.length).fill(false) : [],
  );

  const isLoading = imageLoading.some((loadState) => loadState === false);

  function loadFinished(id) {
    console.log(id);
    setImageLoading((prev) => {
      const clone = [...prev];
      clone[id] = true;
      return clone;
    });
  }

  if (!images) return;
  if (!images.length) {
    return (
      <Box sx={{ mt: '16px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <h2>There are no images for this page.</h2>
        Consider going back a page, or trying another search term.
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '32px', mb: '16px' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Masonry
      sx={{ mt: '16px', mb: '16px', width: 'calc(100% + 16px)' }}
      columns={{ xs: 2, sm: 4, md: 5, lg: 6}}
      spacing={2}
    >
      {images.map(({ href, title }, index) => {
        return (
          <Image
            key={href}
            id={index}
            src={href}
            alt={title}
            loadFinished={loadFinished}
          />
        );
      })}
    </Masonry>
  );
}
