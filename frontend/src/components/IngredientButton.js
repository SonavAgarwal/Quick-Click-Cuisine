import React, { useState, useEffect } from 'react';
import './font.css'

const IngredientButton = ({ name, color, width, isActive, onClick, shouldDisplayCircle, quantity, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    position: 'relative',
    backgroundColor: isActive ? color : 'white',
    color: isActive ? 'white' : color,
    border: '2px solid',
    borderColor: color,
    cursor: 'pointer',
    borderRadius: '1rem',
    width: width + '%',
    height: '3rem',
    margin: '15px',
    fontSize: '0.82rem',
    fontWeight: 'bold',
    transition: 'transform 0.6s ease-out',
    transform: isHovered ? 'translateY(9px)' : 'translateY(0)',
  };

  const circleStyle = {
    position: 'absolute',
    width: '25px',
    height: '25px',
    backgroundColor: 'white',
    borderRadius: '50%',
    borderStyle: 'solid',
    borderColor: color,
    color: color,
    textAlign: 'center',
    display: 'grid',
    alignItems: 'center',
    fontSize: '0.77rem',
    top: '-10px',
    right: '-10px',
  }

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
  };

  return (
        <button style={buttonStyle} onClick={onClick} onMouseEnter={handleHover} onMouseLeave={handleHoverEnd}>
        {shouldDisplayCircle && <span style={circleStyle}>{quantity}</span>}
        {name}
        </button>
  );
};

const ButtonGroup = ( {name, data, color, width, maximum, setRequiredSelected, onSelectedButtonsChange} ) => {
    const [selectedButtons, setSelectedButtons] = useState([]);
    const [ingredientQuantity, setIngredientQuantity] = useState(data.map(() => 0));

    useEffect(() => {
        onSelectedButtonsChange(selectedButtons);
    }, [selectedButtons, onSelectedButtonsChange]);

    const incrementQuantity = (index, amount) => {
        const updatedCounters = [...ingredientQuantity];
        updatedCounters[index] += amount;
        setIngredientQuantity(updatedCounters);
    };

    const decrementQuantity = (index, amount) => {
        const updatedCounters = [...ingredientQuantity];
        updatedCounters[index] -= amount;
        setIngredientQuantity(updatedCounters);
    };

    let shouldDisplayCircle = true;

    if(maximum === 1) {
        shouldDisplayCircle = false;
    }
  
    const handleButtonClick = (buttonId) => {
    if(maximum !== 1) {
        if(selectedButtons.length === maximum && selectedButtons.includes(buttonId)) {
            decrementQuantity(buttonId - 1, ingredientQuantity[buttonId - 1]);
            setSelectedButtons(selectedButtons.filter((id) => id !== buttonId));
        }
        else if(selectedButtons.length < maximum) {
            incrementQuantity(buttonId - 1, 1);
            setSelectedButtons([...selectedButtons, buttonId]);
        }
    }
    else if(maximum === 1) {
        if(selectedButtons.includes(buttonId)) {
            setSelectedButtons(selectedButtons.filter((id) => id !== buttonId));
            if(name === "bread" || name === "green") {
                setRequiredSelected(false);
            }
        }
        else if(selectedButtons.length === maximum) {
            setSelectedButtons([buttonId]);
            if(name === "bread" || name === "green") {
                setRequiredSelected(true);
            }
        }
        else if(selectedButtons.length < maximum) {
            setSelectedButtons([...selectedButtons, buttonId]);
            if(name === "bread" || name === "green") {
                setRequiredSelected(true);
            }
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
            shouldDisplayCircle={shouldDisplayCircle && selectedButtons.includes(button.id)}
            quantity={ingredientQuantity[button.id - 1]}
          />
        ))}
      </div>
    );
  };

export default ButtonGroup;