import TextField from '@mui/material/TextField';

export default function Heading(props) {
  const { term, setTerm } = props;

  return (
    <header>
      <h1>NASA Image Search</h1>
      <p>Allows for the searching of images in the NASA image API. Enter a search term below to get started.</p>
      <TextField
        label="Search Term"
        fullWidth={true}
        onChange={({ currentTarget }) => setTerm(currentTarget.value)}
        value={term}
      />
    </header>
  );
}
