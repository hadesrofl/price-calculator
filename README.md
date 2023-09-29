This is a simple price calculation app. A demo is hosted at https://hadesrofl.github.io/price-calculator/. A docker image is available for self-hosting on the [container registry](https://github.com/hadesrofl/price-calculator/pkgs/container/price-calculator).

## Using Docker

To run this application in a self-hosted way, docker is recommended. Run the following commands via docker-cli:

```bash
docker run --name price-calculator -p 3000:3000 ghcr.io/hadesrofl/price-calculator:latest
```

This will download and start the application and expose it's port to your machines port 3000. The application is available via http://localhost:3000 then. 
If you want to you can set another port for your host mapping.

## Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

Contributions are more than welcome. This repository has an [underlying project to function as a backlog](https://github.com/users/hadesrofl/projects/4) for ideas. If you want to contribute new ideas or implementations please follow our [Contribution-Guide](CONTRIBUTING.md)
