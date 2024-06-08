import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";

// Sample flower care data for model training
const flowerCareData = {
  rose: { water: 1, sunlight: 1, soil: 1, fertilizer: 1 },
  tulip: { water: 0.5, sunlight: 0.5, soil: 0.5, fertilizer: 0.5 },
  orchid: { water: 0.2, sunlight: 0.2, soil: 0.2, fertilizer: 0.2 },
  sunflower: { water: 0.7, sunlight: 1, soil: 0.7, fertilizer: 0.7 },
  daisy: { water: 0.4, sunlight: 0.8, soil: 0.6, fertilizer: 0.5 },
  lavender: { water: 0.3, sunlight: 1, soil: 0.4, fertilizer: 0.3 },
  marigold: { water: 0.6, sunlight: 0.8, soil: 0.5, fertilizer: 0.6 },
  lily: { water: 0.5, sunlight: 0.7, soil: 0.6, fertilizer: 0.6 },
  hibiscus: { water: 0.8, sunlight: 0.9, soil: 0.7, fertilizer: 0.8 },
  petunia: { water: 0.6, sunlight: 0.6, soil: 0.6, fertilizer: 0.6 },
};

// Convert flower care data to tensors for training
const flowerNames = Object.keys(flowerCareData);
const xs = tf.tensor2d(flowerNames.map((name) => [flowerNames.indexOf(name)]));
const ys = tf.tensor2d(
  flowerNames.map((name) => [
    flowerCareData[name].water,
    flowerCareData[name].sunlight,
    flowerCareData[name].soil,
    flowerCareData[name].fertilizer,
  ])
);

// Create and train a simple model
const model = tf.sequential();
model.add(tf.layers.dense({ units: 4, inputShape: [1] }));
model.compile({ optimizer: "sgd", loss: "meanSquaredError" });

model.fit(xs, ys, { epochs: 100 }).then(() => {
  console.log("Model trained!");
});

const Recommendation = () => {
  const [flower, setFlower] = useState("");
  const [recommendation, setRecommendation] = useState(null);

  const handleInputChange = (e) => {
    setFlower(e.target.value.toLowerCase());
  };

  const getRecommendation = () => {
    const flowerIndex = flowerNames.indexOf(flower);
    if (flowerIndex === -1) {
      setRecommendation(null);
      return;
    }

    const inputTensor = tf.tensor2d([flowerIndex], [1, 1]);
    const output = model.predict(inputTensor);

    output.data().then((data) => {
      setRecommendation({
        water: data[0] > 0.5 ? "Water daily" : "Water moderately",
        sunlight: data[1] > 0.5 ? "Full sun" : "Partial shade",
        soil: data[2] > 0.5 ? "Well-drained soil" : "Moist soil",
        fertilizer:
          data[3] > 0.5
            ? "Use a balanced fertilizer every month"
            : "Fertilize sparingly",
      });
    });
  };

  return (
    <div>
      <input
        type="text"
        value={flower}
        onChange={handleInputChange}
        placeholder="Enter flower name"
      />
      <button onClick={getRecommendation}>Get Recommendation</button>
      {recommendation ? (
        <div>
          <h2>
            Care Recommendations for{" "}
            {flower.charAt(0).toUpperCase() + flower.slice(1)}
          </h2>
          <p>
            <strong>Water:</strong> {recommendation.water}
          </p>
          <p>
            <strong>Sunlight:</strong> {recommendation.sunlight}
          </p>
          <p>
            <strong>Soil:</strong> {recommendation.soil}
          </p>
          <p>
            <strong>Fertilizer:</strong> {recommendation.fertilizer}
          </p>
        </div>
      ) : (
        <p>No recommendations found {flower}</p>
      )}
    </div>
  );
};

export default Recommendation;

// import React, { useState } from "react";
// import * as tf from "@tensorflow/tfjs";

// const flowerData = {
//   rose: {
//     water: "Water daily",
//     sunlight: "Full sun",
//     soil: "Well-drained soil",
//     fertilizer: "Use a balanced fertilizer every 4-6 weeks",
//   },
//   tulip: {
//     water: "Water moderately",
//     sunlight: "Full sun to partial shade",
//     soil: "Well-drained soil",
//     fertilizer: "Fertilize in spring and fall",
//   },
//   orchid: {
//     water: "Water once a week",
//     sunlight: "Indirect light",
//     soil: "Orchid potting mix",
//     fertilizer: "Use a balanced fertilizer every month",
//   },
//   // Add more flowers and their care instructions here
// };

// const Recommendation = () => {
//   const [flower, setFlower] = useState("");
//   const [recommendation, setRecommendation] = useState(null);

//   const handleInputChange = (e) => {
//     setFlower(e.target.value.toLowerCase());
//   };

//   const getRecommendation = () => {
//     const careInfo = flowerData[flower];
//     if (careInfo) {
//       setRecommendation(careInfo);
//     } else {
//       setRecommendation(null);
//     }
//   };

//   // Example TensorFlow.js function (placeholder for future expansion)
//   const futureTensorFlowFunction = async () => {
//     // Load or define a model
//     const model = tf.sequential();
//     model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
//     model.compile({ optimizer: "sgd", loss: "meanSquaredError" });

//     // Example training data
//     const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
//     const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

//     // Train the model
//     await model.fit(xs, ys, { epochs: 10 });

//     // Make a prediction
//     const prediction = model.predict(tf.tensor2d([5], [1, 1]));
//     prediction.print();
//   };

//   // Call the TensorFlow.js function (for demonstration)
//   futureTensorFlowFunction();

//   return (
//     <div>
//       <input
//         type="text"
//         value={flower}
//         onChange={handleInputChange}
//         placeholder="Enter flower name(i.e rose)"
//       />
//       <button onClick={getRecommendation}>Get Recommendation</button>
//       {recommendation ? (
//         <div>
//           <h2>
//             Care Recommendations for{" "}
//             {flower.charAt(0).toUpperCase() + flower.slice(1)}
//           </h2>
//           <p>
//             <strong>Water:</strong> {recommendation.water}
//           </p>
//           <p>
//             <strong>Sunlight:</strong> {recommendation.sunlight}
//           </p>
//           <p>
//             <strong>Soil:</strong> {recommendation.soil}
//           </p>
//           <p>
//             <strong>Fertilizer:</strong> {recommendation.fertilizer}
//           </p>
//         </div>
//       ) : (
//         <p>No recommendations found for {flower}</p>
//       )}
//     </div>
//   );
// };

// export default Recommendation;
