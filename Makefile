start:
	npx babel-node src/bin/gendiff.js
install:
	npm publish --dry-run
build:
	rm -rf dist
	npm run build
lint:
	npx eslint .
