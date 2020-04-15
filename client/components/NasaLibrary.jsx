import React, { Component } from "react"
import request from "superagent"
import { render } from "enzyme"

class NasaLibrary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      photos: [],
    }
  }
  componentDidMount() {
    request
      .get("http://localhost:3000/api/getPictures")
      .then((response) => {
        let responseObject = JSON.parse(JSON.parse(response.text))

        let joined = this.state.photos.concat(responseObject.photos[0])
        this.setState({
          photos: joined,
        })
      })
      .then(() => {
        console.log(this.state.photos)
      })
  }
  render() {
    return (
      <>
        <div>Hello world!</div>
        {this.state.photos.map((photo) => {
          return (
            <img
              src={photo.img_src}
              alt={`Photo on mars taken by ${photo.camera.full_name}`}
            />
          )
        })}
      </>
    )
  }
}

export default NasaLibrary
