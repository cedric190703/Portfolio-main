// Compare actual local secret values in memory; never print them.
const fs = require('node:fs')
const path = require('node:path')
const { execFileSync } = require('node:child_process')
if (fs.existsSync('.env.local')) process.loadEnvFile('.env.local')
const names = ['OPENROUTER_API_KEY', 'CHAT_COOKIE_SECRET', 'CHAT_REDIS_REST_TOKEN']
const secrets = names.map(name => [name, process.env[name]]).filter(([,value]) => value && value.length >= 16)
if (!secrets.length) { console.error('No configured secrets available to audit.'); process.exit(1) }
const tracked = execFileSync('git', ['ls-files', '-z'], {encoding: 'utf8'}).split('\0').filter(Boolean)
const files = new Set(tracked.filter(f => fs.existsSync(f)))
function walk(dir) {
 if (!fs.existsSync(dir)) return
 for(const entry of fs.readdirSync(dir,{withFileTypes:true})) {
  const file=path.join(dir,entry.name)
  if(entry.isDirectory()) walk(file)
  else if(entry.isFile()) files.add(file)
 }
}
for (const dir of ['.next/static', 'app', 'components', 'lib', 'tests']) walk(dir)
for (const file of fs.readdirSync('.')) if (file.endsWith('.md') || file === '.env.example') files.add(file)
const findings=[]
for(const file of files) {
 if(!fs.statSync(file).isFile()) continue
 const bytes=fs.readFileSync(file)
 for(const [name,value] of secrets) if(bytes.includes(Buffer.from(value))) findings.push({file,secretName:name})
}
const ignored=execFileSync('git',['check-ignore','.env.local'],{encoding:'utf8'}).trim()==='.env.local'
if(findings.length || !ignored) {console.error(JSON.stringify({findings,localEnvIgnored:ignored}));process.exit(1)}
console.log(JSON.stringify({configuredSecretsChecked:secrets.length,filesChecked:files.size,exposures:0,localEnvIgnored:true}))
