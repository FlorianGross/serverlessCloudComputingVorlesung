module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  const age = req.query.age || (req.body && req.body.age);
  const gender = req.query.gender || (req.body && req.body.gender);

  if (age && gender) {
    let calorieIntake;

    if (gender.toLowerCase() === "male") {
      if (age >= 19 && age <= 30) {
        calorieIntake = 2400;
      } else if (age >= 31 && age <= 50) {
        calorieIntake = 2200;
      } else if (age > 50) {
        calorieIntake = 2000;
      } else {
        calorieIntake = 2000;
      }
    } else if (gender.toLowerCase() === "female") {
      if (age >= 19 && age <= 30) {
        calorieIntake = 2000;
      } else if (age >= 31 && age <= 50) {
        calorieIntake = 1800;
      } else if (age > 50) {
        calorieIntake = 1600;
      } else {
        calorieIntake = 1800;
      }
    } else {
      context.res = {
        status: 400,
        body: "Please provide a valid gender (male or female).",
      };
      return;
    }

    context.res = {
      body: `Based on your age (${age}) and gender (${gender}), your recommended daily calorie intake is approximately ${calorieIntake} calories.`,
    };
  } else {
    context.res = {
      status: 400,
      body: "Please provide both age and gender parameters.",
    };
  }
};

//https://yourfunctionapp.azurewebsites.net/api/yourfunctionname?age=35&gender=male
