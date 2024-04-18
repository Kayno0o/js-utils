build:
	bun run build

lint:
	bun run lint:fix

doc:
	bun run doc

patch: # v0.0.X
	npm version patch

minor: # v0.X.0
	npm version minor

major: # vX.0.0
	npm version major

publish:
	npm publish

deploy: build lint doc

commit:
	git add -A
	@read -p "Enter commit message: " message; \
	git commit -m "$$message"

full-patch: deploy commit patch publish
full-minor: deploy commit minor publish
full-major: deploy commit major publish

ff-pages:
	git checkout gh-pages
	git fetch origin
	git merge --ff-only origin/main
	git push
	git checkout main
