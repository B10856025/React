import React from 'react';
import axios from 'axios';
import './test.css'

class test extends React.Component{

    state = {     //更新狀態
      nickname: '',
      email: '',
      password: '',
      posts: []
    }

    componentDidMount = () => {
      this.getUserPost();
    }

    getUserPost = () => {   //從服務器取得資料
      axios.get('/api')
        .then((response) => {
          const data = response.data;
          this.setState({ posts: data });
          console.log('Data has been received!!');
        })
        .catch(() => {
          alert('Error retrieving data!');
        });
    }

    handleChange = ({ target }) => {   //訪問e從轉儲中傳入的所有事件數據
      const { name, value } = target;
      
      this.setState({[name]: value});
    };
    
    submit = (event) => {
      event.preventDefault();

      const payload = {   //負載
        nickname: this.state.nickname,
        email: this.state.email,
        password: this.state.password
      };
      axios({
        url: '/api/save',   //使用該端口與我們的服務器通信 對特定路線 命令他們發回這些數據
        method: 'POST',
        data: payload
      })  //發出post請求 進行http調用 向服務器發送數據
        .then(() => {
          console.log('Data has been sent to the server.');
          this.resetUserInputs();
          this.getUserPost();
        })
        .catch(() => {
          console.log('Internal server error');
        });
    };

    resetUserInputs = () => {
      this.setState({
        nickname: '',
        email: '',
        password: ''
      });
    };

    displayUserPost = (posts) => {   //顯示
      if (!posts.length) return null;

      return posts.map((post, index) => (
        <div key={index} className="user-post_display">
          <h3>{post.nickname}</h3>
          <h3>{post.email}</h3>
          <h3>{post.password}</h3>
        </div>
      ));
    };

    render(){
        console.log('State: ', this.state);
        //JSX
        return(
            <div className="app">
              <h2>welcome</h2>
              <form onSubmit={this.submit}>
                <div className="form-input">
                  <input
                    type="text"
                    name="nickname"
                    placeholder="nickname"
                    value={this.state.nickname}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-input">
                  <input
                    type="text"
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-input">
                  <textarea
                    placeholder="password" 
                    name="password" 
                    cols="30" 
                    rows="10" 
                    value={this.state.password} 
                    onChange={this.handleChange}
                  />
                </div>
                
                <button>Submit</button>

              </form>
              <div className="user-post">
                {this.displayUserPost(this.state.posts)}
              </div> 
            </div>
        );
    }
}
export default test;