publish:
	npm publish --dry-run
lint:
	npx eslint .
build:
	rm -rf dist
	npm run build
test:
	npm test
run:
	npx babel-node src/bin/gendiff.js before.json after.json
install:
	npm install
