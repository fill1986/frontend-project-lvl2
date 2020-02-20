start:
	npx babel-node src/bin/gendiff.js
install:
	npm ci
build:
	rm -rf dist
	npm run build
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage

.PHONY: test
