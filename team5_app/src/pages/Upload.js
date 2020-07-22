import React, {useReducer, useState} from 'react';
import DragNDrop from '../components/DragNDrop';
import Button from 'react-bootstrap/Button';






function Upload( props ) {

	const reducer = (state, action) => {
	  switch (action.type) {
		case 'SET_DROP_DEPTH':
		  return { ...state, dropDepth: action.dropDepth }
		case 'SET_IN_DROP_ZONE':
		  return { ...state, inDropZone: action.inDropZone };
		case 'ADD_FILE_TO_LIST':
		  return { ...state, fileList: state.fileList.concat(action.files) };
		default:
		  return state;
  	  }
	};
	const [button, setButton] = useState(false)

	const [data, dispatch] = useReducer(
	  reducer, { dropDepth: 0, inDropZone: false, fileList: [] }
	)

	const handleClick = () => document.location.reload(true)

  return (
    <div className='basic-page'>
      <h1> Message/Video Upload </h1>
      <br />
      <br />
      <DragNDrop data = { data } dispatch = {dispatch} setButton = {setButton} />
      <ol className="dropped-files">
   		 {data.fileList.map(f => {
           return (
              <li key={f.name}>{f.name}</li>
           )
          })}
      </ol>
      <Button variant="primary" onClick= {handleClick }  disabled = {!button}>
      	Submit
      </Button>
    </div>
  );
}

export default Upload;
