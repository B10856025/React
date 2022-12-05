import React from 'react';
import HomePage from 'pages/HomePage';
import Layout from 'Layout';
// import Header from 'components/Header';
// import Products from 'components/Products';

class App extends React.Component{
    render(){
        return(
          // <div>
          //   <Header />
          //   <Products />
          // </div>
            <Layout>
                <HomePage />
            </Layout>
        );
    }
}
export default App;