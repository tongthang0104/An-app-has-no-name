import React, { Component }  from 'react';


export default class About extends Component {
  render(){

    return (
      <div>
      <h1>Trivardy Developers</h1>

        <tr>
          <a href='https://github.com/spencerbaird36' target='_blank'><img src='../../assets/pictures/github.png' /></a>
          <a href='https://www.linkedin.com/in/spencerbaird' target='_blank'><img src='../../assets/pictures/linkedin.png' /></a>
          <td><img src='../../assets/pictures/spencer-baird.jpeg' /></td>
          <td><h2 className="names">Spencer Baird</h2></td>

        </tr>

        <tr>
          <a href='https://github.com/tongthang0104' target='_blank'><img src='../../assets/pictures/github.png' /></a>
          <a href='https://www.linkedin.com/in/thangtong' target='_blank'><img src='../../assets/pictures/linkedin.png' /></a>
          <td><img src='../../assets/pictures/thang.jpeg' /></td>
          <td><h2 className="names">Thang Tong</h2></td>

        </tr>
        <tr>
          <a href='https://github.com/AndrewjMeng' target='_blank'><img src='../../assets/pictures/github.png' /></a>
          <a href='https://www.linkedin.com/in/andrewjmeng' target='_blank'><img src='../../assets/pictures/linkedin.png' /></a>
          <td><img src='../../assets/pictures/andrew.jpg' /></td>
          <td><h2 className="names">Andrew Meng</h2></td>
        </tr>
        <tr>
          <a href='https://github.com/mrinalini-m' target='_blank'><img src='../../assets/pictures/github.png' /></a>
          <a href='https://www.linkedin.com/in/mrinalini-manandhar-a518b326' target='_blank'><img src='../../assets/pictures/linkedin.png' /></a>
          <td><img src='../../assets/pictures/mrinalini.jpeg' /></td>
          <td><h2 className="names">Mrinalini Manandhar</h2></td>

        </tr>
      </div>
    );
  }
}
