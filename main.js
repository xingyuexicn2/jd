// version v0.0.2
// create by ruicky
// detail url: https://github.com/ruicky/jd_sign_bot

const exec = require('child_process').execSync;
const fs = require('fs');
const rp = require('request-promise');
const download = require('download');

// 公共变量
const KEY = 'shshshfpa=19e5bde3-843e-4f1b-229e-d3fcded4e1b8-1727098633; shshshfpx=19e5bde3-843e-4f1b-229e-d3fcded4e1b8-1727098633; __jdu=17270986329221434933170; TrackID=1sLCNtzLl0elAmZV8PNjFdqgD4VBPqWp5yxkJVaoSD6yeGAYTVE4YFxh8uL83g8YD9yVtyngJP4jLJvjLosFC8-Xy0PHWpuGEwECZ1bLSuSJHisBIRq0DTTlFqkI-R0_v; thor=721002897701FA1EC591574A7650B5652CE364B95DC136E23D35182EFAA9EED5BEA77563119F6DD78EC2F7594C350490F3CFFB4494F3B6EA8B6EB7AF931762B43A81E5575D2C9A2418328E4AC77BF84D9E3091AB925B8CD9513F6CC6526CDCD1DB2653FAD8A055819DD76B6DD3CCA6D994851DF1E5EE34A76A6DA5A9656FE7D3AF47C4F30C13C61A173C20E1E7A687BE1127580CE2D236D7F75C61BFD0C85BB6; light_key=AASBKE7rOxgWQziEhC_QY6ya-Ui7SNtS9vewqn7kqy2KR5xSoZNt_sg1gr8tbrsmNUDjiMft; pinId=0W4l5fHHwvEZaPBZm58n1Q; pin=jd_rIhBxhDVpmKL; unick=jd_t151u64phwmd9t; 3AB9D23F7A4B3C9B=IHHXYJ5RAU7SJM7KT3ENKWTTMUQAB4CIZUVRC342H3LLRTZE2MOGY6WGMYJDITPWHUOM73SAOPYSKSLOVFTOET5USQ; unpl=JF8EAJ1nNSttXksAAxoKGhESSQ0EWwpaS0cDazNSUQ4ITFEHElUZFxN7XlVdWBRLFx9vZhRXXFNOUA4ZASsSEHteVV1fAUwXB21kNWRdWUpXBhMHGhMYe15Ublw4SxEAaWYNXVpaSFwGGAIeEBVDX1ZeWwl7FjNvbwJkbWhKZAQrAytZfkoQVFheDkofCmhlBlxeW0tRBx4KGRAQTVxkX20L; __jda=76161171.17270986329221434933170.1727098632.1731242732.1733661158.18; __jdb=76161171.1.17270986329221434933170|18.1733661158; __jdc=76161171; __jdv=76161171|www.bing.com|-|referral|-|1733661158004; 3AB9D23F7A4B3CSS=jdd03IHHXYJ5RAU7SJM7KT3ENKWTTMUQAB4CIZUVRC342H3LLRTZE2MOGY6WGMYJDITPWHUOM73SAOPYSKSLOVFTOET5USQAAAAMTUZA6SCYAAAAAC4A54XXY45V5K4X; _gia_d=1; flash=3_AHqv8y4EMRc2Zh4eG3AEPhzlA_OyxqOzTO8FxkcbGhFI-DqZ0TVDnxeaqkyM2q1Tl5lF7DwrCefP9vhqB-6ZRa50lKjfxJtMv8BsJMbrCRfdyexAB3iaJSdwEHeEiCl2S-RF88-rH-hxRB1a9RYHwWUyoHpBKtxuw-moX29u2oCw-YtkfAzj; areaId=10; ipLoc-djd=10-742-0-0; PCSYCityID=CN_230000_230600_0; umc_count=1; shshshfpb=BApXSTZxKpfZAExPzdnmhr5BXuotlElBiBmVIgRwb9xJ1MrZU7IC2';//process.env.JD_COOKIE;
const serverJ = 'sctp3641ta-w1wpp1gmoyutk6nh7vhs50ho';//process.env.PUSH_KEY;
const DualKey = process.env.JD_COOKIE_2;



async function downFile () {
    // const url = 'https://cdn.jsdelivr.net/gh/NobyDa/Script@master/JD-DailyBonus/JD_DailyBonus.js'
    const url = 'https://raw.githubusercontent.com/NobyDa/Script/master/JD-DailyBonus/JD_DailyBonus.js';
    await download(url, './');
}

async function changeFile () {
   let content = await fs.readFileSync('./JD_DailyBonus.js', 'utf8')
   content = content.replace(/var Key = ''/, `var Key = '${KEY}'`);
   if (DualKey) {
    content = content.replace(/var DualKey = ''/, `var DualKey = '${DualKey}'`);
   }
   await fs.writeFileSync( './JD_DailyBonus.js', content, 'utf8')
}

async function sendNotify (text,desp) {
  const options ={
    uri:  `https://sc.ftqq.com/${serverJ}.send`,
    form: { text, desp },
    json: true,
    method: 'POST'
  }
  await rp.post(options).then(res=>{
    console.log(res)
  }).catch((err)=>{
    console.log(err)
  })
}

async function start() {
  if (!KEY) {
    console.log('请填写 key 后在继续')
    return
  }
  // 下载最新代码
  await downFile();
  console.log('下载代码完毕')
  // 替换变量
  await changeFile();
  console.log('替换变量完毕')
  // 执行
  await exec("node JD_DailyBonus.js >> result.txt");
  console.log('执行完毕')

  if (serverJ) {
    const path = "./result.txt";
    let content = "";
    if (fs.existsSync(path)) {
      content = fs.readFileSync(path, "utf8");
    }
    let t = content.match(/【签到概览】:((.|\n)*)【签到奖励】/)
    let res = t ? t[1].replace(/\n/,'') : '失败'
    let t2 = content.match(/【签到奖励】:((.|\n)*)【其他奖励】/)
    let res2 = t2 ? t2[1].replace(/\n/,'') : '总计0'

    
    await sendNotify("" + ` ${res2} ` + ` ${res} ` + new Date().toLocaleDateString(), content);
  }
}

start()
