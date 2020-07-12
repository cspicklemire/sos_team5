const dev = {
	socket_io_server: "http://127.0.0.1:5000"
}

const prod = {
	socket_io_server: "http://ec2-3-18-105-26.us-east-2.compute.amazonaws.com:5000/"
}

const config = process.env.REACT_APP_STAGE === 'production'
  ? prod
  : dev

export default config