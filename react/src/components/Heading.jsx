import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

export default function Heading(props) {
  const { term, setTerm, search } = props;

  function setHeading(event) {
    event.preventDefault();
    search();
  }

  return (
    <header>
      <h1>NASA Image Search</h1>
      <p>Allows for the searching of images in the NASA image API. Enter a search term below to get started.</p>
      <form onSubmit={setHeading}>
        <TextField
          fullWidth={true}
          onChange={({ target }) => setTerm(target.value)}
          value={term}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </form>
    </header>
  );
}
