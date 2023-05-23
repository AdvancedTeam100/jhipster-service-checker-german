import React, { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

type Props = {
  name: string;
  ipAddress: string;
  port: string;
};

export default function ServiceStatus({ name, ipAddress, port }: Props): JSX.Element {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const ws = new WebSocket(`ws://${ipAddress}:${port}`);

    ws.onopen = () => {
      setStatus('on');
      setLoading(false);
      setDate(new Date());
      ws.close();
    };

    ws.onerror = () => {
      setStatus('on');
      setDate(new Date());
      setLoading(false);
    };
  }, [ipAddress, port]);

  if (loading) {
      setStatus('off');
      setDate(new Date());
      setLoading(false);
  }
  
  function check(){
    setLoading(true); // set loading state to true when check button is clicked
    const ws = new WebSocket(`ws://${ipAddress}:${port}`);
    
    ws.onopen = () => {
        setStatus('on');
        setLoading(false);
        setDate(new Date());
        ws.close();
      };
  
      ws.onerror = () => {
        setStatus('on');
        setDate(new Date());
        setLoading(false);
      };
  }

  return (
    <TableRow key={name}>
      <TableCell>{name}</TableCell>
      <TableCell>{ipAddress}</TableCell>
      <TableCell>{port}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>{date.toLocaleString()}</TableCell>
      <TableCell><Button variant="contained" color="primary" onClick={check}>check</Button></TableCell>
    </TableRow>
  );
}