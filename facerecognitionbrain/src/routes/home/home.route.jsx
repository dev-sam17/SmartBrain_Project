import { useState } from 'react';

import ImageLinkForm from '../../components/ImageLinkForm/ImageLinkForm';
import Logo from '../../components/Logo/Logo';
import Rank from '../../components/Rank/Rank';
import ParticleEffect from '../../components/Particles/Particles';
import FaceRecognition from '../../components/FaceRecognition/FaceRecognition';

import './home.style.css';

const Home = () =>  {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [boxes, setBoxes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const calculateFaceLocations = (data) => {
    return new Promise((resolve) => {
      const waitForImage = (attempts = 0) => {
        const image = document.getElementById('inputImage');
        
        if (!image && attempts < 10) {
          // Retry after a short delay
          setTimeout(() => waitForImage(attempts + 1), 50);
          return;
        }
        
        if (!image) {
          console.error('Image element not found after retries');
          resolve([]);
          return;
        }
        
        const calculateBoxes = () => {
          const width = Number(image.width);
          const height = Number(image.height);
          
          if (width === 0 || height === 0) {
            console.error('Image dimensions are zero');
            resolve([]);
            return;
          }
          
          const faceBoxes = data.outputs[0].data.regions.map(region => {
            const clarifaiFace = region.region_info.bounding_box;
            return {
              topRow: clarifaiFace.top_row * height,
              leftCol: clarifaiFace.left_col * width,
              rightCol: width - (clarifaiFace.right_col * width),
              bottomRow: height - (clarifaiFace.bottom_row * height),
            }
          });
          resolve(faceBoxes);
        };
        
        if (image.complete && image.naturalHeight !== 0) {
          calculateBoxes();
        } else {
          image.onload = calculateBoxes;
          image.onerror = () => {
            console.error('Image failed to load');
            resolve([]);
          };
        }
      };
      
      waitForImage();
    });
  }

  const displayFaceBoxes = (faceBoxes) => {
    setBoxes(faceBoxes);
  }

  const onReset = () => {
    setInput('');
    setImageUrl('');
    setBoxes([]);
    setIsLoading(false);
    // Clear file input
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = '';
    }
    // Clear text input
    const textInput = document.getElementById('form');
    if (textInput) {
      textInput.value = '';
    }
  }

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size too large. Please select an image smaller than 5MB.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Resize if image is too large
          const maxWidth = 1024;
          const maxHeight = 1024;
          let { width, height } = img;
          
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setInput(compressedDataUrl);
          setImageUrl(compressedDataUrl);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  const onSubmit = (event) => {
    if (!input) return;
    
    setIsLoading(true);
    
    // If input is not a data URL (file upload), set it as imageUrl
    if (!input.startsWith('data:')) {
      setImageUrl(input);
    }

    fetch('http://localhost:3001/imageurl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: input
      })
    })
    .then(response => response.json())
    .then(result => {
      setIsLoading(false);
      if (result.outputs && result.outputs[0].data.regions) {
        // Wait for next tick to ensure image is rendered
        setTimeout(() => {
          calculateFaceLocations(result).then(faceBoxes => {
            displayFaceBoxes(faceBoxes);
          });
        }, 100);
      } else {
        console.log('No faces detected');
      }
    })
    .catch(error => {
      setIsLoading(false);
      console.log('error', error);
    });
  }

  return (
    <div className="App">
      <ParticleEffect />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onFileChange={onFileChange} onSubmit={onSubmit} onReset={onReset} />
      {isLoading ? (
        <div className="center ma">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p className="white f3 mt3">Detecting faces...</p>
          </div>
        </div>
      ) : (
        <FaceRecognition boxes={boxes} imageUrl={imageUrl}/>
      )}
    </div>
  );
}

export default Home;