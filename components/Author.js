import {Avatar,Divider} from 'antd'
import '../styles/components/author.css'

const Author =()=>{

    return (
        <div className="author-div comm-box">
            <div> <Avatar size={100} src=""  /></div>
            <div className="author-introduction">
                程序员，专注于WEB和移动前端开发。要录1000集免费前端视频的傻X。此地维权无门，此时无能为力，此心随波逐流。
                <Divider>社交账号</Divider>
                <Avatar size={28}  className="account"  />
                <Avatar size={28}  className="account" />
                <Avatar size={28}  className="account"  />

            </div>
        </div>
    )

}

export default Author