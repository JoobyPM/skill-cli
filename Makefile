.PHONY: fmt check test build dev

fmt:
	bun run format

check:
	bun run check
	bun run typecheck

test:
	bun test

build:
	bun run build

dev:
	bun run dev
