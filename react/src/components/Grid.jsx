import Grid from '@mui/material/Grid';
import Image from './Image';

export default function ImageGrid(props) {
  const { images } = props;

  const ImageMap = images.map(({ href, description, title }) => {
    return (
      <Grid key={href} item xs={6} md={4} lg={3}>
        <Image href={href} description={description} title={title} />
      </Grid>
    );
  });

  return (
    <Grid container spacing={2}>
      {ImageMap}
    </Grid>
  );
}
