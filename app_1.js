// regex to match the phone number in the format (xxx) xxx-xxxx
var phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/; 

// test phoneregex against a sample phone number with console log
console.log(phoneRegex.test("(123) 466-7890")); // true     

