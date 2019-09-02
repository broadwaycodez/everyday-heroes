const env = process.env.NODE_ENV;

const urls = {
  production: 'https://everyday-heroes-api.herokuapp.com',
  development: '',
  test: ''
};

export default urls[env];
