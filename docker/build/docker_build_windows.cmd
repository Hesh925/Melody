docker stop melody
git pull
docker build -t melody ../../.
docker run --env-file ../../../.melody.env --name melody -d --rm --network="host" -it melody