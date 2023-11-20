import styled from "styled-components";

export const HeaderContainer = styled.div(({ theme }) => {
  return `
  background: ${theme.palette.mode === "light" ? "#DBDEE1" : "#242526"};
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  min-height: 60px;
  align-items: center;
  color: ${theme.palette.primary};
  font-family: Roboto;
  box-shadow: 0px 0px 10px rgba(30, 30, 30, 0.2);

  .userIcon {
    color: ${theme.palette.text.primary}
  }

  .countrySelect {
    position: absolute;
    left: 0px;
  }

  .languageSelect {
    position: absolute;
    right: 140px;
  }

  .logout {
    position: absolute;
    right: 80px;
    cursor: pointer;
    color: ${theme.palette.text.primary};
  }

  .theme {
    position: absolute;
    right: 1rem;
    cursor: pointer;
    color: ${theme.palette.text.primary};
  }

  .container {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .button {
    cursor: pointer;
    padding: 5px;
    user-select: none;
  }

  .active {
    border-bottom: 1px solid ${theme.palette.text.primary};
  }

  .button:hover {
    color: ${theme.palette.text.secondary};
  }
`;
});
