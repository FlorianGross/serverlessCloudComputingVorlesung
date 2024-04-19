module.exports = async function (context, req) {
  context.log("BMI calculation function processed a request.");

  const weight = req.query.weight || (req.body && req.body.weight);
  const height = req.query.height || (req.body && req.body.height);

  if (weight && height) {
    const bmi = calculateBMI(weight, height);
    const result = getBMIResult(bmi);

    context.res = {
      status: 200,
      body: {
        bmi: bmi,
        result: result,
      },
    };
  } else {
    context.res = {
      status: 400,
      body: "Please provide both weight (in kg) and height (in cm) parameters.",
    };
  }
};

function calculateBMI(weight, height) {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  return bmi.toFixed(2);
}

function getBMIResult(bmi) {
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal weight";
  } else if (bmi >= 25 && bmi <= 29.9) {
    return "Overweight";
  } else {
    return "Obesity";
  }
}

//http://your-function-url/api/your-function-name?weight=70&height=175
