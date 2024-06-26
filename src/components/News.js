// import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import NewsContext from '../context/NewsContext';
import { useContext } from 'react';

const News = (props) => {
    const { filterApply } = props

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updatenews = async () => {
        props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url)
        props.setProgress(30)
        let parsedData = await data.json()
        props.setProgress(70)
        // console.log(parsedData)
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)

        props.setProgress(100)

    }
    useEffect(() => {
        document.title = `VNews-${capitalizeFirstLetter(props.category)}`
        updatenews()
        // eslint-disable-next-line
    }, [])


    // const handlePrevClick = async () => {
    //     setPage(page-1)
    //     updatenews()
    // }
    // const handleNextClick = async () => {
    //     setPage(page+1)
    //     updatenews()
    // }
    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
        setPage(page + 1)
        // this.setState({ loading: true })
        let data = await fetch(url)
        let parsedData = await data.json()
        // console.log(parsedData)
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)

    };

    return (
        <div className='container my-3'>
            <h1 className="text-center" style={{ marginTop: "90px" }}>VNews top {capitalizeFirstLetter(props.category)} headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">


                    <div className="row">

                        {articles.filter((element) => {
                            return filterApply.toLowerCase() === '' ? element : element.title.toLowerCase().includes(filterApply)
                        }).map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <Newsitem title={element.title} description={element.description} imageurl={element.urlToImage ? element.urlToImage : "https://blank.page/ogimage.png"} newsurl={element.url} author={element.author} date={element.publishedAt} />
                                </div>
                            })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div> */}
        </div>
    )

}
News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
export default News

// .filter((element) =>{
//     return filterApply.toLowerCase() === '' ? element : element.articles.title.toLowerCase().includes(filterApply)
// })

// .filter((element) =>{
//     return filterApply.toLowerCase() === '' ? element : console.log(element.articles.title)
// })