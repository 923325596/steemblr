import React, { Component } from "react";
import { hot } from "react-hot-loader";
import Header from "../Header/Header";
import styled from "styled-components";
import AddNew from "./AddNew";
import Sidebar from "./Sidebar";
import PostsLoader from "./PostsLoader";
import UserBlog from "./UserBlog";
import { connect } from "react-redux";
import Modal from "react-modal";
import FirstLoad from "./FirstLoad";
import checkProfile from "../Functions/Firebase/checkProfile";
import delay from "../Functions/delay";
import { Redirect } from "react-router-dom";
const Layout = styled.div`
  display: grid;
  margin-top: 3em;
  grid-template-columns: 17% 43% auto;
  grid-column-gap: 25px;
  grid-template-areas:
    "userBlog main sidebar"
  }
  @media (max-width: 768px) {
    grid-template-columns: 60% 35%;
    grid-template-areas:
    "main sidebar";
    grid-column-gap: 10px;
  }
  @media (max-width: 425px) {
    grid-template-columns: 100%;
    grid-template-areas:"main";
    margin-top: 2em;
  }
  @media (max-width: 375px) {
  }
`;
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1000;
  position: fixed;
  top: 0;
`;
const PostsContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  grid-area: main;
  @media (max-width: 2560px) {
  }
  @media (max-width: 1920px) {
  }
  @media (max-width: 1024px) {
  }
  @media (max-width: 768px) {
    margin-left: 25px;
  }
  @media (max-width: 425px) {
    margin-left: 0px;
    margin-right: 0px;
  }
  @media (max-width: 375px) {
    margin-left: 0px;
    margin-right: 0px;
  }
`;
const SidebarContainer = styled.div`
  padding-top: 23px;
  box-sizing: border-box;
`;
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      isOpen: false,
      username: "",
      logout: false
    };
    this.modalStyle = {
      content: {
        border: "0",
        padding: "0"
      }
    };
  }
  async componentDidMount() {
    await this.handleProps();
  }
  async handleProps() {
    const platform = this.props.login.platform;
    if (platform === "steem") {
      if (this.props.steemProfile.profile._id === undefined) {
        await delay(200);
        this.handleProps();
      } else {
        checkProfile(this.props.steemProfile.profile._id).then(value => {
          if (value === false) {
            this.setState({
              isOpen: true
            });
          } else if (value === "taken") {
            //For now when the blog name is taken you wont login with your steem account
            alert("This username is already taken you cant login");
            this.setState({
              logout: true
            });
          } else {
            this.setState({
              username: this.props.steemProfile.profile._id
            });
          }
        });
      }
    } else if (platform === "email") {
      this.setState({
        username: this.props.profile.displayName
      });
    }
  }
  handleFirstLoad() {
    this.setState({
      isOpen: true
    });
  }
  handleClose = () => {
    this.setState({
      isOpen: false
    });
  };
  render() {
    const { login } = this.props;
    const { logout, isOpen } = this.state;
    return (
      <div className="container">
        {login.status === false ? <Redirect to="/" /> : void 0}
        {logout && <Redirect to="/logout" />}
        <Modal isOpen={isOpen} style={this.modalStyle}>
          <FirstLoad handleClose={this.handleClose} />
        </Modal>
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        <Layout>
          <UserBlog username={login.username} platform={login.platform} />
          <PostsContainer>
            <AddNew />
            <PostsLoader />
          </PostsContainer>
          <SidebarContainer />
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  steemProfile: state.steemProfile,
  profile: state.profile,
  login: state.login
});
export default hot(module)(connect(mapStateToProps)(Home));
