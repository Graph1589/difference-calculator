install:
	npm install

publish:
	npm publish --dry-run

lint:
	npx eslint .

startlocal:
	npx babel-node src/bin/gendiff.js ./before.json ./after.json

start:
	npx babel-node src/bin/gendiff.js ~/Projects/frontend-project-lvl2/before.json ~/Projects/frontend-project-lvl2/after.json