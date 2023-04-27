import { Box, styled } from "@mui/material";

export const HomeContainerStyled = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 6rem;
`;

export const HomeHeaderTextContainerStyled = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
`;

export const HomeActionButtonsContainerStyled = styled(Box)`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  & button {
    font-size: 1rem;
  }

  & .MuiButton-text {
    text-transform: none;
  }
`;
