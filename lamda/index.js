const AWS = require("aws-sdk");
const sharp = require("sharp");

const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
  // 업로드한 s3 bucket 이름
  const Bucket = event.Records[0].s3.bucket.name;
  // 파일명 full path + file name
  //Key : original/abcd.png

  // 파일명이 한글인 경우를 위해 decodeURIComponent
  const Key = decodeURIComponent(event.Records[0].s3.object.key);
  const filename = Key.split("/")[Key.split("/").length - 1];
  let ext = filename.split(".")[filename.split(".").length - 1];

  ext = ext === "jpg" ? "jpeg" : ext.toLowerCase();

  try {
    const s3Object = await s3.getObject({ Bucket, Key }).promise();
    console.log("original === s3Object =", s3Object.Body.length);

    const resizedImage = await sharp(s3Object.Body)
      .resize(400, 400, {
        fit: "inside",
      })
      .toFormat(ext)
      .toBuffer();

    const thumbnailKey = `thumb/${filename}`;
    await s3
      .putObject({
        Bucket,
        Key: thumbnailKey,
        Body: resizedImage,
      })
      .promise();

    console.log("lambda resizing image and uploading had done::", resizedImage);
    return callback(null, thumbnailKey);
  } catch (error) {
    console.log("lambda Error:: ", error);

    return callback(error);
  }
};
