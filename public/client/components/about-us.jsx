import React, { Component }  from 'react';


export default class About extends Component {
  render(){

    console.log("Ia m in about page right now")
    return (
      <div>
      <h1>Trivardy Developers</h1>

        <tr>
          <td><img src='../../assets/pictures/spencer-baird.jpeg' /></td>
          <a href='https://github.com/spencerbaird36' target='_blank'><img src='../../assets/pictures/github.png' /></a>
          <a href='https://www.linkedin.com/in/spencerbaird' target='_blank'><img src='../../assets/pictures/linkedin.png' /></a>
          <td><h2 className="names">Spencer Baird</h2></td>

        </tr>
        <tr>
          <td><img src='../../assets/pictures/thang.jpeg' /></td>
          <a href='https://github.com/tongthang0104' target='_blank'><img src='../../assets/pictures/github.png' /></a>
          <a href='https://www.linkedin.com/in/thangtong' target='_blank'><img src='../../assets/pictures/linkedin.png' /></a>
          <td><h2 className="names">Thang Tong</h2></td>

        </tr>
        <tr>
          <td><img src='../../assets/pictures/andrew.jpg' /></td>
          <a href='https://github.com/AndrewjMeng' target='_blank'><img src='../../assets/pictures/github.png' /></a>
          <a href='https://www.linkedin.com/in/andrewjmeng' target='_blank'><img src='../../assets/pictures/linkedin.png' /></a>
          <td><h2 className="names">Andrew Meng</h2></td>
        </tr>
        <tr>
          <td><img src='../../assets/pictures/mrinalini.jpeg' /></td>
          <a href='https://github.com/mrinalini-m' target='_blank'><img src='../../assets/pictures/github.png' /></a>
          <a href='https://www.linkedin.com/in/mrinalini-manandhar-a518b326' target='_blank'><img src='../../assets/pictures/linkedin.png' /></a>
          <td><h2 className="names">Mrinalini Manandhar</h2></td>

        </tr>
      </div>
    );
  }
}
