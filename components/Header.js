import React,{useEffect,useState} from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Axios from 'axios'
import servicePath from '../config/apiUrl'
import '../styles/components/header.css'

import {Row,Col,Menu,Icon} from 'antd'

const Header = () => {
    const [navArray,setNavArray] = useState([])
    useEffect(()=>{
        const fetchData = async () =>{
            const result = await Axios(servicePath.getTypeInfo).then((res)=>{
                setNavArray(res.data.data)
                return res.data.data
            })
            setNavArray(result)
        }
        fetchData()
    },[])
    //跳转列表页
    const handleClick = (e) =>{
        if(e.key == 0) {
            Router.push('/')
        } else {
            Router.push('/list?id='+e.key)
        }
    }
    return (
        <div className="header">
        <Row type="flex" justify="center">
            <Col  xs={24} sm={24} md={10} lg={15} xl={12}>
                <span className="header-logo">
                    <Link href={{pathname:'/'}}>
                        <a>技术胖</a>
                    </Link>
                </span>
                <span className="header-txt">专注前端开发</span>
            </Col>
            <Col className="menu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                <Menu mode="horizontal"
                onClick={handleClick}>
                    <Menu.Item key="0">
                        首页
                    </Menu.Item>
                    {
                        navArray.map((item)=>{
                            return (
                                <Menu.Item key={item.Id}>
                                    {item.typeName}
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </Col>
        </Row>
    </div>
    )
}
    

export default Header