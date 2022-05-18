import Masonry from '@mui/lab/Masonry';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function ImageGrid(props) {
  const { images, loading } = props;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!images) return;
  if (!images.length) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <h2>There are no images for this page.</h2>
        <p>Consider going back a page, or trying another search term.</p>
      </Box>
    );
  }

  const ImageMap = images.map(({ href, title }) => {
    return (
      <img src={href} alt={title} loading="lazy" />
    );
  });

  return (
    <Masonry columns={{ xs: 3, sm: 4, md: 5, lg: 6}} spacing={2}>
      {ImageMap}
    </Masonry>
  );
}
