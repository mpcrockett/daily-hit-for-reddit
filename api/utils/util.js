//this function does not generate cryptographically secure strings, but is fit for this use case according to Reddit API docs
const generateRandomString = async (length) => {
	const array = [];
  const rounds = (length / 2 ) + 1;
	for(let x=0; x < rounds; x++) {
    const num = Math.random();
    array.push(num.toString(18).substring(2, 4));
  };
  return array.join('').substring(0, length);
};

module.exports = generateRandomString;