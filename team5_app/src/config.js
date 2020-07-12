const dev = {
	socket_io_server: "http://127.0.0.1:5000"
}

const prod = {
	socket_io_server: "http://some.other.com"
}

const config = process.env.REACT_APP_STAGE === 'production'
  ? prod
  : dev

export default config