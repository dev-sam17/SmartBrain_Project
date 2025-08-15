import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, boxes}) => {
    return (
        <div className='center ma'>
           <div className='absolute mt2'>
           {imageUrl && (
               <>
                   <img alt='imageUrl' id='inputImage'  style={{width: '500px', height:'auto', borderRadius: '10px'}} src={imageUrl}/>
                   {boxes && boxes.map((box, index) => (
                       <div key={index} className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
                   ))}
               </>
           )}
           </div>
        </div>
    )
}


export default FaceRecognition;