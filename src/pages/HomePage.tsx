import { Container, Image } from "react-bootstrap"

const HomePage = () => {
  return (
	<Container className="d-flex justify-content-center mt-4">
		<title>RADb | Reel Archive Data Base</title>
		<h1 className="visually-hidden">HomePage</h1>
		<Image
			src="/images/RADb-logo.png" 
			alt="Reel Movie Archive Data Base-logo"
			className="shadow bg-white bg-opacity-10 rounded border-0"
		/>
	</Container>
  )
}

export default HomePage