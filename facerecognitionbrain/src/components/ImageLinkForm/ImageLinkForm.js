import React from 'react';
import './from.css'

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return (
        <div >
            <p className="white f3">
                {'This Magic Brain will detect faces in your pictures.'}
            </p>
            <div className='center' >
                <div className='form center pa5 br3 shadow-5' style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex'}}>
                        <input className="f4 pa2 w-70 center" type='text' id='form' placeholder='Paste url of an image for face detection' onChange={onInputChange} />
                        {/* <button className='w-30 grow f4 link ph3 pv2 div white bg-navy' onClick={onSubmit}>Detect</button> */}
                    </div>
                    <div className='center' style={{ marginTop: '10px' }}>
                        <p>OR</p>
                        <input className="f4 pa2 w-70 center" type="file" id="fileInput" name="fileInput"></input>
                        <button className='w-30 grow f4 link ph3 pv2 div white bg-navy' onClick={onSubmit}>Detect</button>
                    </div>
                </div>

            </div>

        </div>
    )
}


export default ImageLinkForm;