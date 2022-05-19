export default function Image(props) {
  const { id, alt, src, loadFinished } = props;

  function loadComplete() {
    loadFinished(id);
  }

  return (
    <img
      src={src}
      alt={alt}
      onLoad={loadComplete}
    />
  );
}
