import styled from "styled-components";

export const TrailsDictionariesEditTable = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(17, 17, 18, 0.65);
  display: flex;
  justify-content: center;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  flex-direction: column;
  z-index: 1;
`;

export const ContainerForEditMenu = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px;
  color: white;
  backdrop-filter: blur(5.5px);
  padding: 20px;
  border: 0.5px solid rgba(90, 89, 89, 0.75);
  flex-direction: column;
  background: rgba(255, 255, 255, 0.95);
`;
