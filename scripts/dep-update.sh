# 1. Remove images from local environment
# 2. Rebuild images with updated package.json
# 3. Push images to Docker Hub

echo -e "\033[1;33m'CTRL + Z' to kill this script\033[0m"

echo -e "\033[1;36mRemoving existing images from local environment...\033[0m"
docker image rm vartanovs/ern-boilerplate --force
docker image rm vartanovs/ern-boilerplate-dev --force
echo -e "\033[1;36mRebuilding images with updated package.json...\033[0m"
docker image build -t vartanovs/ern-boilerplate .
docker image build -t vartanovs/ern-boilerplate-dev -f dev.Dockerfile .
echo -e "\033[1;36mPushing images to Docker Hub...\033[0m"
docker push vartanovs/ern-boilerplate
docker push vartanovs/ern-boilerplate-dev
echo -e "\033[1;32mDone!\033[0m"