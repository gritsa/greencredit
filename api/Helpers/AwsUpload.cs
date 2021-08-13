using System;
using System.IO;
using System.Threading.Tasks;
using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using GreentableApi.Models;
using GreentableApi.Models.Response;
using Microsoft.AspNetCore.Http;

namespace GreentableApi.Helpers
{
    public class AmazonS3Service
    {
        private static String accessKey = "AKIAJX3JC5HXPQC4Z6TQ";
        private static String accessSecret = "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";
        private static String bucket = "itabmenu";
        private static readonly RegionEndpoint bucketRegion = RegionEndpoint.EUCentral1;


        public static async Task<Awsresponse> UploadObject(IFormFile file)
        {
            // connecting to the client
            var region = RegionEndpoint.GetBySystemName("us-west-2");
            var client = new AmazonS3Client(accessKey, accessSecret, region);

            // get the file and convert it to the byte[]
            // byte[] fileBytes = new Byte[file.Length];
            // file.OpenReadStream().Read(fileBytes, 0, Int32.Parse(file.Length.ToString()));

            // create unique file name for prevent the mess
            var fileName = Guid.NewGuid() + file.FileName;

            PutObjectResponse response = null;

            using (var stream = new MemoryStream())

            {
            file.CopyTo(stream);
            var request = new PutObjectRequest
            {
                BucketName = bucket,
                Key = fileName,
                InputStream = stream,
                ContentType = file.ContentType,
                CannedACL = S3CannedACL.PublicRead
            };

            response = await client.PutObjectAsync(request);
            };

            if (response.HttpStatusCode == System.Net.HttpStatusCode.OK)
            {
                // this model is up to you, in my case I have to use it following;
                return new Awsresponse
                {
                    Success = true,
                    FileName = fileName
                };
            }
            else
            {
                // this model is up to you, in my case I have to use it following;
                return new Awsresponse
                {
                    Success = false,
                    FileName = fileName
                };
            }
        }

    }
}