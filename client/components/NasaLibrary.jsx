import React, { Component } from "react"
import request from "superagent"
import { render } from "enzyme"

class NasaLibrary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      photos: [],
      minDisplayCount: 0,
      maxDisplayCount: 10,
    }
  }
  componentDidMount() {
    request.get("http://localhost:3000/api/getPictures").then((response) => {
      let responseObject = JSON.parse(JSON.parse(response.text))

      responseObject.photos.forEach((imageObj, index) => {
        let joined = this.state.photos.concat(imageObj)
        this.setState({
          photos: joined,
        })
      })
    })
  }
  render() {
    return (
      <>
        <div>Hello world!</div>
        {this.state.photos
          .filter((photo, index) => {
            return (
              index >= this.state.minDisplayCount &&
              index <= this.state.maxDisplayCount
            )
          })
          .map((photo) => {
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
