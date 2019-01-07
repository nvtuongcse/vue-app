/*eslint-disable*/
export default {
  logOut( state , { ls }) {
    console.log('Mutation', state, ls)
    state.user.token = null;
    ls.remove('user');
  }
};