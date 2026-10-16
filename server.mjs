import http from "node:http";
const port=Number(process.env.PORT||10000);
const host=process.env.OPENBOT_HOST||"0.0.0.0";
const token=process.env.OPENBOT_WEB_TOKEN||"";
if(token.length<24) { console.error("OPENBOT_WEB_TOKEN missing or too short"); process.exit(1); }
const app=http.createServer(async(req,res)=>{
  const json=(status,data)=>{res.writeHead(status,{"content-type":"application/json","cache-control":"no-store"});res.end(JSON.stringify(data));};
  if(req.url==="/health" && req.method==="GET") return json(200,{status:"ok",mode:"deployment-smoke-test",freeOnly:true,providerConfigured:Boolean(process.env.OPENBOT_API_KEY)});
  if(req.headers.authorization!=="Bearer "+token) return json(401,{error:"Unauthorized"});
  if(req.url==="/" && req.method==="GET") return json(200,{status:"private deployment smoke test only",message:"Full standalone agent has not been installed yet."});
  return json(404,{error:"Not found"});
});
app.listen(port,host,()=>console.log("Cloud smoke test listening on "+port));