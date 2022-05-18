export default function Image(props) {
  const { href, description, title } = props;

  const style = {
    height: '300px',
    backgroundImage: `url(${href})`,
  };

  return <div style={style}></div>
}
