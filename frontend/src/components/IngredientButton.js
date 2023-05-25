import React, { useState } from 'react';
import './font.css'

const IngredientButton = ({ name, color, width, isActive, onClick, children }) => {
  const buttonStyle = {
    backgroundColor: isActive ? color : 'white',
    color: isActive ? 'white' : color,
    border: '2px solid',
    borderColor: color,
    cursor: 'pointer',
    borderRadius: '1rem',
    width: width + '%', //8.5%
    height: '3rem',
    marginTop: '1rem',
    marginBottom: '1.5rem',
    marginRight: '2%',
    fontSize: '0.82rem',
    fontWeight: 'bold',
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {name}
    </button>
  );
};

const ButtonGroup = ( {data, color, width, maximum} ) => {
    const [selectedButtons, setSelectedButtons] = useState([]);
  
    const handleButtonClick = (buttonId) => {
    if(maximum !== 1) {
        if(selectedButtons.includes(buttonId) || selectedButtons.length === maximum) {
            setSelectedButtons(selectedButtons.filter((id) => id !== buttonId));
        }
        else if(selectedButtons.length < maximum) {
            setSelectedButtons([...selectedButtons, buttonId]);
        }
    }
    else if(maximum === 1) {
        if(selectedButtons.includes(buttonId)) {
            setSelectedButtons(selectedButtons.filter((id) => id !== buttonId));
        }
        else if(selectedButtons.length === maximum) {
            setSelectedButtons([buttonId]);
        }
        else if(selectedButtons.length < maximum) {
            setSelectedButtons([...selectedButtons, buttonId]);
        }
    }

    };
  
    return (
      <div>
        {data.map((button) => (
          <IngredientButton
            key={button.id}
            name={button.name}
            color={color}
            width={width}
            onClick={() => handleButtonClick(button.id)}
            isActive={selectedButtons.includes(button.id)}
          />
        ))}
      </div>
    );
  };

export default ButtonGroup;