import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  border-radius: 6px;
  padding: 20px;
  width: 380px;
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
  font-size: 1.1rem;
  word-break: break-all;
  transition: all ease 200ms;
  border: 2px dashed ${props => getColor(props)};
  color: ${props => getColor(props)};
`

interface IPropsProgress {
  progress: string,
  copy: boolean
}

export const File = styled.div<IPropsProgress>`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  
  h3 {
    font-size: 16px;
  }

  .file__info {
    display: flex;
    .file__name {
      margin-right: auto;
      color: #212121;
      font-weight: 500;
      width: 230px;
      text-overflow: ellipsis;
      overflow: hidden; 
      white-space: nowrap;
    }

    .file__size {
      color: #aeaeae;
      font-weight: 500;
    }
  }

  .bar {
    position: relative;
    margin-top: 4px;

    .bar__gray {
      position: absolute;
      width: 100%;
      background-color: #aeaeae;
      border-radius: 2.5px;
      height: 5px;
    }
    .bar__purple {
      position: absolute;
      width: ${props => props.progress || '0%'};
      border-radius: 2.5px;
      background-color: ${props => props.progress === "100%" ? '#00e676' : '#9034e0'};;
      height: 5px;
    }
  }

  .link {
    margin-top: 15px;
    display: flex;
    width: 100%;

    .text {
      background-color: #e7e7e7;
      flex: 1;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;

      p {
        padding: 10px;
        font-size: 15px;
        width: 300px;
        text-overflow: ellipsis;
        overflow: hidden; 
        white-space: nowrap;
      }
    }

    .copy {
      transition: all 200ms ease;
      background-color: ${props => props.copy ? '#00e676' : '#9034e0'};
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      cursor: pointer;
      border: none;
      outline: none;

      .icon {
        color: #000;
        color: #000;
        transition: all 100ms ease;
      }

      &:active > .icon {
        transform: scale(1.3);
      }
    }
  }
`;