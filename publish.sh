# Make sure a version type is passed in
if [[ -z "$1" || ( "$1" != "patch" && "$1" && "minor" && "$1" && "major" ) ]] 
then
  echo "Please call this with one of the following version options: patch, minor, major"
  exit 1
fi

# Get the current git status, and make sure there's nothing to commit on this branch
STATUS=$(git status)

if [[ $STATUS != *"nothing to commit"* || $STATUS != *"Your branch is up-to-date"* ]]
then
  echo "You must have a branch that is up to date to run this publisher. Please commit all changes and try again."
  exit 1
fi

# Get the current version and roll it in package.json
VERSION=$(ruby update_version.rb $1)
echo "Upgrading to version $VERSION"

# Call gulp bower to roll the version in bower.json
gulp bower

# Push the change to the version numbers in the json files
git commit -a -m "updated to version $VERSION"
git push origin

# Create a tag
git tag -a $VERSION -m "released $VERSION"
git push origin $VERSION

# Publish on npm
npm publish ./
exit 0
