const blogs = [
    {
      id: '5a451df7571c224a31b5c8ce',
      title: 'HTML is easy',
      author: 'HTML Dude',
      url: 'http://127.0.0.1',
      user: {
        _id: '5a437a9e514ab7f168ddf138',
        username: 'mluukkai',
        name: 'Matti Luukkainen'
      }
    },
    {
      id: '5a451e21e0b8b04a45638211',
      title: 'Browser can execute only javascript',
      author: 'Albert Einstein',
      url: 'http://127.0.0.2',
      user: {
        _id: '5a437a9e514ab7f168ddf138',
        username: 'mluukkai',
        name: 'Matti Luukkainen'
      }
    },
    {
      id: '5a451e30b5ffd44a58fa79ab',
      title: 'The most important methods of HTTP are GET and POST',
      author: 'Jimmi Boi',
      url: 'http://127.0.0.3',
      user: {
        _id: '5a437a9e514ab7f168ddf138',
        username: 'mluukkai',
        name: 'Matti Luukkainen'
      }
    }
  ]
  
  const getAll = () => {
    return Promise.resolve(blogs)
  }
  
  export default { getAll }