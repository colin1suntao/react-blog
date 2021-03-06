import Head from 'next/head'
import React,{useState} from 'react'
import Link from 'next/link'
import {Row,Col,List,Icon} from 'antd'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Author from '../components/Author'
import Advert from '../components/Advert'
import '../styles/pages/index.css'
import Axios from 'axios'
import servicePath from '../config/apiUrl'
import marked from 'marked'
import hljs from "highlight.js"
import 'highlight.js/styles/monokai-sublime.css'

const Home = (list) => {
  const [ mylist , setMylist ] = useState(list.data)
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize:false,
    xhtml: false,
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }

  })
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List 
          header={<div>最新日志</div>}
          itemLayout="vertical"
          dataSource={mylist}
          renderItem={item => (
            <List.Item>
              <div className="list-title"> 
                <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                  <a>{item.title}</a>
                </Link>
              </div>
              <div className="list-icon">
                  <span>{item.addTime}</span>
                  <span>{item.typeName}</span>
                  <span>{item.view_count}</span>
              </div>
              <div className="list-context" dangerouslySetInnerHTML={{__html:marked(item.introduce)}}></div>  
            </List.Item>
          )}
           />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author/>
          <Advert/>
        </Col>
      </Row>
      <Footer/>
  </div>
  )
}
Home.getInitialProps = async ()=>{
  const promise = new Promise((resolve)=>{
    Axios(servicePath.getArticleList).then((res)=>{
      resolve(res.data)
    })
  })
  return await promise
}
export default Home
