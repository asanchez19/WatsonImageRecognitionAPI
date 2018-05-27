var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');



const visualRecognition = new VisualRecognitionV3({
  // Set the endpoint
  url: 'https://gateway.watsonplatform.net/visual-recognition/api',
  version: '2018-03-19',
  iam_apikey: '2o_fd3024xFKizEKNyULk6WyYDvbjmGqMympTO4I38bc',
});
/**
 * Calling Visual Recognition API and returning the response. 
 * @param {*} req 
 * @param {*} res 
 */
const visualRecognitionAPI = async (req, res) => {
  var params = {
    images_file: req.file.buffer
  };
  visualRecognition.detectFaces(params, function (err, response) {
    if (err)
      return res.status(500).send('Error calling Watson API: ' + err);
    else
      return res.status(200).json({ response });
  });



}

module.exports = { visualRecognitionAPI }
