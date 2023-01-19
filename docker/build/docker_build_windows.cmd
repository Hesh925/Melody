docker stop melody
git pull
docker build -t melody ../../.
docker run --env-file ../../../.melody.env --name melody -d --network="host" -it melody -v melody-logs:/log