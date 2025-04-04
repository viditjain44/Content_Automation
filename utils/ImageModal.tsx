const OpenAI = require('openai');
const fs = require("fs");

const client = new OpenAI({
    baseURL: 'https://api.studio.nebius.com/v1/',
    apiKey: "eyJhbGciOiJIUzI1NiIsImtpZCI6IlV6SXJWd1h0dnprLVRvdzlLZWstc0M1akptWXBvX1VaVkxUZlpnMDRlOFUiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJnb29nbGUtb2F1dGgyfDEwNjUzMjE1NDIwNDU0ODQxNDAxMSIsInNjb3BlIjoib3BlbmlkIG9mZmxpbmVfYWNjZXNzIiwiaXNzIjoiYXBpX2tleV9pc3N1ZXIiLCJhdWQiOlsiaHR0cHM6Ly9uZWJpdXMtaW5mZXJlbmNlLmV1LmF1dGgwLmNvbS9hcGkvdjIvIl0sImV4cCI6MTkwMTQ0ODA3NiwidXVpZCI6IjAzZWFkNjFiLTFlOWEtNDNkYi04OTQyLWM3NGM3NTY1YWNhMSIsIm5hbWUiOiJjb250ZW50IGF1dG9tYXRpb24iLCJleHBpcmVzX2F0IjoiMjAzMC0wNC0wM1QxMjowMToxNiswMDAwIn0.Srjl0fVygkSAnIgz8KM8_02WN01DwrfKn1AAoRYiW70"
    
});

export async function imagegenerator(imagepath:string,prompt:string) {client.images.generate({
    model: "stability-ai/sdxl",
    response_format: "b64_json",
    extra_body: {
        response_extension: "webp",
        width: 1024,
        height: 1024,
        num_inference_steps: 30,
        negative_prompt: "",
        seed: -1
    },
    prompt: prompt
})
    .then((response:any) => {
        const base64Data = response.data[0].b64_json;
        const buffer = Buffer.from(base64Data, "base64");

        fs.writeFileSync(imagepath, buffer);
        console.log(`Image saved as ${imagepath}`);
    })
    .catch((error:any) => console.error("Error:", error));
}
