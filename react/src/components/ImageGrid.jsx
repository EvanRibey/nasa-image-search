import Masonry from '@mui/lab/Masonry';

export default function ImageGrid(props) {
  const { images } = props;

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
