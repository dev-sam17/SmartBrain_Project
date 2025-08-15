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
  const [box, setBox] = useState({});

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      topRow: clarifaiFace.top_row * height,
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height- (clarifaiFace.bottom_row * height),
    }
  }

  const displayFaceBox = (box) => {
    setBox(box);
  }

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const onSubmit = (event) => {
    setImageUrl(input);

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
    .then(result => displayFaceBox(calculateFaceLocation(result)))
    .catch(error => console.log('error', error));
  }

  return (
    <div className="App">
      <ParticleEffect />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
      <FaceRecognition box={box} imageUrl={imageUrl}/>
    </div>
  );
}

export default Home;