import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function AlertError(message) {
    return <Stack sx={{ width: '100%' }} spacing={2}>
    <Alert variant="filled" severity="error">
      {message}
    </Alert>
  </Stack>
}

export default AlertError