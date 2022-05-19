import Masonry from '@mui/lab/Masonry';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function ImageGrid(props) {
  const { images, loading } = props;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '32px', mb: '16px' }}>
        <CircularProgress />
      </Box>
    )
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

  const ImageMap = images.map(({ href, title }) => {
    return (
      <img key={href} src={href} alt={title} loading="lazy" />
    );
  });

  return (
    <Masonry
      sx={{ mt: '16px', mb: '16px', width: 'calc(100% + 16px)' }}
      columns={{ xs: 2, sm: 4, md: 5, lg: 6}}
      spacing={2}
    >
      {ImageMap}
    </Masonry>
  );
}
