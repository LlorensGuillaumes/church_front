import { connect } from "react-redux";
import { login, logout } from './usersActions';

const mapStateToProps = (state) => {
    return{
      user: state.user,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      loginUser: (userData) => dispatch(login(userData)),
      logoutUser: () => dispatch(logout()),
    };
  };

  export const connectUser = connect(mapStateToProps, mapDispatchToProps);