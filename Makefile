start:
	npx babel-node src/bin/gendiff.js  /__fixtures__/before.yaml /__fixtures__/after.yaml
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
