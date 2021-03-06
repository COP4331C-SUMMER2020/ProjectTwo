export default ({ body, title }) => {
	return `
		<!DOCTYPE html>
		<html>
			<head>
				<title>${title}</title>
				<link rel="stylesheet" href="/src/styles.css" />
			</head>
			
			<body>
				<div id="root">${body}</div>
			</body>
		</html>
	`;
};