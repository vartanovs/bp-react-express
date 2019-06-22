# 1. Enter docker container and run npm install to update package.json
# 2. Remove images from local environment
# 3. Rebuild images with updated package.json
# 4. Push images to Docker Hub

# If first argument is dev and second argument is not empty
if [ $1 = "dev" ] && [ ! -z $2 ]; then
  DEV=true
  # Grab all arguments after dev and assign to variable
  PACKAGE=${@:2}

# Else if first argument is not empty
elif [ ! -z $1 ]; then
  DEV=false
  # Grab all arguments and assign to variable
  PACKAGE=$@

# Else, inform user of syntax error
else
  echo -e "\033[00;31mMake sure to format the command properly:\033[0m"
  echo "- Dev dependency(ies): 'npm run dep-add dev <PACKAGE1> <PACKAGE2> ...'."
  echo "- Regular depencency(ies): 'npm run dep-add <PACKAGE1> <PACKAGE2> ...'."
  exit 1
fi

# Enter into Docker container in bash and run npm install --save or --save-dev
if [ $DEV = true ]; then
  echo -e "\033[1;36mInstalling '$PACKAGE' in docker container as dev dependency(ies)...\033[0m"
  docker-compose run --rm --service-ports prod npm install --save-dev $PACKAGE || { echo -e "\033[00;31mnpm install failed\033[0m" ; exit 1; }
else
  echo -e "\033[1;36mInstalling '$PACKAGE' in docker container as dependency(ies)... \033[0m"
  docker-compose run --rm --service-ports prod npm install --save $PACKAGE || { echo -e "\033[00;31mnpm install failed\033[0m" ; exit 1; }
fi

echo -e "\033[1;32mpackage.json has been updated\033[0m"
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
