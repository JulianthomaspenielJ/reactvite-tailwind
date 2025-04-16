import React from 'react'
import './Card.css'
const Card = () => {
  return (
    <>
     <div class="wrapper">
        <div class="containers">
            <input type="radio" name="slide" id="c1" checked />
            <label for="c1" class="card">
                <div class="row">
                    <div class="icon">1</div>
                    <div class="description">
                        <h4></h4>
                        <p></p>
                    </div>
                </div>
            </label>

            <input type="radio" name="slide" id="c2" />
            <label for="c2" class="card">
                <div class="row">
                    <div class="icon">2</div>
                    <div class="description">
                        <h4></h4>
                        <p></p>
                    </div>
                </div>
            </label>

            <input type="radio" name="slide" id="c3" />
            <label for="c3" class="card">
                <div class="row">
                    <div class="icon">3</div>
                    <div class="description">
                        <h4></h4>
                        <p></p>
                    </div>
                </div>
            </label>

            <input type="radio" name="slide" id="c4" />
            <label for="c4" class="card">
                <div class="row">
                    <div class="icon">4</div>
                    <div class="description">
                        <h4></h4>
                        <p></p>
                    </div>
                </div>
            </label>
        </div>
    </div>

    </>
  )
}

export default Card