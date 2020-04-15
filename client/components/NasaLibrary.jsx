import React, { Component } from "react"
import request from "superagent"
import { render } from "enzyme"

class NasaLibrary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      photos: [],
      minDisplayCount: 0,
      maxDisplayCount: 9,
    }
  }
  prevPage = () => {
    if (this.state.minDisplayCount > 10) {
      this.setState({
        minDisplayCount: this.state.minDisplayCount - 10,
        maxDisplayCount: this.state.maxDisplayCount - 10,
      })
    }
  }
  nextPage = () => {
    if (this.state.maxDisplayCount < this.state.photos.length - 10) {
      this.setState(
        {
          minDisplayCount: this.state.minDisplayCount + 10,
          maxDisplayCount: this.state.maxDisplayCount + 10,
        },
        () => {
          console.log(this.state)
        }
      )
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
        <div className='galleryContainer'>
          {this.state.photos
            .filter((photo, index) => {
              return (
                index >= this.state.minDisplayCount &&
                index <= this.state.maxDisplayCount
              )
            })
            .map((photo) => {
              return (
                <div className='imgContainer'>
                  <img
                    className='image'
                    src={photo.img_src}
                    alt={`Photo on mars taken by ${photo.camera.full_name}`}
                  />
                </div>
              )
            })}
        </div>
        <button onClick={this.prevPage}>Prev</button>
        <button onClick={this.nextPage}>Next</button>
      </>
    )
  }
}

export default NasaLibrary
