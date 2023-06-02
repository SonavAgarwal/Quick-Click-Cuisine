import React from 'react'
import './Order.css'

export const Order = ({column}) => {

    function getButtonText() {
        if (column == 1) {
            return "Start"
        }
        else if (column == 2) {
            return "Finish"
        }
        else if (column == 3) {
            return "Picked Up"
        }

        return "Broken"
    }
  return (
    <div className='order-card'>
        <div className='info'>
            <h1>4:20 PM</h1>
            <h1>666</h1>
            <h1>Rahul Ravi (123456789)</h1>

        </div>
        
        <div className='order-items'>
            <div className='items-list'>
                <h1>Sandwich</h1>
                <ul>
                    <li>Sourdough</li>
                    <li>Provolone</li>
                    <li>Roasted Turkey</li>
                    <li>Pepperoni</li>
                    <li>Black Olives</li>
                    <li>Black Olives</li>
                    <li>Pickles</li>
                    <li>Mayonnaise</li>
                </ul>
            </div>
            <div className='items-list'>
                <h1>Sides</h1>
                <ul>
                    <li>Orange</li>
                    <li>Hot Brewed Coffee</li>
                </ul>
            </div>
        </div>
        
        <button>{getButtonText()}</button>

    </div>
  )
}
