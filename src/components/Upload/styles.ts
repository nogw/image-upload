import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  border-radius: 6px;
  padding: 20px;
  width: 320px;
  box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.1);
`;

const getColor = (props: any) => {
  if (props.isDragAccept) {
      return '#00e676';
  }
  if (props.isDragReject) {
      return '#ff1744';
  }
  if (props.isDragActive) {
      return '#2196f3';
  }
  return '#9034e0';
}

export const DropzoneContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  white-space: nowrap;
  cursor: pointer;
  word-break: break-all;
  transition: all ease 200ms;
  border: 2px dashed ${props => getColor(props)};
  color: ${props => getColor(props)};
`
export const File = styled.div`
  display: flex;
  
  h3 {
    font-size: 14px;
  }

  .file__name {
    margin-right: auto;
    color: #212121
    font-weight: 500;
  }

  .file__size {
    color: #aeaeae;
    font-weight: 500;
  }
`;