install:
	npm install

publish:
	npm publish --dry-run

lint:
	npx eslint .

build:
	rm -rf dist
	npm run build

test-coverage:
	npm test -- --coverage

yaml:
	npx babel-node src/bin/gendiff.js ./__fixtures__/before.yaml ./__fixtures__/after.yaml

json:
	npx babel-node src/bin/gendiff.js ./__fixtures__/before.json ./__fixtures__/after.json

ini:
	npx babel-node src/bin/gendiff.js ./__fixtures__/before.ini ./__fixtures__/after.ini

test:
	npm run test

plain:
	gendiff --format plain ./__fixtures__/before.json ./__fixtures__/after.json
