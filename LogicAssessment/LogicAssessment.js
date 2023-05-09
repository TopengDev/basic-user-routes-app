// Problem 1 -----------------------------------
const inputString = "SELamAt PaGi Dunia!!";

// Input string validation, allowing letters, numbers, spaces, and punctuations
const validateString = (inputString) => {
  const regex = /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<> ]+$/;
  return regex.test(inputString);
};

// Convert the input string into a title cased format
const titleCaseWithoutPunctuation = (inputString) => {
  const words = inputString.toLowerCase().split(/[^\w]+/, -1);

  if (!words[words.length - words.length]) words.shift();
  if (!words[words.length]) words.pop();

  const titleCasedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return titleCasedWords.join(" ");
};

// Convert the title cased string into a regular string separated by hyphens
const hyphenateString = (titleCasedString) => {
  const words = titleCasedString.split(" ");
  const hyphenatedWords = words.map((word, index) => {
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return word.toLowerCase();
    }
  });
  return hyphenatedWords.join("-");
};

// Output
console.log("Problem 1 --------------");
console.log("Input string: ", inputString, "\n");
if (validateString) {
  const titleCasedString = titleCaseWithoutPunctuation(inputString);
  const hyphenatedStringTitle = hyphenateString(titleCasedString);

  console.log("Capitalized: ", titleCasedString);
  console.log("hyphenated: ", hyphenatedStringTitle);
} else {
  console.log("Invalid input string");
}
console.log("\n");

// Problem 2 ----------------------------------------

const countCharacters = (paragraph) => {
  const charCounts = {};

  // Loop through each character in the paragraph
  for (let i = 0; i < paragraph.length; i++) {
    const char = paragraph[i];

    // initialize character with 0 if doesnt exist
    if (!charCounts[char]) {
      charCounts[char] = 0;
    }

    // Increment the count for character
    charCounts[char]++;
  }

  return charCounts;
};

const ipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse efficitur ligula eu quam pulvinar, sed tempor ex commodo. Sed bibendum massa a consectetur venenatis. Fusce sagittis ac dolor sit amet bibendum. Ut suscipit euismod risus vel pharetra. Nunc congue neque in sapien bibendum, ac posuere ex consequat. Sed eleifend volutpat dolor, ut interdum odio. Proin ultrices ante et libero faucibus, at fringilla arcu sagittis. Integer sit amet imperdiet lectus. In consectetur vehicula risus non sagittis. Quisque ac nisi eu lacus gravida pulvinar sed et turpis. Nullam ultrices vitae eros vel hendrerit. Donec fermentum, risus id vestibulum sagittis, nisl enim bibendum mauris, ut pharetra lorem eros in nibh. Donec ut eros erat. Praesent sit amet ipsum vel arcu sodales sollicitudin sed quis mi.`;

const characters = countCharacters(ipsum);
// Output
console.log("Problem 2 --------------------");
for (char in characters) {
  console.log(char, ": ", characters[char]);
}
console.log("\n");

// Problem 3 ----------------------------------------

// Declare a generator function
const generateSet = (range, arr, n, func) => {
  switch (func) {
    // Generate Squares
    case "SQUARES":
      for (i = 0; i < range; i++) {
        arr.push((n + i) * (n + i));
      }
      return arr;
      break;

    //Generate numbers of added odds
    case "ADD_ODD":
      for (i = 0; i < range - 1; i++) {
        arr.push(arr[i] + n);
        n += 2;
      }
      return arr;
      break;

    // Generate fibonacci numbers
    case "FIBO":
      for (i = 0; i < range - 2; i++) {
        arr.push(arr[i] + arr[i + 1]);
      }
      return arr;
      break;

    // Generate custom fibonacci numbers
    case "CUSTOM_SET":
      for (i = 0; i < range - 2; i++) {
        arr.push(arr[i] + arr[i + 1] + 1);
      }
      return arr;
      break;
  }
};

const range = 10;

const squares = generateSet(range, [], 0, "SQUARES");
const addedOdds = generateSet(range, [1], 1, "ADD_ODD");
const fibos = generateSet(range, [0, 1], null, "FIBO");
const customSet = generateSet(range, [0, 0], null, "CUSTOM_SET");

// Output
console.log("Problem 3 ------------------");
console.log("Set of squares for a range of ", range, ": ", squares);
console.log("Set of added odds for a range of ", range, ": ", addedOdds);
console.log("Set of fibonacci numbers for a range of ", range, ": ", fibos);
console.log("Set of custom fibonacci for a range of ", range, ": ", customSet);
console.log("\n");

// Problem 4. (i assumed the input is in hexadecimal format) -----------
function calculateResult(str) {
  // Split the input string into an array of numbers
  const nums = str.split(/[\s,]+/).map((num) => parseInt(num, 16));

  // Calculate total
  let total = 0;
  for (i = 0; i < nums.length; i++) {
    total += nums[i];
  }

  // Calculate max
  let max = 0;
  for (i = 0; i < nums.length; i++) {
    if (nums[i] > max) max = nums[i];
  }

  // Calculate min
  let min = nums[0];
  for (i = 0; i < nums.length; i++) {
    if (nums[i] < min) min = nums[i];
  }

  // Calculate average
  const avg = total / nums.length;

  // Return the results object
  return {
    total: total,
    max: max,
    min: min,
    avg: avg,
  };
}

const input = "20,21, 80a,21, 5d5, 31 22";
const results = calculateResult(input);

// Output
console.log("Problem 4 ---------------------");
console.log(`Total: ${results.total} (decimal)`);
console.log(`Biggest: ${results.max} (decimal)`);
console.log(`Smallest: ${results.min} (decimal)`);
console.log(`Average: ${results.avg} (decimal)`);
