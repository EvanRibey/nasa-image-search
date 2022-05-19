import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

export default function FooterPagination(props) {
  const {
    active,
    page,
    setPage,
    showNextPage,
    defaultPageSize,
  } = props;
  
  if (!active) return;

  function pageChange(_event, newPage) {
    setPage(newPage);
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      pt: '24px',
    }}>
      <Pagination
        count={defaultPageSize}
        defaultPage={1}
        page={page}
        onChange={pageChange}
        hideNextButton={showNextPage}
      />
    </Box>
  );
}
