install:
	npm install

publish:
	npm publish --dry-run

lint:
	npx eslint .

yaml:
	npx babel-node src/bin/gendiff.js ./__fixtures__/before.yaml ./__fixtures__/after.yaml

json:
	npx babel-node src/bin/gendiff.js ~/Projects/frontend-project-lvl2/before.json ~/Projects/frontend-project-lvl2/after.json

ini:
	npx babel-node src/bin/gendiff.js ./__fixtures__/before.ini ./__fixtures__/after.ini