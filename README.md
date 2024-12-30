Build the production image:

''
docker build -t my-nextjs-app .
,,

Run the production container:

''
docker run -p 3000:3000 my-nextjs-app
''

For development (if using the dev stage):
''
docker build -t my-nextjs-app:dev --target dev .
docker run -p 3000:3000 my-nextjs-app:dev
''