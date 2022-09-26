// Write your JS code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import BlogItem from '../BlogItem'

import './index.css'

class BlogsList extends Component {
  state = {isLoading: true, blogsData: []}

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const formattedData = data.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      imageUrl: eachItem.image_url,
      avatarUrl: eachItem.avatar_url,
      author: eachItem.author,
      topic: eachItem.topic,
    }))
    this.setState({blogsData: formattedData, isLoading: false})
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
    </div>
  )

  render() {
    const {blogsData, isLoading} = this.state
    return (
      <div className="blog-list-container">
        {isLoading
          ? this.renderLoader()
          : blogsData.map(item => <BlogItem blogData={item} key={item.id} />)}
      </div>
    )
  }
}

export default BlogsList
