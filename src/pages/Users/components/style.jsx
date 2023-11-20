import { styled } from '@mui/material';
// import styled from 'styled-components';

export const StyledDiv = styled('div')(({ size }) => ({
    width: size,
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledDivHeader = styled('div')(({ size }) => ({
    width: size,
    textAlign: 'center'
}));
