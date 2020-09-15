import React, { useEffect,useState} from 'react';
// import '../static/css/articleList.css'
import { Table,Space, List ,Row ,Col , Modal ,message ,Button,Switch} from 'antd';
import Axios from 'axios'
import servicePath from '../config/apiUrl'
const { Column, ColumnGroup } = Table
const { confirm } = Modal

function ArticleList(props){
    const [ list,setList ]=useState([])
    
    //得到文章列表
    const getList = ()=>{
        Axios({
                method:'get',
                url: servicePath.getArticleList,
                withCredentials: true,
                header:{ 'Access-Control-Allow-Origin':'*' }
            }).then(
            res=>{
                setList(res.data.list)  

                }
            )
    }
    //删除文章的方法
    const delArticle = (id)=>{
        confirm({
            title: '确定要删除这篇博客文章吗?',
            content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
            onOk() {
                Axios(servicePath.delArticle+id,{ withCredentials: true}).then(
                    res=>{ 
                        message.success('文章删除成功')
                        getList()
                        }
                    )
            },
            onCancel() {
                message.success('没有任何改变')
            },
        });

    }
    //修改文章
    const updateArticle = (id,checked)=>{
        props.history.push('/index/add/'+id)
    }
    useEffect(()=>{
        getList()
    },[])
    return (
        <div>
            <Table dataSource={list} pagination={false}>
                <Column title="标题" align="center" dataIndex="title" key="title"></Column>
                <Column title="类别" align="center" dataIndex="typeName" key="typeName"></Column>
                <Column title="发布时间" align="center" dataIndex="addTime" key="addTime"></Column>
                <Column title="集数" align="center" dataIndex="part_count" key="part_count"></Column>
                <Column title="浏览量" align="center" dataIndex="view_count" key="view_count"></Column>
                <Column
                    title="操作"
                    align="center"
                    key="action"
                    render={(text, record) => (
                        <Space size="middle">
                            <Button type="primary" onClick={()=>updateArticle(record.id)} >修改</Button>&nbsp;
                            <Button onClick={()=>delArticle(record.id)}>删除</Button>
                        </Space>
                    )}
                />
            </Table>
        </div>
    )

}

export default ArticleList